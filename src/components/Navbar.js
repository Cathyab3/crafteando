import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
     navigate("/login");
  };

  /* clase para enlaces activos */
  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

    return (
     <header className={styles.navbar}>

      <div className={styles.container}>
        {/* Logo */}
        <NavLink to="/" className={styles.brand}>
          <img src="/logoCrafteando512.png" alt="Crafteando logo" />
        </NavLink>

        {/* Menú  */}
        <nav className={styles.menu}>
          <NavLink to="/mobs"        className={linkClass}>Mobs</NavLink>
          <NavLink to="/recursos"    className={linkClass}>Recursos</NavLink>
          <NavLink to="/marketplace" className={linkClass}>Marketplace</NavLink>
        
        {user && (
          <NavLink to="/profile" className={linkClass}>
            Perfil
          </NavLink>
          )}
        
        </nav>

        {/* Acción login / logout */}
        <div className={styles.authBox}>
          
          {user ? (
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Cerrar Sesión
            </button>
          ) : (
          <NavLink to="/login" className={linkClass}>
            Iniciar Sesión
          </NavLink>
         )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;