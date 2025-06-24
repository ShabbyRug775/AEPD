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
  const totalPaginas = Math.ceil(canchasFiltradas.length);
  const canchasParaMostrar = canchasFiltradas.slice(paginaActual, paginaActual + 1);

  // Estados y lógica de reservas y partidas igual que antes...
  const [reservas, setReservas] = useState({});
  const [partidas, setPartidas] = useState([]);
  const [lugaresParaAbrir, setLugaresParaAbrir] = useState("");
  const [horaInicioPartida, setHoraInicioPartida] = useState("");
  const [horaFinPartida, setHoraFinPartida] = useState("");

  const storageKeyReservas = `reservas_${Deportivo._id || Deportivo.nombre}`;
  const storageKeyPartidas = `partidas_${Deportivo._id || Deportivo.nombre}`;

  useEffect(() => {
    const reservasGuardadas = localStorage.getItem(storageKeyReservas);
    if (reservasGuardadas) {
      const parsed = JSON.parse(reservasGuardadas);
      const hoy = new Date().toISOString().slice(0, 10);
      if (parsed.fecha !== hoy) {
        localStorage.removeItem(storageKeyReservas);
        setReservas({});
      } else {
        setReservas(parsed.reservas || {});
      }
    }
  }, [storageKeyReservas]);

  useEffect(() => {
    if (Object.keys(reservas).length > 0) {
      const hoy = new Date().toISOString().slice(0, 10);
      localStorage.setItem(storageKeyReservas, JSON.stringify({ fecha: hoy, reservas }));
    }
  }, [reservas, storageKeyReservas]);

  useEffect(() => {
    const partidasGuardadas = localStorage.getItem(storageKeyPartidas);
    if (partidasGuardadas) {
      setPartidas(JSON.parse(partidasGuardadas));
    }
  }, [storageKeyPartidas]);

  useEffect(() => {
    localStorage.setItem(storageKeyPartidas, JSON.stringify(partidas));
  }, [partidas, storageKeyPartidas]);

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

  const handleReservarHora = (hora) => {
    setReservas((prev) => ({
      ...prev,
      [hora]: true,
    }));
    alert(`Reservaste la hora ${hora} exitosamente.`);
  };

  const crearPartida = () => {
    if (!lugaresParaAbrir || !horaInicioPartida || !horaFinPartida) {
      alert("Por favor ingresa lugares disponibles, hora de inicio y hora de finalización para la partida");
      return;
    }

    // Validar que horaFin > horaInicio
    if (horaFinPartida <= horaInicioPartida) {
      alert("La hora de finalización debe ser mayor que la hora de inicio.");
      return;
    }

    const nueva = {
      id: Date.now(),
      canchaId: canchasParaMostrar[0]?._id || null,
      deporte: filtroDeporte || (canchasParaMostrar[0]?.deporte ?? "Sin deporte"),
      lugaresTotales: Number(lugaresParaAbrir),
      lugaresOcupados: 0,
      horaInicio: horaInicioPartida,
      horaFin: horaFinPartida,
    };
    setPartidas([...partidas, nueva]);
    setLugaresParaAbrir("");
    setHoraInicioPartida("");
    setHoraFinPartida("");
  };

  const unirsePartida = (id) => {
    setPartidas((prev) =>
      prev.map((p) => {
        if (p.id === id && p.lugaresOcupados < p.lugaresTotales) {
          return { ...p, lugaresOcupados: p.lugaresOcupados + 1 };
        }
        return p;
      })
    );
  };

  const currentDay = new Date().toLocaleString("es-MX", { weekday: "long" }).toLowerCase();

  return (
    <Card>
      {/* FILTRO */}
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

      {/* CANCHAS (paginado) */}
      {canchasParaMostrar.length > 0 ? (
        <>
          <section className="mt-4">
            <h2 className="text-2xl font-bold text-lime-600">Cancha</h2>
            <div className="min-w-[300px] bg-lime-100 shadow-lg p-4 rounded-lg">
              <p className="text-xl font-semibold">{canchasParaMostrar[0].etiqueta || "Cancha"}</p>
              <p>Deporte: {canchasParaMostrar[0].deporte}</p>
              <p>Dimensiones: {canchasParaMostrar[0].medidas.largo} x {canchasParaMostrar[0].medidas.ancho}</p>
              <p>Tipo de suelo: {canchasParaMostrar[0].tipodesuelo}</p>
              <p>Latitud: {canchasParaMostrar[0].ubicacionGeografica.lat_1}</p>
              <p>Longitud: {canchasParaMostrar[0].ubicacionGeografica.lng_1}</p>

              {/* RESERVAS */}
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

              {/* CREAR PARTIDA */}
              {isAuthenticated && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-bold text-lg">Crear partida</h4>
                  <input
                    type="number"
                    min="1"
                    placeholder="Lugares disponibles"
                    value={lugaresParaAbrir}
                    onChange={(e) => setLugaresParaAbrir(e.target.value)}
                    className="block mb-2 p-2 rounded border w-full"
                  />
                  <label className="block mb-1 font-semibold">Hora inicio:</label>
                  <input
                    type="time"
                    value={horaInicioPartida}
                    onChange={(e) => setHoraInicioPartida(e.target.value)}
                    className="block mb-2 p-2 rounded border w-full"
                  />
                  <label className="block mb-1 font-semibold">Hora fin:</label>
                  <input
                    type="time"
                    value={horaFinPartida}
                    onChange={(e) => setHoraFinPartida(e.target.value)}
                    className="block mb-2 p-2 rounded border w-full"
                  />
                  <button
                    onClick={crearPartida}
                    className="bg-lime-700 text-white px-4 py-2 rounded hover:bg-lime-800 w-full"
                  >
                    Crear Partida
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* PAGINACION */}
          <section className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setPaginaActual((p) => Math.max(p - 1, 0))}
              disabled={paginaActual === 0}
              className="px-4 py-2 rounded bg-lime-600 text-white disabled:bg-gray-400"
            >
              Anterior
            </button>
            <span className="self-center font-bold text-lime-700">
              {paginaActual + 1} / {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas - 1))}
              disabled={paginaActual === totalPaginas - 1}
              className="px-4 py-2 rounded bg-lime-600 text-white disabled:bg-gray-400"
            >
              Siguiente
            </button>
          </section>

          {/* LISTA DE PARTIDAS */}
          <div className="mt-6">
            <h3 className="font-bold text-xl mb-3">Partidas abiertas</h3>
            {partidas.length === 0 && <p>No hay partidas disponibles.</p>}
            <ul>
              {partidas.map(({ id, deporte, horaInicio, horaFin, lugaresTotales, lugaresOcupados }) => {
                const lugaresRestantes = lugaresTotales - lugaresOcupados;
                return (
                  <li
                    key={id}
                    className="mb-3 p-3 border rounded bg-white flex justify-between items-center"
                  >
                    <div>
                      <p><strong>Deporte:</strong> {deporte}</p>
                      <p><strong>Hora inicio:</strong> {horaInicio}</p>
                      <p><strong>Hora fin:</strong> {horaFin}</p>
                      <p><strong>Lugares:</strong> {lugaresRestantes} / {lugaresTotales}</p>
                    </div>
                    <button
                      disabled={lugaresRestantes === 0}
                      onClick={() => unirsePartida(id)}
                      className={`px-3 py-1 rounded text-white ${
                        lugaresRestantes === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-lime-700 hover:bg-lime-800"
                      }`}
                    >
                      {lugaresRestantes === 0 ? "Completo" : "Unirse"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <p className="mt-4 text-lime-600 font-bold">No hay canchas disponibles para este filtro.</p>
      )}
    </Card>
  );
}
