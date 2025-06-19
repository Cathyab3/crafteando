import { useParams, Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { getMobs } from "../api/mockApi";      
import Breadcrumb       from "../components/Breadcrumb";
import mobImgs          from "../assets/mobImgs";
import styles           from "./MobDetail.module.css";

const placeholderImg = "/images/mobs/placeholder.png";

const MobDetail = () => {
  /* Parámetro de la URL */
  const { mobName } = useParams();                 
  const nombreDecod = decodeURIComponent(mobName); // quita %20, tildes, etc.

  /*  Mobs  */
  const {
    data: mobs = [],       
    loading,
    error,
  } = useApi(getMobs, []); 

  if (loading) return <p className={styles.status}>Cargando…</p>;
  if (error)   return <p className={styles.status}>Error: {error}</p>;

  /* busca el mob por nombre */
  const mob = mobs.find(
    (m) => m.nombre.toLowerCase() === nombreDecod.toLowerCase()
  );

  if (!mob) {
    return (
      <section className={styles.page}>
        <Breadcrumb />
        <h2 className={styles.title}>Mob no encontrado</h2>
        <Link to="/mobs" className={styles.back}>← Volver a la guía</Link>
      </section>
    );
  }


  return (
    <section className={styles.page}>
      <Breadcrumb />
      <h2 className={styles.title}>{mob.nombre}</h2>

      <article className={styles.card}>
        <div className={styles.imgBox}>
            <img
                src={mobImgs[mob.nombre] ?? placeholderImg}
                alt={mob.nombre}
                className={styles.img}
             />
        </div>

    <p className={styles.desc}>{mob.descripcion}</p>

    <ul className={styles.meta}>
        <li><strong>Tipo:</strong>   {mob.tipo}</li>
        <li><strong>Puntos de salud:</strong>  {mob.salud}</li>
        <li><strong>Daño:</strong>   {mob.daño}</li>
        <li><strong>Aparición:</strong>  {mob.bioma}</li>
    </ul>
    </article>
    </section>
  );
};

export default MobDetail;

