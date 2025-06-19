import { useState } from "react";
import { getCoordenadas, addCoordenada } from "../api/mockApi";
import { useApi } from "../hooks/useApi";
import { useMutation } from "../hooks/useMutation";
import Breadcrumb from "../components/Breadcrumb";
import styles from "./Coordenadas.module.css";

/* ----- estado inicial del formulario ----- */
const blank = {
  nombre: "",
  x: "",
  y: "",
  z: "",
  descripcion: "",
};

/* ---------- util: convierte “Portal al Nether” -> portal_al_nether ---------- */
const slugify = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")                    // quita tildes
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "_")        // espacios y otros → _
    .replace(/(^_|_$)/g, "");           // sin _ inicial / final

const Coordenadas = () => {
  /* ------- FETCH (lista) ------- */
  const {
    data: coords = [],
    loading,
    error,
    refetch,
  } = useApi(getCoordenadas, []);

  /* ------- MUTACIÓN (POST) ------- */
  const { mutate, loading: saving, error: saveError } = useMutation(addCoordenada);

  /* ------- Formulario controlado ------- */
  const [form, setForm] = useState(blank);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* convierte x y z a números */
    const payload = {
      ...form,
      x: +form.x,
      y: +form.y,
      z: +form.z,
    };
    try {
      await mutate(payload); // POST a la API
      setForm(blank);       // limpia campos
      refetch();            // refresca la lista
    } catch (_) {
      /* saveError ya capturado dentro del hook */
    }
  };

  console.log("coords:", coords, "loading:", loading, "error:", error);

  /* ---------- RENDER ---------- */
  return (
    <section className={styles.page}>
      <Breadcrumb />
      <h2 className={styles.pageTitle}>Coordenadas</h2>

      {/* ---------- Sección 1: Formulario ---------- */}
      <h3 className={styles.sectionTitle}>Ingresar coordenadas</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        {["nombre", "x", "y", "z", "descripcion"].map((field) => (
          <input
            key={field}
            name={field}
            required
            placeholder={field.toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            className={styles.input}
          />
        ))}

        <button type="submit" disabled={saving} className={styles.btn}>
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </form>

      {saveError && <p className={styles.status}>⚠ {saveError}</p>}

      {/* ---------- Sección 2: Lista ---------- */}
      <h3 className={styles.sectionTitle}>Coordenadas guardadas</h3>

      {loading ? (
        <p className={styles.status}>Cargando…</p>
      ) : error ? (
        <p className={styles.status}>Error: {error}</p>
      ) : coords.length === 0 ? (
        <p className={styles.status}>Aún no tienes coordenadas guardadas.</p>
      ) : (
        <div className={styles.grid}>
          {coords.map((c) => {
            const imgSrc = `/images/estructuras/${slugify(c.nombre)}.jpg`;
            return (
              <div key={c.id} className={styles.card}>
                <img
                  src={imgSrc}
                  alt={c.nombre}
                  className={styles.thumb}
                  onError={(e) => {
                    e.currentTarget.style.display = "none"; // oculta si no existe
                  }}
                />
                <h4>{c.nombre}</h4>
                <p>
                  X: <strong>{c.x}</strong>&nbsp; Y: <strong>{c.y}</strong>
                  &nbsp; Z: <strong>{c.z}</strong>
                </p>
                {c.descripcion && <small>{c.descripcion}</small>}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Coordenadas;