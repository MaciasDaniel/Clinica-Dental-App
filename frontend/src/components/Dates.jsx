import { useState } from "react";
import { isLoggedIn } from "../auth";
import '../stylesheets/Dates.css';
import axios from "axios";

const Dates = () => {
  const isLogged = isLoggedIn();
  const [date, setDate] = useState("");

  const userData = JSON.parse(localStorage.getItem("data"));
  const userId = userData.id;

  const onInputChange = (e) => {
    setDate(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Fecha y hora enviadas:", date);
    await axios.post(`http://localhost:8080/dates/user/${userId}`, { date });
    setDate("");
  };

  return (
    <div className="date-container">
      <form className="date-form">
        <label htmlFor="fechaHora">Ingresa la fecha y hora:</label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => onInputChange(e)}
          required
        />
        <br />
        <div className="enabled-btn">
          {isLogged ? (
            <button className="enabled-btn" onClick={handleSubmit}>
              Agendar cita
            </button>
          ) : (
            <p>Registrate e inicia sesión para agendar una cita</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Dates;
