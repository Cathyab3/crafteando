import axios from "axios";

const api = axios.create({
  baseURL: "https://mock.apidog.com/m1/939249-922397-default"
});

/* Mobs */
export const getMobs    = () => api.get("/mobs");
export const getMobById = (id) => api.get(`/mobs/${id}`);

export const getMobByName = (nombre) =>
  api.get(`/mobs`, { params: { nombre } }); 

/* Recursos */
export const getRecursos    = () => api.get("/recursos");
export const getRecursoById = (id) => api.get(`/recursos/${id}`);

/* Coordenadas */
export const getCoordenadas = () => api.get("/coordenadas");
export const addCoordenada  = (payload) => api.post("/coordenadas", payload);


