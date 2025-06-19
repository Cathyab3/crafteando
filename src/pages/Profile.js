import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user, logout } = useAuth();

  /* Estadísticas de Minecraft */
  const [stats, setStats] = useState({
    horasJugadas: 0,
    coordsGuardadas: 0,
    recursosRecolectados: 0,
  });


   /* Simulación de carga (1 s) */
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        horasJugadas: Math.floor(Math.random() * 350) + 10,          // 10-359 h
        coordsGuardadas: Math.floor(Math.random() * 20) + 1,         // 1-20
        recursosRecolectados: Math.floor(Math.random() * 500) + 50,  // 50-549
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


   return (
    <section className={styles.page}>
      <Breadcrumb />
      <h2 className={styles.title}>Mi Perfil</h2>

      <div className={styles.card}>
        {/* Avatar + Nombre */}
        <div className={styles.header}>
          <div className={styles.avatar}>
            {(user?.name ?? user?.username ?? "Steve").charAt(0).toUpperCase()}
          </div>
          <h2>{user?.name || user?.username || "Steve"}</h2>
          <p className={styles.since}>Jugador desde 2025</p>
        </div>

        {/* Estadísticas */}
        <h3 className={styles.subTitle}>Estadisticas</h3>

        <div className={styles.grid}>
          <div className={styles.statBox}>
            <span className={`${styles.number} ${styles.blue}`}>
              {stats.horasJugadas}
            </span>
            <span>Horas Jugadas</span>
          </div>

          <Link to="/profile/coordenadas" className={styles.linkBox}>
            <div className={styles.statBox}>
              <span className={`${styles.number} ${styles.green}`}>
               {stats.coordsGuardadas}
             </span>
             <span>Coordenadas<br/>Guardadas</span>
            </div>
          </Link>

          <div className={styles.statBox}>
            <span className={`${styles.number} ${styles.yellow}`}>
              {stats.recursosRecolectados}
            </span>
            <span>Recursos Recolectados</span>
          </div>
        </div>

        {/* Logout */}
        <div className={styles.center}>
          <button onClick={logout} className={styles.logoutBtn}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;

