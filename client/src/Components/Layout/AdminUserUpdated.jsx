import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth.jsx';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const AdminUserUpdated = () => {
    const { authorizationToken } = useAuth();
    const { id } = useParams(); // Get user ID from route parameters
    const [data, setData] = useState({
        username: '',
        email: '',
        phone: ''
    });
    const navigate = useNavigate()

    // Fetch user data based on the ID
    const getSingleData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/admin/users/${id}`, {
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if (response.status === 200) {
                setData(response.data); // Set the user data into the state
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.extraDetails ? error.response.data.extraDetails : error.response.data.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    useEffect(() => {
        getSingleData();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({ ...data, [name]: value })
    };

    // Handle form submission to update user data
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:8000/api/admin/users/update/${id}`, data, {
                headers: {
                    Authorization: authorizationToken,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                toast.success('User data updated successfully');
                navigate("/admin/users")

            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <>
            <section>
                <div className="container">
                    <h1 className="main-heading text-center my-4">Update User Data</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={handleFormSubmit} className="w-80 mx-auto">
                                <div className="form-group mb-3">
                                    <label htmlFor="username">Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        onChange={handleInputChange}
                                        placeholder="Enter user name"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter user email"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter user role"
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Update User</button>
                            </form>

                        </div>
                        {/* image add */}
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <img
                                src="/images/update.jpg"
                                alt="User Profile"
                                className="img-fluid rounded"
                                style={{ maxHeight: '400px', width: '400px' }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminUserUpdated;
