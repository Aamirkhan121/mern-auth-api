import axios from 'axios'
import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const URL="http://localhost:8000/api/auth/login"

const Login = () => {
  const[formData,setFormData]=useState({
    email:"",
    password:""
  })
  const navigate=useNavigate();
  const {storeTokenInLS}=useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setError('');
    setSuccess('');

    try {
      const response=await axios.post(URL,formData);
      setSuccess(response.data.msg);
      console.log("login", response)
      if (response.status===200) {
        storeTokenInLS(response.data.token)
        setFormData({
          email:"",
          password:""
        })
        // toast.success("Login successfull")
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
                <img src="/images/login.png" width="500" height="500" alt="register image" />
              </div>

              {/* lets tackle registration form */}

              <div className="registration-form">
                <h1 className="main-heading marginbottom-3">LogIn Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
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
                  <button type="submit" className="btn btn-primary">Log In</button>
                </form>

                {error && <p className="text-danger mt-3">{error}</p>}
                {success && <p className="text-success mt-3">{success}</p>}
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login
