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