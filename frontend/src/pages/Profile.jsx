import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {

    const {user,setUser} = useContext(AuthContext)
    if(!user) return
    return (
        <section style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container py-5">
                <div className="row">
                    {/* Profile Sidebar */}
                    <div className="col-lg-4">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body text-center">
                                <img src={user.profileImage} alt="avatar" className="rounded-circle img-fluid mb-3" style={{ width: 150 }} />
                                <h5 className="mb-1">{user.name}</h5>
                                <p className="text-muted mb-2">{user.role}</p>
                                <p className="text-muted">Bay Area, San Francisco, CA</p>
                                <div className="d-flex justify-content-center gap-2">
                                    <button className="btn btn-primary btn-sm">Follow</button>
                                    <button className="btn btn-outline-primary btn-sm">Message</button>
                                </div>
                            </div>
                        </div>
                        {/* Social Links */}
                        <div className="card shadow-sm">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex align-items-center gap-2">
                                    <i className="bi bi-linkedin" /> <span>Linkedin</span>
                                </li>
                                <li className="list-group-item d-flex align-items-center gap-2">
                                    <i className="bi bi-github" /> <span>Github</span>
                                </li>
                                <li className="list-group-item d-flex align-items-center gap-2">
                                    <i className="bi bi-twitter-x" style={{ color: '#55acee' }} /> <span>Twitter</span>
                                </li>
                                <li className="list-group-item d-flex align-items-center gap-2">
                                    <i className="bi bi-instagram" style={{ color: '#ac2bac' }} /> <span>Instagram</span>
                                </li>
                                <li className="list-group-item d-flex align-items-center gap-2">
                                    <i className="bi bi-facebook" style={{ color: '#3b5998' }} /> <span>Facebook</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Profile Info */}
                    <div className="col-lg-8">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-sm-3 fw-semibold">Full Name</div>
                                    <div className="col-sm-9 text-muted">{user.name}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3 fw-semibold">Email</div>
                                    <div className="col-sm-9 text-muted">{user.email}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3 fw-semibold">Phone</div>
                                    <div className="col-sm-9 text-muted">(097) 234-5678</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3 fw-semibold">Role</div>
                                    <div className="col-sm-9 text-muted">{user.role}</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 fw-semibold">Location</div>
                                    <div className="col-sm-9 text-muted">Bay Area, San Francisco, CA</div>
                                </div>
                            </div>
                        </div>
                        {/* Project Status Cards */}
                        <div className="row">
                            {/* Card 1 */}
                            <div className="col-md-6">
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-body">
                                        <p className="text-primary fw-semibold mb-3">Assignment - Project Status</p>
                                        <div className="mb-3">
                                            <p className="mb-1 small">Web Design</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '80%' }} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="mb-1 small">Website Markup</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '72%' }} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="mb-1 small">One Page</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '89%' }} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="mb-1 small">Mobile Template</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '55%' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mb-1 small">Backend API</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '66%' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Card 2 (Duplicate if needed) */}
                            <div className="col-md-6">
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-body">
                                        <p className="text-primary fw-semibold mb-3">Assignment - Project Status</p>
                                        <div className="mb-3">
                                            <p className="mb-1 small">Web Design</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '80%' }} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="mb-1 small">Website Markup</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '72%' }} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="mb-1 small">One Page</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '89%' }} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="mb-1 small">Mobile Template</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '55%' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mb-1 small">Backend API</p>
                                            <div className="progress" style={{ height: 5 }}>
                                                <div className="progress-bar" style={{ width: '66%' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> {/* End Project Status row */}
                    </div> {/* End col-lg-8 */}
                </div> {/* End main row */}
            </div>
        </section>


    )
}

export default Profile