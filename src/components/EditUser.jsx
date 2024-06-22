import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../stylesheets/EditUser.css";

const EditUser = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
  });

  const { name, lastName, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/${id}`);
    setUser(result.data);
  };

  return (
    <div className="form-edit-container">
      <div className="form-edit-box">
        <h2 className="text-title">Editar Usuario</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="container-field">
            <label htmlFor="Name" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Introduce tu nombre"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
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
              placeholder="Introduce tu apellido"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
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
              placeholder="Introduce un nombre de usuario"
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
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
              placeholder="Introduce tu correo electrónico"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-primary my-3">
            Guardar
          </button>
          <Link className="btn btn-outline-danger mx-3" to="/user/dashboard">
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditUser;