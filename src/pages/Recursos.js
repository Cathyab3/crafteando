import { useApi } from "../hooks/useApi";
import { getRecursos } from "../api/mockApi";
import Breadcrumb from "../components/Breadcrumb";
import styles from "./Recursos.module.css";

const recImgs = {
  Agua:    "/images/recursos/agua.jpg",
  Arcilla:    "/images/recursos/arcilla.jpg",
  Arenisca:    "/images/recursos/arenisca.jpg",
  Carbón:    "/images/recursos/carbon.jpg",
  Coral:    "/images/recursos/coral.jpg",
  "Cuarzo del Nether":    "/images/recursos/cuarzo_del_nether.jpg",
  Diamante:    "/images/recursos/diamante.jpg",
  Esmeralda:    "/images/recursos/esmeralda.jpg",
  Grava:    "/images/recursos/grava.jpg",
  Hierro:    "/images/recursos/hierro.jpg",
  Lapislázuli:    "/images/recursos/lapizlasuli.jpg",
  Lava:    "/images/recursos/lava.jpg",
  Madera:    "/images/recursos/madera.jpg",
  Nieve:    "/images/recursos/nieve.jpg",
  Obsidiana:    "/images/recursos/obsidiana.jpg",
  "Piedra luminosa":    "/images/recursos/piedra-luminosa.jpg",
  Piedra:    "/images/recursos/piedra.jpg",
  Redstone:    "/images/recursos/redstone.jpg",
  Terracota:    "/images/recursos/terracota.jpg",
  Tierra:    "/images/recursos/tierra.jpg",


};
const placeholderImg = "/images/recursos/placeholder.png";

const RecursosPage = () => {
   const { data: recursos = [], loading, error } = useApi(getRecursos, []);


  if (loading) return <p className={styles.status}>Cargando…</p>;
  if (error)   return <p className={styles.status}>Error: {error}</p>;

  /* Agrupado por rareza */
  const grupos = recursos.reduce((acc, r) => {
    const key = r.rareza ?? "Sin clasificación";
    (acc[key] = acc[key] || []).push(r);
    return acc;
  }, {});

  return (
    <section className={styles.page}>
      <Breadcrumb />
      <h2 className={styles.title}>Recursos</h2>

      {Object.entries(grupos).map(([rareza, lista]) => (
        <div key={rareza} className={styles.group}>
          <h3 className={styles.subTitle}>{rareza}</h3>

          <div className={styles.grid}>
            {lista.map((r, idx) => (
              <div className={styles.card} key={`${r.id}-${idx}`}>
                <img
                  src={recImgs[r.nombre] ?? placeholderImg}
                  alt={r.nombre}
                  className={styles.img}
                />

                <h4>{r.nombre}</h4>
                <p>{r.descripcion}</p>

                <div className={styles.meta}>
                  <span>Luminoso: {r.luminoso}</span>
                  <span>Dureza: {r.dureza}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default RecursosPage;
