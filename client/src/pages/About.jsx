import React, { useState } from 'react'
import Analytics from '../Components/Analytics'
import { useAuth } from '../store/auth'

const About = () => {
  const{user}=useAuth()
  return (
    <>
      <main>
        <section className='section-hero'>
          <div className='container grid grid-two-cols'>
            <div className="hreo-content">
              <p>Welcome: {user ?`${user.username} To our website`:`To our website`}</p>
              <h1>Why Choose Us?</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam tempore id officia quae quia eaque dolor ratione repellendus eveniet veritatis.</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam tempore id officia quae quia eaque dolor ratione repellendus eveniet veritatis.</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam tempore id officia quae quia eaque dolor ratione repellendus eveniet veritatis.</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam tempore id officia quae quia eaque dolor ratione repellendus eveniet veritatis.</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam tempore id officia quae quia eaque dolor ratione repellendus eveniet veritatis.</p>
              <div className="btn btn-group">
                <a href="/contact">
                <button className='btn btn-primary'>connect now</button>
                </a>
                <a href="/services">
                <button className='btn btn-success'>learn more</button>
                </a>
              </div>
            </div>
            {/* hero image */}

            <div className="hero-image">
              <img src="/images/about.png" alt="about" width="400" height="500" />
            </div>
          </div>
        </section>
      </main>
      <Analytics/>
    </>
  )
}

export default About
