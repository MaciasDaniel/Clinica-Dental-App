import { Link } from "react-router-dom";
import "../stylesheets/Home.css";

const Home = () => {

  return (
    <div className="home-container">
      <div className="text-container">
        <p className="text">
          ¡<strong>Bienvenido</strong> a Salud Bucal, una clínica dental de excelencia!
          <br />
          Su bienestar oral es nuestra prioridad, y esperamos ser su elección de
          confianza
          <br />
          para todas sus necesidades dentales.
        </p>
        <div className="btn-read-container">
          <Link className="btn-read-more" to="/about">
            Leer más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;