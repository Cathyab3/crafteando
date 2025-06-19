import { useApi } from "../hooks/useApi";
import { getMobs } from "../api/mockApi";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
import styles from "./Mobs.module.css";
import mobImgs from "../assets/mobImgs";

const placeholderImg = "/images/mobs/placeholder.png";

const Mobs = () => {
  const { data: mobs = [], loading, error } = useApi(getMobs, []);

  if (loading) return <p className={styles.status}>Cargando…</p>;
  if (error)   return <p className={styles.status}>Error: {error}</p>;


  const grupos = mobs.reduce((acc, m) => {
    const key = m.tipo ?? "Sin clasificación";
    (acc[key] = acc[key] || []).push(m);
    return acc;
  }, {});

  return (
     <section className={styles.page}>
      <Breadcrumb />
      <h2 className={styles.title}>Guia de Mobs</h2>

      {Object.entries(grupos).map(([tipo, lista]) => (
        <div key={tipo} className={styles.group}>
          <h3 className={styles.subTitle}>{tipo}</h3>

          <div className={styles.grid}>
            {lista.map((m) => (
              <Link
                key={m.id}
                to={`/mobs/${encodeURIComponent(m.nombre)}`}
                className={styles.cardLink}         
              >
                <article className={styles.card}>
                  <img
                    src={mobImgs[m.nombre] ?? placeholderImg}
                    alt={m.nombre}
                    className={styles.img}
                  />
                  <h4 className={styles.mobName}>{m.nombre}</h4>
                  <p>{m.descripcion}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Mobs;
