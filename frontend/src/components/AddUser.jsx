import { React, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/AddUser.css';

const AddUser = () => {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    const { name, lastName, username, email, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/auth/register", user);
        navigate("/");
    }

    return (
        <div className='form-container'>
            <div className='form-box'>
                <h2 className='text-title'>Regístrate</h2>
                <form onSubmit={(e) => onSubmit(e)}>
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
                            onChange={(e) => onInputChange(e)}
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
                            onChange={(e) => onInputChange(e)}
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
                            onChange={(e) => onInputChange(e)}
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
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </div>
                    <div className='container-field'>
                        <label htmlFor='password' className='form-label'>
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder='Ingresa una contraseña*'
                            name='password'
                            value={password}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
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
    )
}

export default AddUser;
