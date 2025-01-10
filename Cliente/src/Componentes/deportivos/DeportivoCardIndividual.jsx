// DeportivoCardIndividual.jsx
import { ButtonLink, Card } from "../UI";
import { useState } from "react";

export function DeportivoCard_idv({ Deportivo }) {

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{Deportivo.nombre}</h1>
      </header>
      <br />
      <p className="text-lime-950">Dirección: {Deportivo.direccion}</p>
      <p className="text-lime-950">Alcaldía: {Deportivo.alcaldia}</p>
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
        <p className="text-lime-950">Lunes a Viernes: {Deportivo.horario.lunes}</p>
        <p className="text-lime-950">Sábado: {Deportivo.horario.sábado}</p>
        <p className="text-lime-950">Domingo: {Deportivo.horario.domingo}</p>
      </section>

      {/* Fotos */}
      {/* 
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
          */}

      {/* Lista de Canchas */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Canchas</h2>
        <ul>
          {Deportivo.canchas.map((cancha, index) => (
            <li key={index} className="text-lime-950">
              <p>Nombre: {cancha.etiqueta}</p>
              <p>Deporte: {cancha.deporte}</p>
              <p>Dimensiones: {cancha.medidas.largo} x {cancha.medidas.ancho}</p>
              <p>Tipo de Suelo: {cancha.tipodesuelo}</p>
              <p>Señalamientos: {cancha.senalamientos}</p>
              <p>Equipamiento: {cancha.equipamiento}</p>
              <p>Iluminación: {cancha.iluminacion ? 'Sí' : 'No'}</p>
              <p>Techado: {cancha.techado ? 'Sí' : 'No'}</p>
              <p>Gradas: {cancha.gradas ? 'Sí' : 'No'}</p>
              <p>Baños: {cancha.baños ? 'Sí' : 'No'}</p>
              <p>Vestidores: {cancha.vestidores ? 'Sí' : 'No'}</p>
              <p>Ubicación Geográfica: Latitud: {cancha.ubicacionGeografica.latitud}, Longitud: {cancha.ubicacionGeografica.longitud}</p>
            </li>
          ))}
        </ul>
      </section>

    </Card>
  );
}
