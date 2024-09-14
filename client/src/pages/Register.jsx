import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const URL='https://mern-auth-api-uve6.onrender.com/api/auth/register'

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: '',
    phone: '',
    password: ''
  })

  const navigate=useNavigate();
  const {storeTokenInLS}=useAuth();
  // const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    // setError('');
    setSuccess('');

    try {
      const response=await axios.post(URL,formData);
      setSuccess(response.data.msg)

      console.log("response data : ", response);
      if (response.status===200) {
        toast.success("Register successfull")
        storeTokenInLS(response.data.token)
        setFormData({ 
          username: "",
          email: '',
          phone: '',
          password: ''
        })
        navigate("/")
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Display the error message from the backend in an alert
        toast.error(error.response.data.extraDetails ? error.response.data.extraDetails:error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  }
  return (
    <>
      <section className="register-section">
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src="/images/register.png" width="500" height="500" alt="register image" />
              </div>

              {/* lets tackle registration form */}

              <div className="registration-form">
                <h1 className="main-heading marginbottom-3">Registration Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">UserName</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-describedby="emailHelp"
                      required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Register's</button>
                </form>

                {/* {error && <p className="text-danger mt-3">{error}</p>} */}
                {success && <p className="text-success mt-3">{success}</p>}
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Register
