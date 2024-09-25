// Rutas de contexto de react
import { createContext, useContext, useState } from "react";
// Rutas de parque
import {

  consulsDeporRequest,
  consulDeporRequest
  
} from "../Api/deportivo";

// Se crea un contexto de react
const DeportivoContexto = createContext();

export const usarDeportivo = () => {

  const context = useContext(DeportivoContexto);

  if (!context) throw new Error("usarDeportivo debe ser utilizado dentro de un ParqueProvider");

  return context;

};

export function DeportivoProvider({ children }) {
  
  const [Deportivo, setPark] = useState([]);

  // Consultas de parques
  const consulsDepor = async () => {
    const res = await consulsDeporRequest();
    setPark(res.data);
  };

  // Consulta inidividual de parques
  const consulDepor = async (id) => {
    try {
      const res = await consulDeporRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <DeportivoContexto.Provider
      value={{
        Deportivo,
        consulsDepor,
        consulDepor
      }}
    >
      {children}
    </DeportivoContexto.Provider>

  );
}