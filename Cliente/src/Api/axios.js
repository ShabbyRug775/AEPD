// Se manda a llamar axios
import axios from "axios";
import { API_URL } from "../Configuracion/configuracion";

// Se crea una instancia de axios
const instance = axios.create({

    baseURL: API_URL,
    withCredentials: true,

});

// Se exporta la instancia
export default instance;