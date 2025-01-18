// DeportivoCardIndividual.jsx
import { ButtonLink, Card } from "../UI";
import { useState } from "react";

export function DeportivoCard_idv({ Deportivo }) {

  return (
    <Card>
      <header className="flex justify-center my-5">
        <h1 className="text-5xl font-bold">{Deportivo.nombre}</h1>
      </header>
      <br />
      <p className="text-lime-950 font-bold text-xl"> Dirección: <span className="font-normal">{Deportivo.direccion}</span></p>
      <p className="text-lime-950 font-bold text-xl"> Alcaldía: <span className="font-normal">{Deportivo.alcaldia}</span></p>
      <p className="text-lime-950 font-bold text-xl"> Tipo de Espacio: <span className="font-normal">{Deportivo.tipoDeEspacio}</span></p>
      <p className="text-lime-950 font-bold text-xl"> Costo: <span className="font-normal">{Deportivo.costo}</span></p>

      {/* Ubicación Geográfica */}
      <section className="mt-4">
        <h2 className="text-2xl font-bold text-lime-600">Ubicación Geográfica</h2>
        <p className="text-lime-950 font-bold text-xl"> Latitud: <span  className="font-normal"> {Deportivo.ubicacionGeografica.latitud}</span></p>
        <p className="text-lime-950 font-bold text-xl"> Longitud:<span className="font-normal"> {Deportivo.ubicacionGeografica.longitud}</span></p>
      </section>

      {/* Servicios */}
      <section className="mt-4">
        <h2 className="text-2xl font-bold text-lime-600">Servicios</h2>
        <p className="text-lime-950 font-bold text-xl"> Baños: <span className="font-normal">{Deportivo.servicios.baños ? "Sí" : "No"}</span></p>
        <p className="text-lime-950 font-bold text-xl"> Comercios: <span className="font-normal">{Deportivo.servicios.comercios ? "Sí" : "No"}</span></p>
        <p className="text-lime-950 font-bold text-xl"> Vigilancia: <span className="font-normal">{Deportivo.servicios.vigilancia ? "Sí" : "No"}</span></p>
        <p className="text-lime-950 font-bold text-xl"> Puertas de Entrada: <span className="font-normal">{Deportivo.servicios.puertasDeEntrada}</span></p>
        <p className="text-lime-950 font-bold text-xl"> Acepta Mascotas: <span className="font-normal">{Deportivo.servicios.aceptaMascotas ? "Sí" : "No"}</span></p>
      </section>

      {/* Horario */}
      <section className="mt-4">
        <h2 className="text-2xl font-bold text-lime-600">Horario</h2>
        <p className="text-lime-950 font-bold text-xl">Lunes a Viernes: <span className="font-normal">{Deportivo.horario.lunes}</span></p>
        <p className="text-lime-950 font-bold text-xl">Sábado: <span className="font-normal">{Deportivo.horario.sábado}</span></p>
        <p className="text-lime-950 font-bold text-xl">Domingo: <span className="font-normal">{Deportivo.horario.domingo}</span></p>
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
        <h2 className="text-2xl font-bold text-lime-600">Canchas</h2>
        <ul>
          {Deportivo.canchas.map((cancha, index) => (
            <li key={index} className="text-lime-950">
              <br></br>
              <p className="text-lime-950 font-semibold text-xl my-1">Nombre: <span className="font-normal">{cancha.etiqueta}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Deporte: <span className="font-normal">{cancha.deporte}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Dimensiones: <span className="font-normal"> <br></br>Largo: {cancha.medidas.largo} m (metros) <br></br> Ancho: {cancha.medidas.ancho} m (metros)</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Tipo de Suelo: <span className="font-normal">{cancha.tipodesuelo}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Señalamientos: <span className="font-normal">{cancha.senalamientos}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Equipamiento: <span className="font-normal">{cancha.equipamiento}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Iluminación: <span className="font-normal">{cancha.iluminacion ? 'Sí' : 'No'}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Techado: <span className="font-normal">{cancha.techado ? 'Sí' : 'No'}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Gradas: <span className="font-normal">{cancha.gradas ? 'Sí' : 'No'}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Baños: <span className="font-normal">{cancha.baños ? 'Sí' : 'No'}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Vestidores: <span className="font-normal">{cancha.vestidores ? 'Sí' : 'No'}</span></p>
              <p className="text-lime-950 font-semibold text-xl my-1">Ubicación Geográfica: Latitud: <span className="font-normal">{cancha.ubicacionGeografica.latitud}, Longitud: {cancha.ubicacionGeografica.longitud}</span></p>
            </li>
          ))}
        </ul>
      </section>

    </Card>
  );
}
