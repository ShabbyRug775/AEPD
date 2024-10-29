// Rutas de contexto de react
import { createContext, useContext, useState } from "react";
// Rutas de parque
import {

  consulsDeporRequest,
  consulDeporRequest,
  altaDeporRequest,
  bajaDeporRequest,
  modDeporRequest

} from "../Api/deportivo";

// Se crea un contexto de react
const DeportivoContexto = createContext();

export const usarDeportivo = () => {

  const context = useContext(DeportivoContexto);

  if (!context) throw new Error("usarDeportivo debe ser utilizado dentro de un ParqueProvider");

  return context;

};

export function DeportivoProvider({ children }) {

  const [Deportivos, setPark] = useState([]);

  // Consultas de deportivos
  const consulsDepor = async () => {
    const res = await consulsDeporRequest();
    setPark(res.data);
  };

  // Consulta inidividual de deportivo
  const consulDepor = async (id) => {
    try {
      const res = await consulDeporRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Alta de deportivo
  const altaDepor = async (Deportivo) => {
    try {
      const res = await altaDeporRequest(Deportivo);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Baja de deportivo
  const bajaDepor = async (id) => {
    try {
      const res = await bajaDeporRequest(id);
      if (res.status === 204) setPark(Deportivos.filter((Deportivo) => Deportivo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Modificar deportivo
  const modDepor = async (id, Deportivo) => {
    try {
      await modDeporRequest(id, Deportivo);
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <DeportivoContexto.Provider
      value={{
        Deportivos,
        consulsDepor,
        consulDepor,
        altaDepor,
        bajaDepor,
        modDepor
      }}
    >
      {children}
    </DeportivoContexto.Provider>

  );
}