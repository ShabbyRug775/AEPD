// Se manda a llamar axios
import axios from "./axios";

// Request de consultas de parques deportivos
export const consulsDeporRequest = async () => axios.get("/EspDep");
// Request de consulta de parque deportivo (individual)
export const consulDeporRequest = async (id) => axios.get(`/EspDep/${id}`);