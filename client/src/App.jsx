import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './Components/Navbar';
import Service from './pages/Service';
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './Components/Footer';
import Error from './pages/Error';
import Logout from './pages/Logout';
import AdminLayout from './Components/Layout/AdminLayout';
import AdminContacts from './Components/Layout/AdminContacts';
import AdminUsers from './Components/Layout/AdminUsers';
import AdminUserUpdated from './Components/Layout/AdminUserUpdated';
// import AdminContactUpdate from './Components/Layout/AdminContactUpdate';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/admin' element={<AdminLayout/>}>
        <Route path="users/:id/edit" element={<AdminUserUpdated/>}/>
        <Route path='users' element={<AdminUsers/>}/>
        <Route path='contacts' element={<AdminContacts/>}/>
        {/* <Route path="contacts/:id/edit" element={<AdminContactUpdate/>}/> */}
        </Route>

        <Route path='*' element={<Error/>}/>
      </Routes>
     <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App

