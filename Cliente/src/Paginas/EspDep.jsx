// Se importan librerias de react y contexto de articulo
import { useEffect } from "react";
import { usarArticulo } from "../Contexto/articuloContexto";
import { ArticuloCard } from "../Componentes/articulos/ArticuloCard";
import { ImFileEmpty } from "react-icons/im";

export function ArticulosPage() {
  const { articulos, consulsArts } = usarArticulo();

  useEffect(() => {
    consulsArts();
  }, []);

  return (
    <>
      {articulos.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay articulos, por favor añade uno
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {articulos.map((articulo) => (
          <ArticuloCard articulo={articulo} key={articulo._id} />
        ))}
      </div>
    </>
  );
}