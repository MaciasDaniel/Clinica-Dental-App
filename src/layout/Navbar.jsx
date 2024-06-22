import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/Navbar.css";
import { doLogout, isLoggedIn } from "../auth";

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
          </Link>
          <Link className="logout-btn" onClick={logout} to="/">
            Cerrar Sesión
          </Link>
        </nav>
      </>
    );
  } else {
    return (
      <div className="login-container">
        <p className="text-login">¿Ya tienes una cuenta?</p>
        <Link className="button-register" to="/adduser">
          Regístrate
        </Link>
        <Link className="button-login" to="/login">
          Iniciar Sesión
        </Link>
      </div>
    );
  }
}

export default Navbar;
