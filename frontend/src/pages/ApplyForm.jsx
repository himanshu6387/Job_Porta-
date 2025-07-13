import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ApplyForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:'',
    email:'',
    phone:'',
    education: '',
    skills: '',
    address: '',
    resumeUrl: '',
    certificateUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(form.resumeUrl)) {
      alert("Please enter a valid Resume URL.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:8090/api/applied/apply/${jobId}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccess(true);
      alert("Applied successfully!");
      navigate('/'); // redirect to jobs page or dashboard
    } catch (err) {
      alert(err.response?.data?.msg || "Application failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Apply for Job</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input className="form-control my-2" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input className="form-control my-2" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
        <input className="form-control my-2" name="education" value={form.education} onChange={handleChange} placeholder="Education" required />
        <input className="form-control my-2" name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" required />
        <input className="form-control my-2" name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
        <input className="form-control my-2" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} placeholder="Resume URL" required />
        <input className="form-control my-2" name="certificateUrl" value={form.certificateUrl} onChange={handleChange} placeholder="Certificate URL (optional)" />

        <button className="btn btn-primary mt-3" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {success && <div className="alert alert-success mt-3">Application submitted successfully!</div>}
    </div>
  );
};

export default ApplyForm;
