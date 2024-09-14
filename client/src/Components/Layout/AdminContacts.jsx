import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminContacts = () => {
  const {authorizationToken}=useAuth();
  const [contactData,setContactData]=useState([])

  const getAllContactsData=async()=>{
    try {
      const response=await axios.get("http://localhost:8000/api/admin/contacts",{
        headers:{
          Authorization: authorizationToken,
        }
      })
      console.log("contactsData",response.data)
      if (response.status===200) {
        // toast.success("Admin isLoggedIn")
        const contactsAllData = await response.data;
        setContactData(contactsAllData);
        
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
        const response = await axios.delete(`http://localhost:8000/api/admin/contacts/delete/${id}`, {
            headers: {
                Authorization: authorizationToken
            }
        });
        if (response.status===200) {
            toast.success("Delete Successfully")
            const userDataDelete = await response.data;
            console.log(userDataDelete) 
            getAllContactsData()
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

  useEffect(()=>{
    getAllContactsData()
  },[])
  return (
    <>
      <h1>Admin Contacts Panel</h1>

      <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {contactData.map((userContact, index) => {
                  const{username,email,message}=userContact
                  return(
                    <tr key={userContact._id}>
                        <th scope="row">{index + 1}</th>  {/* Incrementing index for numbering */}
                        <td>{username}</td>  {/* Adjust according to your data structure */}
                        <td>{email}</td>
                        <td>{message}</td>
                        <Link to={`/admin/contacts/${userContact._id}/edit`}><button className='btn btn-success'>Edit</button></Link>
                        <td><button onClick={() => handleDeleteUser(userContact._id)} className='btn btn-danger'>Delete</button></td>
                    </tr>
                  )})}
            </tbody>
        </table>
    </>
  )
}

export default AdminContacts
