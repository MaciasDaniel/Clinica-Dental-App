import React from 'react';
import '../stylesheets/Service.css';

const Service = ({ name, description }) => {
  return (
    <div className='service-container'>
      <div className='service-box'>
        <h3 className='service-name'>{name}</h3>
        <hr />
        <p className='service-description'>{description}</p>
      </div>
    </div>
  )
}

export default Service;