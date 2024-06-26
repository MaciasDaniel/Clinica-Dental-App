import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../stylesheets/Dashboard.css";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataQt] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("id");
  const [userRole, setUserRole] = useState(0); //Hacer un metodo para obtener el id dinamicamente del usuario logueado y obtener el role.

  const loadUsers = async (currentPage) => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/users/${currentPage}`
      );
      if (result.data && result.data.content) {
        console.log(result.data.content);
        setUsers(result.data.content);
      } else {
        setUsers([]);
      }
    } catch (error) {
      setUsers([currentPage]);
    }
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  const nPages = Math.ceil(users.length / dataQt);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/delete/user/${id}`);
    loadUsers();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = users.filter((user) => {
    if (filter === "id") {
      return user.id.toString().includes(searchTerm);
    } else {
      return user[filter].toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const hasRole = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/v1/user/${id}`);
    const userData = response.data;
    const role = userData.role;
    setUserRole(role);
  };

  useEffect(() => {
    hasRole(1);
  }, []);

  return (
    <>
      {userRole === "ADMIN" && (
        <div className="dashboard-container">
          <div className="search-bar">
            <select
              className="selector"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="id">Turno</option>
              <option value="name">Nombre</option>
              <option value="lastName">Apellidos</option>
              <option value="username">Nombre de usuario</option>
              <option value="email">Correo electrónico</option>
            </select>
            <div className="input-container">
              <input
                className="input-text"
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <table className="table-container">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Nombre de usuario</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link className="btn btn-info mx-2" to={`/${user.id}`}>
                      Detalles
                    </Link>
                    <Link
                      className="btn btn-warning mx-2"
                      to={`/edituser/${user.id}`}
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            nPages={nPages}
          />
        </div>
      )}

      {userRole === "DENTIST" && (
        <div className="dashboard-container">
          <h1>Dashboard de Dentista</h1>
      </div>
      )}

      {userRole === "USER" && (
        <div className="dashboard-container">
          <h1>Dashboard de Usuario</h1>
      </div>
      )}
    </>
  );
};

export default Dashboard;
