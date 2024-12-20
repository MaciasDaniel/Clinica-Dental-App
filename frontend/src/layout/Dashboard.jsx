import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import {
  getUserIdFromToken,
  getUserRoleFromToken,
  getUsernameFromToken,
} from "../utils/utils";
import { CiSearch } from "react-icons/ci";
import { BiSolidUserDetail } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "../stylesheets/Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [dates, setDates] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [filter, setFilter] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [dataQt] = useState(8);
  const userIdFromToken = getUserIdFromToken();
  const userRoleFromToken = getUserRoleFromToken();
  const usernameFromToken = getUsernameFromToken();

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/v1/users");
      if (result.data) {
        setUsers(result.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      setUsers([]);
    }
  };

  const loadAppointmentsByUserId = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/dates/user/${userId}`
      );
      const formattedDates = result.data.map((date) => {
        const formattedDate = new Date(date.date).toLocaleString("es-MX", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return { ...date, formattedDate };
      });
      setDates(formattedDates);
    } catch (error) {
      setDates([]);
    }
  };

  useEffect(() => {
    setUserRole(userRoleFromToken);
    setUserId(userIdFromToken);
    setUsername(usernameFromToken);
    try {
      if (userRole === "ADMIN") {
        loadUsers();
      } else if (userRole === "USER") {
        loadAppointmentsByUserId();
      }
    } catch (error) {
      console.error(error);
    }
  }, [userRole, userId]);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/delete/user/${id}`);
    loadUsers();
  };

  const deleteDate = async (id) => {
    await axios.delete(`http://localhost:8080/dates/delete/appointment/${id}`);
    loadAppointmentsByUserId();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const filteredData = users.filter((user) => {
    if (filter === "id") {
      return user.id.toString().includes(searchTerm);
    } else {
      return user[filter]?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const filteredDates = dates.filter((date) => {
    if (filter === "id") {
      return date.id.toString().includes(searchTerm);
    } else {
      return date[filter]?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const nPages = Math.ceil(users.length / dataQt);
  const nPagesDates = Math.ceil(filteredDates.length / dataQt);

  const getPaginatedUsers = () => {
    const startIndex = currentPage * dataQt;
    const endIndex = startIndex + dataQt;
    return filteredData.slice(startIndex, endIndex);
  };

  const getPaginatedDates = () => {
    const startIndex = currentPage * dataQt;
    const endIndex = startIndex + dataQt;
    return filteredDates.slice(startIndex, endIndex);
  };

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
              <option value="id">ID</option>
              <option value="name">Nombre</option>
              <option value="lastName">Apellidos</option>
              <option value="username">Nombre de usuario</option>
              <option value="email">Correo electrónico</option>
            </select>
            <div className="input-container">
              <CiSearch className="search-icon" />
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
              {getPaginatedUsers().map((user, index) => (
                <tr key={index}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link className="btn btn-info mx-2" to={`/${user.id}`}>
                      <BiSolidUserDetail />
                    </Link>
                    <Link
                      className="btn btn-warning mx-2"
                      to={`/edituser/${user.id}`}
                    >
                      <RiEdit2Fill />
                    </Link>
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {userRole === "USER" && (
        <div className="dashboard-container-user">
          <div className="title-container">
            {username && <h2 className="title-user">¡Bienvenido/a, {username}!</h2>}
          </div>
          <div className="btn-container-date">
            <Link className="btn-add-date" to="/dates">
              Agregar cita <IoMdAdd className="add-date-icon" />
            </Link>
          </div>
          <div className="search-bar">
            <select
              className="selector"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="id">Turno</option>
              <option value="description">Descripción</option>
              <option value="dentist">Dentista</option>
            </select>
            <div className="input-container">
              <CiSearch className="search-icon" />
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
                <th>Turno</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Dentista</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedDates().map((date) => (
                <tr key={date.id}>
                  <td>{date.id}</td>
                  <td>{date.formattedDate}</td>
                  <td>{date.description}</td>
                  <td>{date.dentist}</td>
                  <td>
                    <Link
                      className="btn btn-warning mx-2"
                      to={`/editappointment/${date.id}`}
                    >
                      <RiEdit2Fill />
                    </Link>
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={() => deleteDate(date.id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            nPages={nPagesDates}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;