import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../stylesheets/EditUser.css";
import { toast } from 'react-toastify';

const EditUser = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    role: ""
  });

  const { name, lastName, username, email, role } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/update/user/${id}`, user);
      toast.success("¡Usuario actualizado exitosamente!");
      navigate("/user/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el usuario, inténtalo de nuevo");
    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/user/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-edit-container">
      <div className="form-edit-box">
        <h2 className="text-title">Editar Usuario</h2>
        <form onSubmit={onSubmit}>
          <div className="container-field">
            <label htmlFor="name" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Introduce tu nombre*"
              name="name"
              value={name}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="container-field">
            <label htmlFor="lastName" className="form-label">
              Apellidos:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Introduce tu apellido*"
              name="lastName"
              value={lastName}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="container-field">
            <label htmlFor="username" className="form-label">
              Nombre de usuario:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Introduce un nombre de usuario*"
              name="username"
              value={username}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="container-field">
            <label htmlFor="email" className="form-label">
              Correo electrónico:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Introduce tu correo electrónico*"
              name="email"
              value={email}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="container-field">
            <label htmlFor="role" className="form-label">
              Rol:
            </label>
            <select
              className="form-select"
              name="role"
              value={role}
              onChange={onInputChange}
            >
              <option value="ADMIN">Administrador</option>
              <option value="USER">Usuario</option>
            </select>
          </div>
          <Link className="btn btn-outline-danger" to="/user/dashboard">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-outline-primary my-3 mx-3">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;