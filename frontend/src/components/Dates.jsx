import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../stylesheets/Dates.css";
import { isLoggedIn } from "../auth";
import axios from "axios";

const Dates = () => {
  const [selected, setSelected] = useState();
  const { id } = useParams();
  const [date, setDate] = useState(
    {
      fecha: format(selected, "yyyy-MM-dd:00:00:00")
    }
  );

  const isLogged = isLoggedIn();

  const onSubmit = async (e) => {
    e.preventDefault();

    setDate({ ...date, fecha: format(selected, "yyyy-MM-dd:00:00:00") });

    try {
      const response = await axios.post(`http://localhost:8080/dates/save/${id}`, date);
      console.log(response.data);
    } catch (error) {
      console.error("Error al agendar la cita:", error.message);
    }
  }

  let footer = <p>Agenda tu cita.</p>;
  if (selected) {
    footer = <p>Tu cita: {format(selected, "PP")}.</p>;
  }

  return (
    <div className="daypick-container">
      <form onSubmit={(e) => onSubmit(e)}>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
          value={date}
        />
        <div className="btn-container">
          {
            isLogged &&
            <button className="enabled-btn">Agendar cita</button>
          }
        </div>
      </form>
    </div>
  );
};

export default Dates;