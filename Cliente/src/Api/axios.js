// Se manda a llamar axios
import axios from "axios";
//import { API_URL } from "../Configuracion/configuracion";

//cÓDIGO DE PRUEBA PARA REGISTRAR USUARIO

const API = 'http://localhost:4000/Api';
//Crea el registerrequest donde se le pasa a un usuario y hacemos un post con ese usuario
export const registerRequest = user => axios.post(`${API}/register`, user);





// Se crea una instancia de axios
const instance = axios.create({

    baseURL: API_URL,
    withCredentials: true,

});

// Se exporta la instancia
export default instance;