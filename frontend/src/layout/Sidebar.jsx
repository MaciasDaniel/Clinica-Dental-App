import React from 'react';
import '../stylesheets/Sidebar.css';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlinePhone } from 'react-icons/ai';
import { BsPeople, BsCalendar3 } from 'react-icons/bs';
import { TbDental } from 'react-icons/tb';

const Sidebar = () => {

  return (
    <div className='sidebar'>
      <div className='logo'>
        <img src={logo} alt='logotipo' className='image-logo' />
      </div>
      <hr className='line-sidebar' />
      <ul className='group-list'>
        <li className='group-list-item'><Link to='/' className='link'><AiOutlineHome className='home-icon' />Inicio</Link></li>
        <li className='group-list-item'><Link to='/about' className='link'><BsPeople className='about-icon'/>Nosotros</Link></li>
        <li className='group-list-item'><Link to='/services' className='link'><TbDental className='services-icon' />Servicios</Link></li>
        <li className='group-list-item'><Link to='/dates' className='link'><BsCalendar3 className='date-icon' />Citas</Link></li>
        <li className='group-list-item'><Link to='/contact' className='link'><AiOutlinePhone className='contact-icon' />Contacto</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;