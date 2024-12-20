import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserIdFromToken } from "../utils/utils";
import "../stylesheets/EditDate.css";

const EditAppointment = () => {
	const [appointment, setAppointment] = useState({
		date: "",
		description: "",
		dentist: ""
	});
	const [userId, setUserId] = useState(null);
	const userIdFromToken = getUserIdFromToken();

	const navigate = useNavigate();
	const { id } = useParams();

	const { date, description, dentist } = appointment;

	const loadAppointment = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/dates/appointment/${id}`);
			setAppointment(response.data);
		} catch (error) {
			console.error("Error al obtener la cita:", error);
		}
	};

	useEffect(() => {
		setUserId(userIdFromToken);
		loadAppointment();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const updatedAppointment = {
		...appointment,
		};

		try {
			await axios.put(`http://localhost:8080/dates/update/appointment/${userId}/${id}`,
				updatedAppointment, {
					headers: {
						"Content-Type": "application/json",
					}
				}
			);

			toast.success("¡Cita actualizada exitosamente!");
			navigate("/user/dashboard");
		} catch (error) {
			console.error("Error al actualizar la cita:", error);
			toast.error("Error al actualizar la cita");
		}
	};

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setAppointment((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<div className="edit-appointment-container">
			<h2 className="edit-text">Editar Cita</h2>
			<form className="edit-appointment-form" onSubmit={handleSubmit}>
				<label htmlFor="updateDateHour">Cambiar la fecha y hora:</label>
				<input
					className="update-date-input"
					type="datetime-local"
					id="updateDateHour"
					name="date"
					value={date}
					onChange={onInputChange}
					required
				/>
				<label>Cambiar área de consulta:</label>
				<select
					className="area-select"
					name="description"
					value={description}
					onChange={onInputChange}
				>
					<option value="" selected disabled>
						Selecciona un área
					</option>
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
				<label>Cambiar dentista:</label>
				<select className="dentist-select"
					name="dentist"
					value={dentist}
					onChange={onInputChange}>
					<option value="" selected disabled>Selecciona un dentista</option>
					<option value="Sergio Acosta">Sergio Acosta</option>
					<option value="Juan Pérez">Juan Pérez</option>
					<option value="Miguel Rodríguez">Miguel Rodríguez</option>
					<option value="Javier González">Javier González</option>
					<option value="Giselle Martínez">Giselle Martínez</option>
				</select>
				<div className="btns-container">
					<button className="btn btn-outline-primary mt-3" type="submit">Guardar cambios</button>
					<Link className="btn btn-outline-danger mt-3" to="/user/dashboard">
						Cancelar
					</Link>
				</div>
			</form>
		</div>
	);
};

export default EditAppointment;