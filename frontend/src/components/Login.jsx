import { React, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/Login.css';
import { toast } from 'react-toastify';
import { doLogin } from '../auth';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  let navigate = useNavigate();
  
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: ""
  });

  const { username, password } = loginDetail;

  const onInputChange = (e) => {
    setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let login = await axios.post("http://localhost:8080/auth/login", loginDetail);
    
      if(login) {
        toast.success("¡Inició sesión correctamente!");
      }else{
        toast.error("Intenta iniciar sesión de nuevo.");
      }
    
      doLogin(login, () => {
        navigate("/user/dashboard");
      });
    } catch (error) {
      toast.error("Ha ocurrido un error, inténtalo de nuevo.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2 className='title-login'>Iniciar sesión</h2>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='username' className='form-label'>Nombre de usuario:</label>
            <input
              type='text'
              name='username'
              placeholder='Ingresa tu nombre de usuario*'
              value={username}
              onChange={onInputChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='form-label'>Contraseña:</label>
            <div className='password-container'>
              <input 
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Ingresa tu contraseña*'
                value={password}
                onChange={onInputChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className='buttons-container'>
            <button className='login-btn' type='submit'>Iniciar sesión</button>
            <Link to='/' className='btn btn-outline-danger mt-3'>Regresar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;