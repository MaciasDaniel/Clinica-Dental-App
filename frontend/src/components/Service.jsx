import React from 'react';
import '../stylesheets/Service.css';
import { FaRegCalendarPlus } from "react-icons/fa6";

const Service = ({ name, description, image, link, originalPrice, discountedPrice }) => {
  return (
    <div className='service-container'>
      <div className='service-box'>
        <img className='service-image' src={image} alt={name} />
        <h3 className='service-name'>{name}</h3>
        <p className='service-description'>{description}</p>
        <div className='service-prices'>
          <p className='service-original-price'>{originalPrice}</p>
          <p className='service-discounted-price'>{discountedPrice}</p>
        </div>
        <a className='service-link' href={link}>
          Agendar cita
          <FaRegCalendarPlus className='service-icon'/>
        </a>
      </div>
    </div>
  );
};

export default Service;