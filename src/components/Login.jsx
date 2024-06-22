import { React, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/Login.css';
import { toast } from 'react-toastify';
import { doLogin } from '../auth';

const Login = () => {

  let navigate = useNavigate();
  
  const [loginDetail, setLoginDetail] = useState(
    {
      username: "",
      password: ""
    });

  const { username, password } = loginDetail;

  const onInputChange = (e) => {
    setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let login = await axios.post("http://localhost:8080/auth/login", loginDetail);
    
    if(login) {
      toast.success("¡Inició sesión correctamente!");
    }else{
      toast.error("Intenta iniciar sesión de nuevo.");
    }
    
    doLogin(login, () => {
      navigate("/user/dashboard");
    });
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2 className='title-login'>Iniciar sesión</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='username'>Nombre de usuario:</label>
            <input
              type='text'
              name='username'
              placeholder='Ingresa tu nombre de usuario*'
              value={username}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Contraseña:</label>
            <input 
              type='password'
              name='password'
              placeholder='Ingresa tu contraseña*'
              value={password}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <button type='submit'>Iniciar sesión</button>
          <br />
          <br />
          <Link to='/' className='btn btn-outline-danger'>Regresar</Link>
        </form>
      </div>
    </div>
  )
}

export default Login;
