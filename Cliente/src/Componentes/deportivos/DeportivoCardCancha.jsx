import { Card } from "../UI";
import { useState, useEffect } from "react";
import { usarUsuario } from "../../Contexto/usuarioContexto";

export function DeportivoCardCancha({ Deportivo }) {
  const [filtroDeporte, setFiltroDeporte] = useState("");
  const [paginaActual, setPaginaActual] = useState(0);
  const { isAuthenticated, Usuario } = usarUsuario();

  const canchasFiltradas = Deportivo.canchas.filter(cancha =>
    filtroDeporte ? cancha.deporte === filtroDeporte : true
  );
  const deportesDisponibles = Array.from(new Set(Deportivo.canchas.map(c => c.deporte)));
  const totalPaginas = Math.ceil(canchasFiltradas.length / 1);
  const canchasParaMostrar = canchasFiltradas.slice(paginaActual, paginaActual + 1);

  // Estado local para reservas: { [fecha]: [reservas] }
  const [reservas, setReservas] = useState({});

  // Clave en localStorage para esta cancha (o Deportivo)
  const storageKey = `reservas_${Deportivo._id || Deportivo.nombre}`;

  // Al cargar, leer reservas de localStorage
  useEffect(() => {
    const reservasGuardadas = localStorage.getItem(storageKey);
    if (reservasGuardadas) {
      const parsed = JSON.parse(reservasGuardadas);
      // Limpiar reservas antiguas que no son del día actual
      const hoy = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
      if (parsed.fecha !== hoy) {
        localStorage.removeItem(storageKey);
        setReservas({});
      } else {
        setReservas(parsed.reservas || {});
      }
    }
  }, [storageKey]);

  // Guardar reservas en localStorage al cambiar reservas
  useEffect(() => {
    if (Object.keys(reservas).length > 0) {
      const hoy = new Date().toISOString().slice(0, 10);
      localStorage.setItem(storageKey, JSON.stringify({ fecha: hoy, reservas }));
    }
  }, [reservas, storageKey]);

  // Generar horarios reservables como antes (ejemplo simple)
  const generarHorasReservables = (horarioDia) => {
    if (!horarioDia) return [];
    const [inicioStr, finStr] = horarioDia.split(" - ");
    const [inicioHora, inicioMin] = inicioStr.split(":").map(Number);
    const [finHora, finMin] = finStr.split(":").map(Number);

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const aperturaMin = inicioHora * 60 + inicioMin;
    const cierreMin = finHora * 60 + finMin;

    const botones = [];
    for (let t = aperturaMin + 60; t <= cierreMin - 60; t += 60) {
      if (t > currentMinutes + 60) {
        const hora = Math.floor(t / 60);
        const minutos = t % 60;
        const label = `${hora.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
        botones.push(label);
      }
    }
    return botones;
  };

  // Al reservar: guardamos localmente y deshabilitamos botón
  const handleReservarHora = (hora) => {
    setReservas((prev) => ({
      ...prev,
      [hora]: true,
    }));
    alert(`Reservaste la hora ${hora} exitosamente.`);
  };

  const currentDay = new Date().toLocaleString("es-MX", { weekday: "long" }).toLowerCase();

  return (
    <Card>
      <section className="mt-4">
        <h2 className="text-2xl font-bold text-lime-600">Filtrar por Deporte</h2>
        <select
          value={filtroDeporte}
          onChange={(e) => {
            setFiltroDeporte(e.target.value);
            setPaginaActual(0);
          }}
          className="mt-2 p-2 rounded bg-lime-900 text-lg text-white font-bold"
        >
          <option value="">Todos los deportes</option>
          {deportesDisponibles.map((deporte, i) => (
            <option key={i} value={deporte}>{deporte}</option>
          ))}
        </select>
      </section>

      {canchasParaMostrar.length > 0 ? (
        <section className="mt-4">
          <h2 className="text-2xl font-bold text-lime-600">Cancha</h2>
          <div className="min-w-[300px] bg-lime-100 shadow-lg p-4 rounded-lg">
            <p className="text-xl font-semibold">{canchasParaMostrar[0].etiqueta || "Cancha"}</p>
            <p>Deporte: {canchasParaMostrar[0].deporte}</p>
            <p>Dimensiones: {canchasParaMostrar[0].medidas.largo} x {canchasParaMostrar[0].medidas.ancho}</p>
            <p>Tipo de suelo: {canchasParaMostrar[0].tipodesuelo}</p>
            <p>Latitud: {canchasParaMostrar[0].ubicacionGeografica.lat_1}</p>
            <p>Longitud: {canchasParaMostrar[0].ubicacionGeografica.lng_1}</p>

            {isAuthenticated && (
              <div className="mt-4">
                <h4 className="font-bold text-lg">Reservar horario:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {generarHorasReservables(Deportivo.horario[currentDay]).map((hora) => (
                    <button
                      key={hora}
                      onClick={() => handleReservarHora(hora)}
                      className={`px-3 py-1 rounded ${
                        reservas[hora]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-lime-600 text-white hover:bg-lime-700"
                      }`}
                      disabled={!!reservas[hora]}
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <p className="mt-4 text-lime-600 font-bold">No hay canchas disponibles para este filtro.</p>
      )}
    </Card>
  );
}
