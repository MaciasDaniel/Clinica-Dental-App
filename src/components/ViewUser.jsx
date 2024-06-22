import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../stylesheets/ViewUser.css";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/${id}`);
    setUser(result.data);
  };

  return (
    <div className="view-container">
      <h2 className="text-center m-4">Detalles de usuario</h2>
      <div className="card">
        <div className="card-header">
          Detalles del usuario con id: {user.id}
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Nombre: </b>
              {user.name}
            </li>
            <li className="list-group-item">
              <b>Apellidos: </b>
              {user.lastName}
            </li>
            <li className="list-group-item">
              <b>Nombre de usuario: </b>
              {user.username}
            </li>
            <li className="list-group-item">
              <b>Correo electrónico: </b>
              {user.email}
            </li>
          </ul>
        </div>
      </div>
      <Link className="btn btn-primary my-3" to={"/user/dashboard"}>
        Regresar
      </Link>
    </div>
  );
}
