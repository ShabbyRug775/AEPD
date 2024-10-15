// Se importan librerias de react y contexto de articulo
import { useEffect } from "react";
import { usarDeportivo } from "../Contexto/deportivoContexto";
import { ParqueCard } from "../Componentes/deportivos/DeportivoCard";
import { ImFileEmpty } from "react-icons/im";

export function EspDepPage() {
  const { Deportivo, consulsDepor } = usarDeportivo();

  useEffect(() => {
    consulsDepor();
  }, []);

  return (
    <>
      {Deportivo.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay deportivos
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Deportivo.map((Deportivo) => (
          <ParqueCard Deportivo={Deportivo} key={Deportivo._id} />
        ))}
      </div>
    </>
    
  );
}