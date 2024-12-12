import React from 'react';
import Service from './Service';
import serviceData from '../data/serviceData';
import '../stylesheets/Services.css';

const Services = () => {
  return (
    <div className='services-container'>
      <div className='services-box'>
        {serviceData.map((service, index) => 
          <Service
            key={index}
            name={service.name}
            description={service.description}
            image={service.image}
            link={service.link}
            originalPrice={service.originalPrice}
            discountedPrice={service.discountedPrice}
          />
        )}
      </div>
    </div>
  )
}

export default Services;