import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
  LogInRequest,
  SigInUpRequest,
  verifyTokenRequest,
  ProfileRequest,
  consulsUsuariosRequest,
  RegistrarRepRequest,
} from "../Api/usuario";
import Cookies from "js-cookie";

const UsuarioContexto = createContext();

export const usarUsuario = () => {
  const context = useContext(UsuarioContexto);
  if (!context)
    throw new Error(
      "usarUsuario debe ser utilizado dentro de un UsuarioProvider"
    );
  return context;
};

export const UsuarioProvider = ({ children }) => {
  const [Usuario, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]); // Siempre un array para poder mapearlo
  const [loading, setLoading] = useState(true);

  // Limpiar errores automáticamente después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Registro de usuario
  const SignInUp = async (Usuario) => {
    try {
      const res = await SigInUpRequest(Usuario);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors([]);
      }
    } catch (error) {
      console.log(error.response?.data);
      const mensaje = error.response?.data?.message;
      setErrors(Array.isArray(mensaje) ? mensaje : [mensaje || "Error en registro"]);
    }
  };

  // Registro nivel 4
  const RegistrarRep = async (Usuario) => {
    try {
      const res = await RegistrarRepRequest(Usuario);
      if (res.status === 200) {
        setUser(res.data);
        setErrors([]);
      }
    } catch (error) {
      console.log(error.response?.data);
      const mensaje = error.response?.data?.message;
      setErrors(
        Array.isArray(mensaje) ? mensaje : [mensaje || "Error en registro nivel 4"]
      );
    }
  };

  // Login de usuario
  const LogIn = async (Usuario) => {
    setErrors([]); // limpiar errores antes
    try {
      const res = await LogInRequest(Usuario);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      console.log(error.response);
      const mensaje =
        error.response?.data?.message || "Correo o contraseña incorrectos";
      setErrors(Array.isArray(mensaje) ? mensaje : [mensaje]);
      setIsAuthenticated(false);
    }
  };

  // Cerrar sesión
  const LogOut = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    setErrors([]);
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  // Consultar perfil
  const Profile = async (Usuario) => {
    try {
      const res = await ProfileRequest(Usuario);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Consultar usuarios
  const consulsUsuarios = async (Usuario) => {
    try {
      const res = await consulsUsuariosRequest(Usuario);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsuarioContexto.Provider
      value={{
        Usuario,
        SignInUp,
        RegistrarRep,
        LogIn,
        LogOut,
        isAuthenticated,
        errors,
        loading,
        Profile,
        consulsUsuarios,
      }}
    >
      {children}
    </UsuarioContexto.Provider>
  );
};

export default UsuarioContexto;
