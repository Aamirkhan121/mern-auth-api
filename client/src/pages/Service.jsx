import React from 'react';
import { useAuth } from '../store/auth';

const Service = () => {
  const { services } = useAuth();

  if (!Array.isArray(services)) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <section className='services-container'>
      <div className='heading'>
        <h1>Services</h1>
      </div>

      <div className='services-grid'>
        {services.length > 0 ? (
          services.map((curElem, index) => {
            const { price, description, provider, service } = curElem;
            return (
              <div key={index} className="card">
                <img src="/images/design.png" className="card-img-top" alt="Service Design" />
                <div className="card-body">
                  <h5 className="card-title">{service}</h5>
                  <p className="card-text">{description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Provider: {provider}</li>
                  <li className="list-group-item">Price: {price}</li>
                </ul>
              </div>
            );
          })
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </section>
  );
};

export default Service;


