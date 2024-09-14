import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
  return (
    <section id='error-page'>
        <div className="container content">
            <h2 className="header">404</h2>
            <h4 className="header">Sorry! Page not found</h4>
            <p>"Oops! The page you're looking for doesn't exist. It may have been moved or deleted. Please check the URL and try again, or return to the homepage. If you need further help, feel free to contact us."</p>

            <div className="btns">
                <NavLink className="btn btn-success" to="/">Return home</NavLink>
                <NavLink className="btn btn-danger" to="/contact">Contact us</NavLink>
            </div>
        </div>
      
    </section>
  )
}

export default Error
