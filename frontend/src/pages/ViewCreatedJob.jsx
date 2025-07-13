import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // ✅ Bootstrap Icons

const ViewCreatedJob = () => {
  const [createdJob, setCreatedJob] = useState([]);

  useEffect(() => {
    const apifetch = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('userId'));
        const res = await axios.get(`http://localhost:8090/api/jobs/getMyJob/${userId}`);
        setCreatedJob(res.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    apifetch();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Your Posted Jobs</h2>

      {createdJob.length === 0 ? (
        <p className="text-center text-muted">No jobs found. Go ahead and create one!</p>
      ) : (
        <div className="d-flex flex-column gap-4">
          {createdJob.map((job, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow-lg job-item bg-white"
              style={{ transition: 'box-shadow 0.2s ease-in-out' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)')}
            >
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-start">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <img
                    src={job.logo || 'https://via.placeholder.com/80x80?text=Logo'}
                    alt="Company Logo"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      backgroundColor: '#f1f1f1',
                    }}
                  />
                </div>

                {/* Job Info */}
                <div className="flex-grow-1">
                  <h5 className="text-dark mb-2">{job.title}</h5>

                  <p className="mb-1 text-muted">
                    <i className="bi bi-building me-1"></i>
                    <strong>{job.company}</strong>
                  </p>

                  <p className="mb-1 text-muted">
                    <i className="bi bi-geo-alt-fill me-1 text-danger"></i>
                    {job.location}
                  </p>

                  <p className="mb-1 text-muted">
                    <i className="bi bi-briefcase-fill me-1 text-primary"></i>
                    {job.experience}
                  </p>

                  <p className="mb-1 text-muted">
                    <i className="bi bi-mortarboard-fill me-1 text-success"></i>
                    {job.education}
                  </p>

                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {job.skills?.split(',').map((skill, i) => (
                      <span key={i} className="badge bg-light text-dark border">
                        <i className="bi bi-wrench-adjustable-circle me-1 text-secondary"></i>
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex flex-column gap-2">
                  <button className="btn btn-outline-danger btn-sm" onClick={()=>handledelete(index)}>
                    <i className="bi bi-trash3 me-1"></i> Delete
                  </button>
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-pencil-square me-1"></i> Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCreatedJob;
