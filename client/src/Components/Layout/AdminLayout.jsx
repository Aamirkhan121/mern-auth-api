import React from 'react'
import {Navigate, NavLink, Outlet} from "react-router-dom"
import { FaHome, FaRegListAlt, FaUserAlt } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa6";
import { useAuth } from '../../store/auth';

const AdminLayout = () => {
    const {user,isLoading}= useAuth()

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
        )
    }
    if (!user.isAdmin) {
        return <Navigate to={'/'}/>
    }
  return (
    <>
    <header>
        <div className="container">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/admin/users"><FaUserAlt/> users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/contacts"><FaFacebookMessenger/> Contacts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/service"><FaRegListAlt/> Services</NavLink>
                    </li>
                    <li>
                        <NavLink to="/"> <FaHome /> Home</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <Outlet/>
    </>
  )
}

export default AdminLayout
