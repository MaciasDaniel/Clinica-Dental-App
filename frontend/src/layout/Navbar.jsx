import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/Navbar.css";
import { doLogout, isLoggedIn } from "../auth";
import { MdLogin } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { MdPersonAdd } from "react-icons/md";

function Navbar() {
  let navigate = useNavigate();

  const isUserLoggedIn = isLoggedIn();

  const logout = () => {
    doLogout(() => {
      navigate("/");
    });
  };

  if (isUserLoggedIn) {
    return (
      <>
        <nav className="dashboard-user">
          <Link className="dashboard-btn" to="/user/dashboard">
            Panel de Usuario
            <MdDashboard className="dashboard-icon" />
          </Link>
          <Link className="logout-btn" onClick={logout} to="/">
            Salir
            <FiLogOut className="logout-icon" />
          </Link>
        </nav>
      </>
    );
  } else {
    return (
      <div className="login-container-navbar">
        <p className="text-login">¿Ya tienes una cuenta?</p>
        <Link className="button-register" to="/adduser">
          Regístrate
          <MdPersonAdd className="register-icon" />
        </Link>
        <Link className="button-login" to="/login">
          Acceder
          <MdLogin className="login-icon" />
        </Link>
      </div>
    );
  }
};

export default Navbar;