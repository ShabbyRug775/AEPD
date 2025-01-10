// DeportivoCardIndividual.jsx
import { ButtonLink, Card } from "../UI";
import { useState } from "react";

export function DeportivoCard_idv({ Deportivo }) {

  // Estados para los filtros
  const [filtroDeporte, setFiltroDeporte] = useState("");
  const [filtroSuelo, setFiltroSuelo] = useState("");

  // Función para aplicar los filtros
  const canchasFiltradas = Deportivo.canchas.filter((cancha) => {
    const cumpleDeporte = filtroDeporte ? cancha.deporte === filtroDeporte : true;
    const cumpleSuelo = filtroSuelo ? cancha.tipoDeSuelo === filtroSuelo : true;
    return cumpleDeporte && cumpleSuelo;
  });

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{Deportivo.nombre}</h1>
      </header>
      <br/>
      <p className="text-lime-950">Dirección: {Deportivo.direccion}</p>
      <p className="text-lime-950">Alcaldía: {Deportivo.alcaldia}</p>
      <p className="text-lime-950">Fecha de Registro: {Deportivo.fechaDeRegistro}</p>
      <p className="text-lime-950">Tipo de Espacio: {Deportivo.tipoDeEspacio}</p>
      <p className="text-lime-950">Costo: {Deportivo.costo}</p>

      {/* Ubicación Geográfica */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Ubicación Geográfica</h2>
        <p className="text-lime-950">Latitud: {Deportivo.ubicacionGeografica.latitud}</p>
        <p className="text-lime-950">Longitud: {Deportivo.ubicacionGeografica.longitud}</p>
      </section>

      {/* Servicios */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Servicios</h2>
        <p className="text-lime-950">Baños: {Deportivo.servicios.baños ? "Sí" : "No"}</p>
        <p className="text-lime-950">Comercios: {Deportivo.servicios.comercios ? "Sí" : "No"}</p>
        <p className="text-lime-950">Vigilancia: {Deportivo.servicios.vigilancia ? "Sí" : "No"}</p>
        <p className="text-lime-950">Puertas de Entrada: {Deportivo.servicios.puertasDeEntrada}</p>
        <p className="text-lime-950">Acepta Mascotas: {Deportivo.servicios.aceptaMascotas ? "Sí" : "No"}</p>
      </section>

      {/* Horario */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Horario</h2>
        <p className="text-lime-950">Lunes a Viernes: {Deportivo.horario.lunesViernes}</p>
        <p className="text-lime-950">Sábado y Domingo: {Deportivo.horario.sabadoDomingo}</p>
      </section>

      {/* Fotos */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Fotos</h2>
        {Deportivo.fotoPrincipal && (
          <img src={Deportivo.fotoPrincipal} alt="Foto Principal" className="w-full h-auto mb-2" />
        )}
        <div className="flex gap-2">
          {Deportivo.fotosSecundarias.map((foto, index) => (
            foto && <img key={index} src={foto} alt={`Foto secundaria ${index + 1}`} className="w-1/2 h-auto" />
          ))}
        </div>
      </section>

      {/* Filtros */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Filtros</h2>
        <label>
          Deporte:
          <select className="bg-lime-100 p-2 w-full rounded-md" value={filtroDeporte} onChange={(e) => setFiltroDeporte(e.target.value)}>
            <option value="">Todos</option>
            <option value="Fútbol">Fútbol</option>
            <option value="Básquetbol">Básquetbol</option>
            {/* Agregar más deportes según sea necesario */}
          </select>
        </label>
        <label>
          Tipo de Suelo:
          <select className="bg-lime-100 w-full p-2 rounded-md" value={filtroSuelo} onChange={(e) => setFiltroSuelo(e.target.value)}>
            <option value="">Todos</option>
            <option value="Césped">Césped</option>
            <option value="Concreto">Concreto</option>
            {/* Agregar más tipos de suelo según sea necesario */}
          </select>
        </label>
      </section>

      {/* Lista de Canchas */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Canchas</h2>
        {canchasFiltradas.map((cancha, index) => {
          const ubicacion = cancha.ubicacionGeografica;

          // Verificar que la cancha tiene todas las coordenadas necesarias
          if (
            ubicacion.lat_1 !== undefined && ubicacion.lng_1 !== undefined &&
            ubicacion.lat_2 !== undefined && ubicacion.lng_2 !== undefined &&
            ubicacion.lat_3 !== undefined && ubicacion.lng_3 !== undefined &&
            ubicacion.lat_4 !== undefined && ubicacion.lng_4 !== undefined
          ) {
            return (
              <div key={index} className="border-b border-gray-300 py-2">
                <h3 className="font-semibold">Cancha #{index + 1}</h3>
                <p>Deporte: {cancha.deporte}</p>
                <p>Coordenadas: {ubicacion.lat_1}, {ubicacion.lng_1}</p>
                <p>Medidas
                  <p>Largo: {cancha.medidas.largo}</p>
                  <p>Ancho: {cancha.medidas.ancho}</p>
                </p>
                <p>Tipo de suelo: {cancha.tipodesuelo}</p>
                <p>Señalamientos: {cancha.senalamientos}</p>
                <p>Equipamiento: {cancha.equipamiento}</p>
                <p>Iluminación: {cancha.iluminacion ? "Sí" : "No"}</p>
                <p>Techado: {cancha.techado ? "Sí" : "No"}</p>
                <p>Gradas: {cancha.gradas ? "Sí" : "No"}</p>
                <p>Baños: {cancha.baños ? "Sí" : "No"}</p>
                <p>Vestidores: {cancha.vestidores ? "Sí" : "No"}</p>
                <button className="bg-lime-800 mt-2 text-white py-1 px-2 rounded">Agregar un evento</button>
              </div>
            );
          }
          return null; // No mostrar si faltan coordenadas
        })}
      </section>
    </Card>
  );
}
