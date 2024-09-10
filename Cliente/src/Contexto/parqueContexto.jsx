// Rutas de contexto de react
import { createContext, useContext, useState } from "react";
// Rutas de parque
import {

  consulsParksRequest,
  consulParkRequest
  
} from "../Api/Parque";

// Se crea un contexto de react
const ParqueContexto = createContext();

export const usarParque = () => {

  const context = useContext(parqueContexto);

  if (!context) throw new Error("usarParque debe ser utilizado dentro de un ParqueProvider");

  return context;

};

export function ParqueProvider({ children }) {
  
  const [Parque, setPark] = useState([]);

  // Consultas de parques
  const consulsParks = async () => {
    const res = await consulsParksRequest();
    setPark(res.data);
  };

  // Consulta inidividual de parques
  const consulPark = async (id) => {
    try {
      const res = await consulParkRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <ParqueContexto.Provider
      value={{
        Parque,
        consulsParks,
        consulPark
      }}
    >
      {children}
    </ParqueContexto.Provider>

  );
}