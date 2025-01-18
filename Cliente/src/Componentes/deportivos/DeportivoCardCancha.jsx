// DeportivoCardIndividual.jsx
import { ButtonLink, Card } from "../UI";
import { useState } from "react";

export function DeportivoCardCancha({ Deportivo }) {

  // Estados para los filtros
  const [filtroDeporte, setFiltroDeporte] = useState("");

  // Función para aplicar los filtros
  const canchasFiltradas = Deportivo.canchas.filter((cancha) => {
    return filtroDeporte ? cancha.deporte === filtroDeporte : true;
  });

  // Lista de deportes disponibles para el filtro
  const deportesDisponibles = Array.from(new Set(Deportivo.canchas.map((cancha) => cancha.deporte)));

  return (
    <Card>
      {/* Filtro de Deportes */}
      <section className="mt-4">
        <h2 className="text-2xl font-bold text-lime-600">Filtrar por Deporte</h2>
        <select
          value={filtroDeporte}
          onChange={(e) => setFiltroDeporte(e.target.value)}
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

      {/* Lista de Canchas */}
      <section className="mt-4">
        <h2 className="text-2xl font-bold text-lime-600">Canchas</h2>
        <div className="flex overflow-x-auto gap-2 py-2">
          {canchasFiltradas.map((cancha, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-lime-100 shadow-lg p-4 rounded-lg flex-shrink-0"
            >
              <p className="text-lime-950 font-semibold text-xl my-1">
                Nombre: <span className="font-normal">{cancha.etiqueta}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Deporte: <span className="font-normal">{cancha.deporte}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Dimensiones: <span className="font-normal">
                  <br />
                  Largo: {cancha.medidas.largo} m (metros) <br />
                  Ancho: {cancha.medidas.ancho} m (metros)
                </span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Tipo de Suelo: <span className="font-normal">{cancha.tipodesuelo}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Señalamientos: <span className="font-normal">{cancha.senalamientos}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Equipamiento: <span className="font-normal">{cancha.equipamiento}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Iluminación: <span className="font-normal">{cancha.iluminacion ? "Sí" : "No"}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Techado: <span className="font-normal">{cancha.techado ? "Sí" : "No"}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Gradas: <span className="font-normal">{cancha.gradas ? "Sí" : "No"}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Baños: <span className="font-normal">{cancha.baños ? "Sí" : "No"}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Vestidores: <span className="font-normal">{cancha.vestidores ? "Sí" : "No"}</span>
              </p>
              <p className="text-lime-950 font-semibold text-xl my-1">
                Ubicación Geográfica: 
                <br></br>Latitud:{" "}<span className="font-normal">{cancha.ubicacionGeografica.lat_1}</span>
                <br></br>Longitud:{" "}
                <span className="font-normal">{cancha.ubicacionGeografica.lng_1}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

    </Card>
  );
}
