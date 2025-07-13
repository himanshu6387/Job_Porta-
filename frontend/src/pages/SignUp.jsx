import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
// import './Signup.css'; // for responsive background CSS

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    profileImage: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setForm({ ...form, profileImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('role', form.role);
    formData.append('profileImage', form.profileImage);

    try {
      const res = await axios.post('https://job-portal-backend-tti1.onrender.com/api/user/signup', formData);
      toast.success(res.data.message);
      if (res.data.success) {
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100">
      <div className="row g-0 min-vh-100">
        {/* Left Image for Desktop */}
        <div className="col-md-6 d-none d-md-block">
          <img
            src="https://cdn.pixabay.com/photo/2015/06/10/07/03/building-804526_1280.jpg"
            alt="Job Portal Visual"
            className="img-fluid w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right Side Form (mobile = bg image) */}
        <div className="col-md-6 d-flex align-items-center justify-content-center signup-bg">
          <div className="bg-dark bg-opacity-75 p-4 rounded w-100" style={{ maxWidth: '500px' }}>
            <h2 className="fw-bold mb-4 text-white text-center text-decoration-underline">Sign Up</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control bg-secondary text-white"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control bg-secondary text-white"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control bg-secondary text-white"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role */}
              <div className="mb-3">
                <label className="form-label text-white">Role</label>
                <select
                  className="form-select bg-secondary text-white"
                  name="role"
                  onChange={handleChange}
                  value={form.role}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="employee">Employee</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              {/* Profile Image */}
              <div className="mb-4">
                <label className="form-label text-white">Upload Profile Image</label>
                <input
                  type="file"
                  name="profileImage"
                  className="form-control bg-secondary text-white"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
              </div>

              {/* Submit */}
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary text-white fw-bold">Create Account</button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-info fw-bold text-decoration-none">Login Here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
