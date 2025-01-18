import { ButtonLink, Card } from "../UI";
import { useState } from "react";

export function DeportivoCardCancha({ Deportivo }) {
  // Estado para los filtros
  const [filtroDeporte, setFiltroDeporte] = useState("");

  // Estado para la página actual
  const [paginaActual, setPaginaActual] = useState(0);

  // Número de canchas por página
  const canchasPorPagina = 1;

  // Filtrar las canchas según el deporte seleccionado
  const canchasFiltradas = Deportivo.canchas.filter((cancha) => {
    return filtroDeporte ? cancha.deporte === filtroDeporte : true;
  });

  // Lista de deportes disponibles para el filtro
  const deportesDisponibles = Array.from(new Set(Deportivo.canchas.map((cancha) => cancha.deporte)));

  // Calcular el total de páginas (cada página muestra una cancha)
  const totalPaginas = Math.ceil(canchasFiltradas.length / canchasPorPagina);

  // Obtener las canchas que se deben mostrar en la página actual
  const canchasParaMostrar = canchasFiltradas.slice(paginaActual * canchasPorPagina, (paginaActual + 1) * canchasPorPagina);

  // Función para ir a una página específica
  const irAPagina = (pagina) => {
    if (pagina >= 0 && pagina < totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  // Función para ir a la página anterior
  const irAPaginaAnterior = () => {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Función para ir a la página siguiente
  const irAPaginaSiguiente = () => {
    if (paginaActual < totalPaginas - 1) {
      setPaginaActual(paginaActual + 1);
    }
  };

  // Función para crear los botones de paginación
  const renderPaginas = () => {
    let paginas = [];
    for (let i = 0; i < totalPaginas; i++) {
      paginas.push(
        <button
          key={i}
          onClick={() => irAPagina(i)}
          className={`text-lg py-2 px-4 rounded hover:bg-lime-500 ${paginaActual === i ? "bg-lime-900 text-white" : "bg-lime-100 text-lime-900"}`}
        >
          {i + 1}
        </button>
      );
    }
    return paginas;
  };

  return (
    <Card>
      {/* Filtro de Deportes */}
      <section className="mt-4">
        <h2 className="text-2xl font-bold text-lime-600">Filtrar por Deporte</h2>
        <select
          value={filtroDeporte}
          onChange={(e) => {
            setFiltroDeporte(e.target.value);
            setPaginaActual(0); // Reiniciar la paginación al aplicar un filtro
          }}
          className="mt-2 p-2 rounded bg-lime-900 text-lg text-white font-bold"
        >
          <option className="text-lg bg-lime-900" value="">Todos los deportes</option>
          {deportesDisponibles.map((deporte, index) => (
            <option className="text-lg bg-lime-900" key={index} value={deporte}>
              {deporte}
            </option>
          ))}
        </select>
      </section>

      {/* Canchas a mostrar en la página actual */}
      {canchasParaMostrar.length > 0 ? (
        <section className="mt-4">
          <h2 className="text-2xl font-bold text-lime-600">Cancha</h2>
          <div className="min-w-[300px] bg-lime-100 shadow-lg p-4 rounded-lg flex-shrink-0">
            <p className="text-lime-950 font-semibold text-xl my-1">
              Nombre: <span className="font-normal">{canchasParaMostrar[0].etiqueta}</span>
            </p>
            <p className="text-lime-950 font-semibold text-xl my-1">
              Deporte: <span className="font-normal">{canchasParaMostrar[0].deporte}</span>
            </p>
            <p className="text-lime-950 font-semibold text-xl my-1">
              Dimensiones: <span className="font-normal">
                Largo: {canchasParaMostrar[0].medidas.largo} m (metros)<br />
                Ancho: {canchasParaMostrar[0].medidas.ancho} m (metros)
              </span>
            </p>
            <p className="text-lime-950 font-semibold text-xl my-1">
              Tipo de Suelo: <span className="font-normal">{canchasParaMostrar[0].tipodesuelo}</span>
            </p>
            <p className="text-lime-950 font-semibold text-xl my-1">
              Ubicación Geográfica: 
              <br />Latitud: <span className="font-normal">{canchasParaMostrar[0].ubicacionGeografica.lat_1}</span>
              <br />Longitud: <span className="font-normal">{canchasParaMostrar[0].ubicacionGeografica.lng_1}</span>
            </p>
          </div>

          {/* Paginación con botones numerados y "Anterior"/"Siguiente" */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={irAPaginaAnterior}
              className="py-2 px-4 rounded bg-lime-100 text-lime-900 disabled:opacity-50 hover:bg-lime-900 hover:text-lime-100"
              disabled={paginaActual === 0}
            >
              Anterior
            </button>
            {renderPaginas()}
            <button
              onClick={irAPaginaSiguiente}
              className="py-2 px-4 rounded bg-lime-100 text-lime-900 disabled:opacity-50 hover:bg-lime-900 hover:text-lime-100"
              disabled={paginaActual === totalPaginas - 1}
            >
              Siguiente
            </button>
          </div>
        </section>
      ) : (
        <p className="mt-4 text-lime-600 font-bold">No hay canchas disponibles para este filtro.</p>
      )}
    </Card>
  );
}
