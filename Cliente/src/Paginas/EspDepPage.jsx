import { useEffect, useState } from "react";
import { usarDeportivo } from "../Contexto/deportivoContexto";
import { ParqueCard } from "../Componentes/deportivos/DeportivoCard";
import { ImFileEmpty } from "react-icons/im";
import { Input, Select, Checkbox } from "../Componentes/UI";
import { alcaldias, costos } from "../Componentes/deportivos/listasDesp";

export function EspDepPage() {
  const { Deportivos, consulsDepor } = usarDeportivo();

  // Estado para los filtros
  const [filters, setFilters] = useState({
    alcaldia: "",
    nombre: "",
    deporte: "",
    costo: "",
    gradas: false,
    tipodesuelo: "",
    aceptaMascotas: false,
  });

  // Estado para los deportivos filtrados
  const [filteredDeportivos, setFilteredDeportivos] = useState([]);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Inicialmente 6 elementos por página

  useEffect(() => {
    // Ajustar el número de elementos por página según el tamaño de la ventana
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(3); // 3 elementos por página en pantallas grandes
      } else {
        setItemsPerPage(2); // 2 elementos por página en pantallas pequeñas
      }
    };

    updateItemsPerPage(); // Llamar a la función al montar el componente
    window.addEventListener('resize', updateItemsPerPage); // Añadir listener para cambios en el tamaño de la ventana

    return () => {
      window.removeEventListener('resize', updateItemsPerPage); // Limpiar el listener al desmontar
    };
  }, []);

  useEffect(() => {
    consulsDepor();
  }, []);

  useEffect(() => {
    // Filtrar los deportivos basándose en los filtros
    const applyFilters = () => {
      let results = Deportivos;

      // Filtrar por alcaldía
      if (filters.alcaldia) {
        results = results.filter(Deportivo => Deportivo.alcaldia === filters.alcaldia);
      }
      // Filtrar por nombre
      if (filters.nombre) {
        results = results.filter(Deportivo =>
          Deportivo.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
        );
      }
      // Filtrar por deporte
      if (filters.deporte) {
        results = results.filter(Deportivo =>
          Deportivo.canchas.some(canchas =>
            canchas.deporte.toLowerCase() === filters.deporte.toLowerCase()
          )
        );
      }
      // Filtrar por costo
      if (filters.costo) {
        results = results.filter(Deportivo => Deportivo.costo === filters.costo);
      }
      // Filtrar por gradas
      if (filters.gradas) {
        results = results.filter(Deportivo =>
          Deportivo.canchas.some(canchas => canchas.gradas)
        );
      }
      // Filtrar por tipo de suelo
      if (filters.tipodesuelo) {
        results = results.filter(Deportivo =>
          Deportivo.canchas.some(canchas =>
            canchas.tipodesuelo.toLowerCase() === filters.tipodesuelo.toLowerCase()
          )
        );
      }
      // Filtrar por mascotas
      if (filters.aceptaMascotas) {
        results = results.filter(Deportivo => Deportivo.aceptaMascotas);
      }

      setFilteredDeportivos(results);
      setCurrentPage(1); // Reiniciar a la primera página al filtrar
    };

    applyFilters();
  }, [filters, Deportivos]);

  // Calcular los índices de los elementos a mostrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeportivos.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredDeportivos.length / itemsPerPage);

  return (
    <div className="bg-lime-50 p-10 mt-20">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-lime-900">Filtrar Espacios Deportivos</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Nombre"
            value={filters.nombre}
            onChange={(e) => setFilters({ ...filters, nombre: e.target.value })}
            className="border border-lime-500 p-2 rounded-md bg-lime-100"
          />
          <Select
            value={filters.alcaldia}
            onChange={(e) => setFilters({ ...filters, alcaldia: e.target.value })}
            className="border border-gray-300 p-2"
          >
            <option value="">Seleccione Alcaldía</option>
            {alcaldias.map((alcaldia, index) => (
              <option key={index} value={alcaldia}>{alcaldia}</option>
            ))}
          </Select>
          <Input
            type="text"
            placeholder="Deporte"
            value={filters.deporte}
            onChange={(e) => setFilters({ ...filters, deporte: e.target.value })}
            className="border border-gray-300 p-2"
          />
          <Select
            value={filters.costo}
            onChange={(e) => setFilters({ ...filters, costo: e.target.value })}
            className="border border-gray-300 p-2"
          >
            <option value="">Costo</option>
            {costos.map((costo, index) => (
              <option key={index} value={costo}>{costo}</option>
            ))}
          </Select>
          <Checkbox
            label="Tiene Gradas"
            checked={filters.gradas}
            onChange={(e) => setFilters({ ...filters, gradas: e.target.checked })}
          />
          <Input
            type="text"
            placeholder="Tipo de suelo"
            value={filters.tipodesuelo}
            onChange={(e) => setFilters({ ...filters, tipodesuelo: e.target.value })}
            className="border border-gray-300 p-2"
          />
          <Checkbox
            label="Acepta Mascotas"
            checked={filters.aceptaMascotas}
            onChange={(e) => setFilters({ ...filters, aceptaMascotas: e.target.checked })}
          />
        </div>
      </div>

      {filteredDeportivos.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay deportivos
            </h1>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
        {currentItems.map((Deportivo) => (
          <ParqueCard Deportivo={Deportivo} key={Deportivo._id} />
        ))}
      </div>

      {/* Controles de Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 bg-lime-900 text-white rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-lime-700 text-white' : 'bg-lime-200'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-1 px-3 py-1 bg-lime-900 text-white rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
