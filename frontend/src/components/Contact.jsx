import React from 'react';
import '../stylesheets/Contact.css';
import { FaPhoneAlt } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";

const Contact = () => {
  return (
    <div className='contact-container'>
      <h2 className='title-contact'>Contáctanos</h2>
      <div className='content-container'>
        <div className='map-container'>
          <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14385.397438718892!2d-100.38165193592845!3d25.65971128030934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bdf2b92bb515%3A0xe35729efb465f2b1!2sDel%20Valle%2C%20San%20Pedro%20Garza%20Garc%C3%ADa%2C%20N.L.!5e0!3m2!1ses-419!2smx!4v1698449876013!5m2!1ses-419!2smx" ttlle="Google map" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className='contact-info'>
          <p>
            <FaPhoneAlt className='phone-icon' />
            (+52) 81 2345 6789
          </p>
          <p>
            <LuAlarmClock className='clock-icon' />
            Lunes a Viernes 9:00 am - 7:00 pm
          </p>
        </div>
        <div className='form-container'>
          <form>
            <div className='file mid'>
              <input className='input-mid' type='text' name='name' placeholder='Nombre*' />
              <input className='input-mid' type='text' name='email' placeholder='Correo electrónico*' />
            </div>
            <div className='file'>
              <input className='input-full' type='text' name='subject' placeholder='Asunto*' />
            </div>
            <div className='file'>
              <textarea className='input-full' name='message' cols='30' rows='10' placeholder='Comentarios*' ></textarea>
            </div>
            <input className='btn-send' type='submit' value='Enviar' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact;