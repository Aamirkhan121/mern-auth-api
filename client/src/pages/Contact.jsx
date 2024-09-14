import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";

const ContactForm = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });
  // const[userData,setUserData]=useState(true);
  const {user}=useAuth()

  useEffect(()=>{
    if (user) {
      setContact({
        username:user.username,
        email:user.email,
        message:""
      })
      // setUserData(false)
    }
  },[user])


  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contact)
    try {
      const response = await axios.post("https://mern-auth-api-uve6.onrender.com/api/form/contact", contact);
      // console.log(response.data)
      if (response.status === 200) {
        setContact({
          username: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit" className="btn btn-success">Send &#9993;</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29196.87893615378!2d86.49926749328239!3d23.83246823783853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6b947772d5f73%3A0xc0dc38874b3100ba!2sGobindpur%2C%20Jharkhand%20828109!5e0!3m2!1sen!2sin!4v1724651463562!5m2!1sen!2sin" width="100%" height="450" loading="lazy" ></iframe>
        </section>
      </section>
    </>
  );
};

export default ContactForm;
