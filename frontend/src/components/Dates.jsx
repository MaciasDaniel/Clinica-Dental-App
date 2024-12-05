import { useEffect, useState } from "react";
import { isLoggedIn } from "../auth";
import '../stylesheets/Dates.css';
import axios from "axios";
import { getUserIdFromToken } from "../utils/utils";
import { toast } from "react-toastify";

const Dates = () => {
  const [appointment, setAppointment] = useState({
    date: "",
    description: "",
    dentist: ""
  });

  const [userId, setUserId] = useState(null);

  const isLogged = isLoggedIn();

  const { date, description, dentist } = appointment;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/dates/user/${userId}`, appointment, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success("Cita agendada exitosamente!");
      setAppointment({ date: "", description: "", dentist: "" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const id = getUserIdFromToken();
    setUserId(id);
  }, [userId]);

  return (
    <div className="date-container">
      <form className="date-form" onSubmit={handleSubmit}>
        <label htmlFor="fechaHora">Ingresa la fecha y hora:</label>
        <input
          type="datetime-local"
          id="fechaHora"
          name="date"
          value={date}
          onChange={onInputChange}
          required
        />
        <label>Área de consulta:</label>
        <select className="area-select" name="description" value={description} onChange={onInputChange}>
          <option value="Ortodoncia">Ortodoncia</option>
          <option value="Endodoncia">Endodoncia</option>
          <option value="Limpieza Dental">Limpieza Dental</option>
          <option value="Blanqueamiento Dental">Blanqueamiento Dental</option>
          <option value="Implantología Dental">Implantología Dental</option>
          <option value="Cirugía Bucal">Cirugía Bucal</option>
          <option value="Odontopediatría">Odontopediatría</option>
          <option value="Prótesis Dentales">Prótesis Dentales</option>
          <option value="Periodoncia">Periodoncia</option>
          <option value="Estética Dental">Estética Dental</option>
        </select>
        <br />
        <br />
        <label>Dentista:</label>
        <select className="dentist-select" name="dentist" value={dentist} onChange={onInputChange}>
          <option value="Sergio Acosta">Sergio Acosta</option>
          <option value="Juan Pérez">Juan Pérez</option>
          <option value="Miguel Rodríguez">Miguel Rodríguez</option>
          <option value="Javier González">Javier González</option>
          <option value="Giselle Martínez">Giselle Martínez</option>
        </select>
        <br />
        <div className="enabled-btn">
          {isLogged ? (
            <button className="enabled-btn" type="submit">
              Agendar cita
            </button>
          ) : (
            <p>Regístrate o inicia sesión para agendar una cita</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Dates;
