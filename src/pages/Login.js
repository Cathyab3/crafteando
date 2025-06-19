import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Breadcrumb from "../components/Breadcrumb";
import styles from "./Login.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();


   // Redirigir si ya hay sesión
   if (user) {
       return <Navigate to="/profile" replace />;
   }

   const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);
       setError('');


       if (!credentials.username || !credentials.password) {
           setError('Por favor, completa todos los campos');
           setLoading(false);
           return;
       }


       if (login(credentials)) {
           navigate('/profile');
       } else {
           setError('Credenciales incorrectas. Usa steve/craftear');
       }
       setLoading(false);
   };


    return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <Breadcrumb />

        <form onSubmit={handleSubmit} className={styles.card}>
          <h2>Iniciar Sesion</h2>

          <input
            type="text"
            placeholder="Usuario (steve)"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Contraseña (craftear)"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className={styles.input}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.btn}>
            {loading ? "Iniciando…" : "Ingresar"}
          </button>

          <p className={styles.hint}>
            Credenciales de prueba:&nbsp;
            <strong>steve / craftear</strong>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
