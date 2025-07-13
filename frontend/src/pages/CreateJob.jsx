import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CreateJob = () => {

    const [job, setJob] = useState({
        title: '',
        location: '',
        company: '',
        experience: '',
        logo: '',
        skills: '',
        education: ''
    })

    const navigate = useNavigate()


    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = JSON.parse(localStorage.getItem('userId'))
        // Here we have done this because we need to send userId which we dont want do with form so we done here
        const formdata = {
            ...job,userId
        }
        const res = await axios.post('https://job-portal-backend-tti1.onrender.com/api/jobs/createJob', formdata)
        toast.success(res.data.message)
        navigate('/employerPanel')
    }
    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 rounded-4" style={{ boxShadow: '0 0 5px 1px gray' }}>
                        <div className="card-body p-5">
                            <h3 className="mb-4 text-center text-primary"><i className="bi bi-briefcase-fill me-2" />Create a New Job</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold"><i className="bi bi-pencil-square me-2" />Job Title</label>
                                        <input type="text" name="title" onChange={handleChange} className="form-control" placeholder="Frontend Developer" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold"><i className="bi bi-geo-alt-fill me-2" />Location</label>
                                        <input type="text" name="location" onChange={handleChange} className="form-control" placeholder="Remote / New York" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold"><i className="bi bi-building me-2" />Company</label>
                                        <input type="text" name="company" onChange={handleChange} className="form-control" placeholder="Google" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold"><i className="bi bi-person-workspace me-2" />Experience</label>
                                        <input type="text" name="experience" onChange={handleChange} className="form-control" placeholder="2+ years" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold"><i className="bi bi-image me-2" />Company Logo URL</label>
                                        <input type="url" name="logo" onChange={handleChange} className="form-control" placeholder="https://logo.png" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold"><i className="bi bi-tools me-2" />Skills</label>
                                        <input type="text" name="skills" onChange={handleChange} className="form-control" placeholder="React, Node.js, SQL" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-semibold"><i className="bi bi-mortarboard-fill me-2" />Education</label>
                                        <input type="text" name="education" onChange={handleChange} className="form-control" placeholder="B.Tech / M.Sc" required />
                                    </div>
                                </div>
                                <div className="d-grid mt-5">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        <i className="bi bi-plus-circle me-2" />Post Job
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateJob