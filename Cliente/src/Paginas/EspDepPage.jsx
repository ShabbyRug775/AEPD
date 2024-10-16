// Se importan librerias de react y contexto de articulo
import { useEffect } from "react";
import { usarDeportivo } from "../Contexto/deportivoContexto";
import { ParqueCard } from "../Componentes/deportivos/DeportivoCard";
import { ImFileEmpty } from "react-icons/im";

export function EspDepPage() {
  const { Deportivos, consulsDepor } = usarDeportivo();

  useEffect(() => {
    consulsDepor();
  }, []);

  return (
    <body className="bg-lime-50 p-10 mt-20">
      {Deportivos.length === 0 && (
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
        {Deportivos.map((Deportivo) => (
          <ParqueCard Deportivo={Deportivo} key={Deportivo._id} />
        ))}
      </div>
    </body>
    
  );
}