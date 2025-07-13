import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
// import './Login.css'; // <- Add this line to apply background style on mobile

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8090/api/user/login', form);
      login(res.data.token);
      toast.success(res.data.message);

      if (res.data.role === 'employer') {
        navigate('/employerPanel');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100">
      <div className="row g-0 min-vh-100">
        {/* Left side image (only for desktop) */}
        <div className="col-md-6 d-none d-md-block">
          <img
            src="https://img.freepik.com/free-photo/we-are-hiring-digital-collage_23-2149667031.jpg"
            alt="Job Portal Login"
            className="img-fluid w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right side form with bg image on mobile */}
        <div className="col-md-6 d-flex align-items-center justify-content-center login-bg">
          <div className="bg-dark bg-opacity-75 p-4 rounded w-100" style={{ maxWidth: '450px' }}>
            <h2 className="fw-bold mb-4 text-white text-center text-decoration-underline">Login</h2>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control bg-secondary text-white"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control bg-secondary text-white"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Remember me and forgot password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
                  <label className="form-check-label text-white" htmlFor="rememberMe"> Remember me </label>
                </div>
                <a href="#!" className="text-info small">Forgot password?</a>
              </div>

              {/* Submit */}
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-warning text-dark fw-bold">Login</button>
              </div>

              {/* Register Link */}
              <div className="text-center">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-info fw-bold text-decoration-none">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
