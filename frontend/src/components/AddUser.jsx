import { React, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doLogin } from '../auth';
import '../stylesheets/AddUser.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const AddUser = () => {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    
    const { name, lastName, username, email, password } = user;

    const credentials = { username, password };

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/auth/register", user);
            
            const loginResponse = await axios.post("http://localhost:8080/auth/login", credentials);

            doLogin(loginResponse, () => {
                toast.success("¡Registro exitoso!, ¡Bienvenid@!");
                navigate("/user/dashboard");
            });
        } catch (error) {
            toast.error("Ha ocurrido un error, inténtalo de nuevo.");
        }
    };

    return (
        <div className='form-container-register'>
            <div className='form-box'>
                <h2 className='text-title'>Regístrate</h2>
                <form onSubmit={onSubmit}>
                    <div className='container-field'>
                        <label htmlFor='name' className='form-label'>
                            Nombre:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Ingresa tu nombre*'
                            name='name'
                            value={name}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className='container-field'>
                        <label htmlFor='lastName' className='form-label'>
                            Apellidos:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Ingresa tu apellido*'
                            name='lastName'
                            value={lastName}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className='container-field'>
                        <label htmlFor='username' className='form-label'>
                            Nombre de usuario:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Ingresa un nombre de usuario*'
                            name='username'
                            value={username}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className='container-field'>
                        <label htmlFor='email' className='form-label'>
                            Correo electrónico:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Ingresa tu correo electrónico*'
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className='container-field'>
                        <label htmlFor='password' className='form-label'>
                            Contraseña:
                        </label>
                        <div className='input-wrapper'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='form-control'
                                placeholder='Ingresa una contraseña*'
                                name='password'
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
                    <Link className='btn btn-outline-danger mx' to="/">
                        Cancelar
                    </Link>
                    <button type='submit' className='btn btn-outline-primary mx-2 my-4'>
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;