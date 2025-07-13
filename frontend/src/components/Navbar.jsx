import React, { useContext, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { token,logout,user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/login');
        setShowModal(false)
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white position-sticky top-0 z-1 p-2 shadow">
                <div className="container-fluid">
                    <a className="navbar-brand fs-4 fw-bold" href="#">
                        JobHunt
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <FaBars />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-dark fw-bold" to={'/dashboard'} >Dashboard</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-dark fw-bold" >Jobs</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-dark fw-bold" >Browse</Link>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center">
                            {token ? (
                                <div className="d-flex align-items-center">
                                    <img
                                        src={user?user.profileImage:''}
                                        className="rounded-circle me-2"
                                        height={35}
                                        alt="Profile"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setShowModal(true)}
                                    />
                                </div>
                            ) : (
                               ''
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Modal */}
            {showModal && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow-lg">
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold text-primary">👤 Profile Actions</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={user.profileImage}
                                    className="rounded-circle mb-3"
                                    height={80}
                                    alt="Profile"
                                />
                                <p className="text-muted mb-4">Hii! Welcome <b>{user.name}</b></p>
                                <div className="d-grid gap-2">
                                    <Link
                                        to="/profile"
                                        className="btn btn-outline-primary fw-semibold rounded-pill"
                                        onClick={() => setShowModal(false)}
                                    >
                                        View Profile
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger fw-semibold rounded-pill"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Navbar;
