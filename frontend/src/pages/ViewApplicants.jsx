import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Badge } from 'react-bootstrap';

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get('https://job-portal-backend-tti1.onrender.com/api/applied/employer/applicants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicants(res.data.applications || []);
      } catch (err) {
        console.error('Error fetching applicants:', err);
      }
    };

    fetchApplicants();
  }, [token]);

  const openModal = (app) => {
    setSelected(app);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4">👤 Applicants</h3>

      {applicants.length === 0 ? (
        <p className="text-muted">No applicants yet.</p>
      ) : (
        <div className="row">
          {applicants.map((app, i) => (
            <div key={i} className="col-md-6 col-lg-4 mb-4">
              <div className="card p-3 shadow-sm h-100 rounded-4 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={app.applicant.profileImage || 'https://via.placeholder.com/50'}
                    className="rounded-circle me-3"
                    width={50}
                    height={50}
                    alt="Applicant"
                  />
                  <div>
                    <h6 className="fw-bold mb-0">{app.applicant.name}</h6>
                    <small className="text-muted">{app.job?.title}</small>
                  </div>
                </div>

                <div>
                  <p className="mb-1"><strong>Skills:</strong></p>
                  <div className="d-flex flex-wrap">
                    {app.skills?.split(',').slice(0, 3).map((s, idx) => (
                      <span key={idx} className="badge bg-light border text-dark me-1 mb-1">{s.trim()}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 text-end">
                  <Button variant="outline-primary" size="sm" onClick={() => openModal(app)}>
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- Modal ---------- */}
      {selected && (
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selected.applicant.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Job:</strong> {selected.job?.title}</p>
            <p><strong>Email:</strong> {selected.applicant.email}</p>
            <p><strong>Phone:</strong> {selected.applicant.phone}</p>
            <p><strong>Education:</strong> {selected.education}</p>
            <p><strong>Applied:</strong> {new Date(selected.createdAt).toLocaleDateString()}</p>

            <div className="mb-2">
              <strong>Skills:</strong><br />
              {selected.skills?.split(',').map((s, idx) => (
                <span key={idx} className="badge bg-secondary me-1">{s.trim()}</span>
              ))}
            </div>

            <div className="d-flex gap-2 mb-3">
              <a href={selected.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary w-50">
                Resume
              </a>
              {selected.certificateUrl && (
                <a href={selected.certificateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success w-50">
                  Certificate
                </a>
              )}
            </div>

            <strong>Status: </strong>
            <Badge bg={
              selected.status === 'pending' ? 'warning' :
              selected.status === 'accepted' ? 'success' :
              'danger'
            }>
              {selected.status.toUpperCase()}
            </Badge>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ViewApplicants;
