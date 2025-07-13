import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaPlusCircle, FaUsers, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmployerPanel = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Welcome, Employer!</h2>

      <div className="row g-4 justify-content-center mt-5">
        {/* Create Job Card */}
        <div className="col-md-6 col-lg-4">
          <Card className="shadow-lg border-0 h-100 text-center p-4">
            <FaPlusCircle size={50} className="text-primary mb-3" />
            <Card.Title>Create New Job</Card.Title>
            <Card.Text>
              Post a new job and start finding your ideal candidates today.
            </Card.Text>
            <Button variant="primary" className="mt-auto">
              <Link to={'/createJob'} className=' nav-link'>Create Job</Link>
            </Button>
          </Card>
        </div>

        {/* View Applicants Card */}
        <div className="col-md-6 col-lg-4">
          <Card className="shadow-lg border-0 h-100 text-center p-4">
            <FaUsers size={50} className="text-success mb-3" />
            <Card.Title>View Applicants</Card.Title>
            <Card.Text>
              Browse through all candidates who applied for your job postings.
            </Card.Text>
            <Button variant="success" className="mt-auto">
              <Link className=' nav-link' to={'/viewApplicants'}>View Applicants</Link>
            </Button>
          </Card>
        </div>

        {/* My Created Jobs Card */}
        <div className="col-md-6 col-lg-4">
          <Card className="shadow-lg border-0 h-100 text-center p-4">
            <FaClipboardList size={50} className="text-warning mb-3" />
            <Card.Title>My Created Jobs</Card.Title>
            <Card.Text>
              See all the jobs you’ve posted and manage them easily.
            </Card.Text>
            <Button variant="warning" className="mt-auto text-white">
              <Link className=' nav-link' to={'/viewCreatedJob'}>View My Jobs</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerPanel;
