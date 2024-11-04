// Se manda a llamar axios
import axios from "./axios";

// Request de registro de usuario
export const SigInUpRequest = async (Usuario) => axios.post("/usuario/SignInUp", Usuario);
// Request de login de usuario
export const LogInRequest = async (Usuario) => axios.post("/usuario/LogIn", Usuario);
// Request de verificacion del token
export const verifyTokenRequest = async () => axios.get("/usuario/verifyToken");
//Request de Profile de usuario
export const ProfileRequest = async () => axios.get("/usuario/Profile");
//Request de Usuarios 
export const consulsUsuariosRequest = async () => axios.get("/usuario/consulsUsuarios");
//Request de solAmistad
export const enviarSolicitudAmistadRequest = async (idUsuarioReceptor) => axios.post("/usuario/solicitud", { idUsuarioReceptor });
//Request de obtener solicitudes recibidas
export const obtenerSolicitudesRecibidasRequest = async () => axios.get("/usuario/solicitudesRecibidas");
//Request de aceptar sol amistad
export const aceptarSolicitudRequest = async (solicitudId) => axios.post("/usuario/aceptarSolicitud", { solicitudId });
//Request para obtener amigos de un usuario
export const obtenerAmigosRequest = async () => axios.get("/usuario/amigos");
