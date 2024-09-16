import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth.jsx';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    const { authorizationToken } = useAuth();
    const [usersData, setuserData] = useState([]);

    const getAllUsersData = async () => {
        try {
            const response = await axios.get("https://mern-auth-api-uve6.onrender.com/api/admin/users", {
                headers: {
                    Authorization: authorizationToken
                }
            });
            if (response.status===200) {
                // toast.success("Admin isLoggedIn")
                const userAllData = await response.data;
                setuserData(userAllData);
                
            }
        } catch (error) {
            if (error.response && error.response.data) {
                // Display the error message from the backend in an alert
                toast.error(error.response.data.extraDetails ? error.response.data.extraDetails:error.response.data.message);
              } else {
                toast.error('An unexpected error occurred');
              }
        }
    };

    const handleDeleteUser=async(id)=>{
        try {
            const response = await axios.delete(`https://mern-auth-api-uve6.onrender.com/api/admin/users/delete/${id}`, {
                headers: {
                    Authorization: authorizationToken
                }
            });
            if (response.status===200) {
                toast.success(response.data.message)
                const userDataDelete = await response.data;
                console.log(userDataDelete) 
                getAllUsersData()
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


    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone.No</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {usersData.map((user, index) => {
                    const {username,email,phone}=user
                    return(
                    <tr key={user._id}>
                        <th scope="row">{index + 1}</th>  {/* Incrementing index for numbering */}
                        <td>{username}</td>  {/* Adjust according to your data structure */}
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>
                            <Link to={`/admin/users/${user._id}/edit`} className="btn btn-warning">Edit</Link>
                        </td>
                        <td>
                        <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr >
                   )})}
            </tbody>
        </table>
    );
}

export default AdminUsers;

