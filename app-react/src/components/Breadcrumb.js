import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

const routeName = (segment) => {
  /* Etiquetas */
  const map = {
    "mobs": "Guía de Mobs",
    "recursos": "Recursos",
    "profile": "Perfil",
    "coordenadas": "Coordenadas",
    "login": "Iniciar Sesión",

  };
  return map[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
};

const Breadcrumb = () => {
  const { pathname } = useLocation();              // p.e. "/mobs/123"
  const segments = pathname.split("/").filter(Boolean);

  /* Ruta progresiva */
  const links = segments.map((seg, idx) => {
    const to = "/" + segments.slice(0, idx + 1).join("/");
    return { to, label: routeName(seg) };
  });

  return (
    <nav className={styles.breadcrumb}>
      <Link to="/" className={styles.link}>Inicio</Link>
      {links.map(({ to, label }, i) => (
        <span key={to}>
          <span className={styles.sep}>›</span>
          {i < links.length - 1 ? (
            <Link to={to} className={styles.link}>{label}</Link>
          ) : (
            <span className={styles.current}>{label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;