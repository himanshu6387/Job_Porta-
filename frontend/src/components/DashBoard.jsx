import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashBoard = () => {

    const [jobs, setJobs] = useState([])
    const { user,search,setSearch } = useContext(AuthContext)

    const apifetch = async () => {
        const res = await axios.get('https://job-portal-backend-tti1.onrender.com/api/jobs/getAllJobs')
        setJobs(res.data.jobs)
    }

    useEffect(() => {
        apifetch()
    }, [])

    const filteredData =  jobs.filter((item)=> item.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            {/* Hero Section */}
            <section className="text-center py-5 bg-light pt-5">
                <div className="container">
                    <span className="badge bg-light text-danger border border-danger mb-3">
                        No. 1 Job Hunt Website
                    </span>

                    <h1 className="fw-bold mb-3 mt-4">
                        Search, Apply & Get Your <span className="text-primary">Dream Jobs</span>
                    </h1>

                    <p className="text-muted mb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus adipisci cupiditate cum.
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>

                    {/* Search Box */}
                    <div className="input-group mb-4 mt-3 w-75 mx-auto">
                        <input
                            type="text"
                            className="form-control rounded-start-pill ps-4"
                            placeholder="Find your dream jobs" value={search} onChange={(e)=>setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary rounded-end-pill px-4">
                            <FaSearch />
                        </button>
                    </div>

                    {/* Job Categories */}
                    <div className="d-flex justify-content-center flex-wrap gap-3 mb-5 mt-2">
                        <span className="btn btn-outline-secondary rounded-pill">Frontend Developer</span>
                        <span className="btn btn-outline-secondary rounded-pill">Backend Developer</span>
                        <span className="btn btn-outline-secondary rounded-pill">Data Engineer</span>
                    </div>

                    {/* Login Buttons */}
                    <div className="d-flex justify-content-center gap-3 mt-5">
                        {
                            user ?
                                <>

                                </>
                                :
                                <>
                                    <button className="btn btn-outline-primary px-4 rounded-pill">
                                        <Link to={'/login'} className=' nav-link'>Login as Job Seeker</Link>
                                    </button>
                                    <button className="btn btn-outline-success px-4 rounded-pill">
                                        <Link to={'/login'} className=' nav-link'>Login as Employer</Link>
                                    </button>
                                </>
                        }
                    </div>
                </div>
            </section>

            {/* Latest Job Openings Section */}
            <section className="container my-5">
                <h4 className="fw-bold text-start mb-4">
                    <span className="text-primary">Latest</span> and <span className="text-danger">Top</span> Job Openings
                </h4>




                {/* Job Cards */}
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Google</h5>
                                <p className="card-text">Frontend Developer - Remote</p>
                            </div>
                        </div>
                    </div>
                    {/* Add more job cards if needed */}
                </div>

                {/* Here i want to all created Jobs */}

                <div className="row">
                    {filteredData.length > 0 ? filteredData.map((job, i) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={i}>
                            <div className="card h-100 border shadow-sm rounded-4 overflow-hidden">

                                {/* Full-width Banner Image */}
                                <img
                                    src={job.logo || "https://via.placeholder.com/600x200.png?text=Company+Banner"}
                                    alt="Company logo"
                                    className="w-100"
                                    style={{ height: "180px" }}
                                />

                                {/* Card Body */}
                                <div className="card-body d-flex flex-column">
                                    {/* Company + Job Title */}
                                    <div className="mb-3">
                                        <h5 className="mb-1 fw-bold">{job.title}</h5>
                                        <p className="text-muted mb-0">{job.company}</p>
                                    </div>

                                    {/* Job Info */}
                                    <ul className="list-unstyled small mb-3">
                                        <li className="mb-1">
                                            <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                                            {job.location}
                                        </li>
                                        <li className="mb-1">
                                            <i className="bi bi-mortarboard text-info me-2"></i>
                                            {job.education}
                                        </li>
                                        <li className="mb-1">
                                            <i className="bi bi-person-workspace text-success me-2"></i>
                                            {job.experience}
                                        </li>
                                    </ul>

                                    {/* Skills */}
                                    <div className="mb-3">
                                        <span className="fw-semibold">Skills:</span><br />
                                        {job.skills?.split(',').map((skill, index) => (
                                            <span key={index} className="badge bg-light text-dark border me-1 mb-1">{skill.trim()}</span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-auto d-flex gap-2">
                                        <Link to={`/job/${job._id}`} className="btn btn-outline-primary w-50 btn-sm rounded-pill">
                                            View
                                        </Link>
                                        {user?.appliedJobs?.includes(job._id) ? (
                                            <button className="btn btn-secondary w-50 btn-sm rounded-pill" disabled>
                                                Applied
                                            </button>
                                        ) : (
                                            <Link to={`/apply/${job._id}`} className="btn btn-primary w-50 btn-sm rounded-pill">
                                                Apply
                                            </Link>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center">No job listings found.</p>
                    )}
                </div>




            </section>

            {/* Why Us Section */}
            <main className="mt-5">
                <div className="container">
                    <section className="mb-5 text-center">
                        <h2 className="mb-4">Why NexaJobs?</h2>
                        <p className="text-muted mb-5">
                            We bridge the gap between employers and job seekers by providing a seamless hiring and job search experience.
                        </p>

                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/008/984/103/original/job-search-recruitment-workgroup-freelance-web-graphic-design-flat-design-modern-illustration-vector.jpg"
                                        className="card-img-top"
                                        alt="Easy Posting" style={{ height: '400px' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">Post Jobs Easily</h5>
                                        <p className="card-text">
                                            Employers can post jobs quickly and track applications in real-time.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src="https://cdn3.vectorstock.com/i/1000x1000/10/77/applicant-looking-for-a-job-vector-19961077.jpg"
                                        className="card-img-top"
                                        alt="Smart Search" style={{ height: '400px' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">Smart Job Search</h5>
                                        <p className="card-text">
                                            Job seekers can explore relevant roles using intelligent filters and suggestions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/thumbnails/020/811/045/small_2x/hiring-employee-open-recruitment-concept-job-vacancy-illustration-free-vector.jpg"
                                        className="card-img-top"
                                        alt="Real-time Alerts" style={{ height: '400px' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">Real-Time Alerts</h5>
                                        <p className="card-text">
                                            Stay updated with new job postings and application responses instantly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default DashBoard;
