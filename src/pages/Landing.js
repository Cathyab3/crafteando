import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; 
import styles from "./Landing.module.css";

const Landing = () => {
  const { user } = useAuth();

/* Datos de las 4 categorías */
const categories = [
  {
    title: "Guía de Mobs",
    desc:  "Conoce cada criatura y enemigo del juego.",
    img :  "/images/Cat_Mobs.png",
    to  :  "/mobs",
  },
  {
    title: "Recursos",
    desc:  "Aprende dónde encontrar minerales, cultivos y más.",
    img :  "/images/Cat_Recursos.png",
    to  :  "/recursos",
  },
  {
    title: "Marketplace",
    desc:  "Explora mapas, skins y paquetes exclusivos.",
    img :  "/images/Cat_Marketplace.png",
    to  :  "/marketplace",
  },
  
];

 /* Si hay usuario logeado, se añade Coordenadas --- */
  if (user) {
    categories.push({
      title: "Coordenadas",
      desc:  "Consulta y guarda tus puntos de interés.",
      img:   "/images/cat_Coords.png",
      to:    "/coordenadas",
    });
  }

  return (
    <div>
      {/* SLIDER */}
      <Carousel fade interval={4000} className={styles.carouselFull}>
        <Carousel.Item>
          <img
            className={`d-block ${styles.carouselImage}`}
            src="/images/Slider1_SURVIVE.jpg"
            alt="Minecraft survive"
          />
          <Carousel.Caption>
            <h2 className={styles.overlayTitle}>Bienvenido a Crafteando!</h2>
            <p>Tu aplicación favorita para explorar el mundo de Minecraft</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={`d-block ${styles.carouselImage}`}
            src="/images/Slider2_CREATE.jpg"
            alt="Curiosidades"
          />
          <Carousel.Caption>
            <h2>Descubre curiosidades sobre los personajes y el mundo</h2>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={`d-block ${styles.carouselImage}`}
            src="/images/Slider3_EXPERIENCE.jpg"
            alt="Coordenadas"
          />
          <Carousel.Caption>
            <h2>Guarda todas tus coordenadas</h2>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* CATEGORÍAS */}
      <section className={styles.catSection}>
        <h2 className={styles.catTitle}>Explora las categorias</h2>

        <div className={styles.catGrid}>
          {categories.map(cat => (
            <Link key={cat.to} to={cat.to} className={styles.catCard}>
              <img src={cat.img} alt={cat.title} className={styles.catImg} />
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Landing;
