import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const items = [
  {
    src: require("../assets/dentistas.jpg"),
    altText: "Acerca de Nosotros",
    caption:
      "Bienvenido a Salud Bucal, su destino confiable para la salud dental y la sonrisa perfecta. Nos enorgullece ofrecer una atención dental excepcional respaldada por un equipo de profesionales apasionados por su bienestar bucal. Creemos que una sonrisa saludable es esencial para una vida plena y estamos comprometidos a brindar el más alto nivel de cuidado dental a cada paciente que confía en nosotros.",
  },
  {
    src: require("../assets/dentista-mision.png"),
    altText: "Nuestra Misión",
    caption:
      "En Salud Bucal, nuestra misión es simple pero poderosa, mejorar la salud bucal de nuestros pacientes y transformar sonrisas. Creemos en la importancia de la prevención, la educación y el tratamiento dental personalizado. Nuestro objetivo es que cada visita a nuestra clínica sea una experiencia positiva, relajante y educativa para usted y su familia.",
  },
  {
    src: require("../assets/equipo-dentistas.jpg"),
    altText: "Comunidad y Compromiso Social",
    caption:
      "En Salud Bucal participamos activamente en iniciativas de salud bucal comunitaria y patrocinamos eventos locales. Nuestra pasión por la salud bucal se extiende más allá de las paredes de nuestra clínica.",
  },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img
          src={item.src}
          alt={item.altText}
          style={{
            borderRadius: "5px",
            marginLeft: "355px",
            marginTop: "20px",
            marginBottom: "210px",
            width: "600px",
            height: "400px",
          }}
          width="500px"
          height="100px"
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.altText}
        />
      </CarouselItem>
    );
  });

  return (
    <div style={
        {
          display: "flex",
          flexDirection: "column",
          boxShadow: "-15px 15px 30px rgba(0, 0, 0, 0.4)",
          marginTop: "70px",
          marginLeft: "430px",
          marginRight: "45px",
          backgroundColor: "#037ca1",
          border: "2px #fff solid",
          borderRadius: "30px",
          width: "1300px"
        }
      }>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default About;