// Se manda a llamar axios
import axios from "./axios";

// Request de consultas de parques deportivos
export const consulsDeporRequest = async () => axios.get("/deportivos");
// Request de consulta de parque deportivo (individual)
export const consulDeporRequest = async (id) => axios.get(`/deportivos/${id}`);
// Request de altas de parque deportivo
export const altaDeporRequest = async (Deportivo) => axios.post("/deportivos", Deportivo);
// Request de bajas de parque deportivo
export const bajaDeporRequest = async (id) => axios.delete(`/deportivos/${id}`);
// Request de cambios de parque deportivo
export const modDeporRequest = async (id, Deportivo) => axios.put(`/deportivos/${id}`, Deportivo);