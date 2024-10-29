import { ButtonLink, Card } from "../UI";
import { usarUsuario } from "../../Contexto/usuarioContexto";
import { useEffect, useState } from "react";
import { days } from "./listasDesp";

export function ParqueCard({ Deportivo }) {
  const { isAuthenticated, Usuario } = usarUsuario();
  const [isOpen, setIsOpen] = useState(false);
  const [nextOpening, setNextOpening] = useState(null); // Estado para la próxima apertura
  const [nextDay, setNextDay] = useState(""); // Estado para el día siguiente
  const [closingTime, setClosingTime] = useState(null); // Estado para la hora de cierre

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const currentDay = now.toLocaleString('es-MX', { weekday: 'long' }).toLowerCase();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      const horario = Deportivo.horario[currentDay];
      const nextDayOfWeek = getNextDay(currentDay); // Obtener el siguiente día

      if (horario) {
        const [openTime, closeTime] = horario.split(' - ');

        const [openHour, openMinutes] = openTime.split(':').map(Number);
        const [closeHour, closeMinutes] = closeTime.split(':').map(Number);

        const currentTotalMinutes = currentHour * 60 + currentMinutes;
        const openTotalMinutes = openHour * 60 + openMinutes;
        const closeTotalMinutes = closeHour * 60 + closeMinutes;

        if (currentTotalMinutes >= openTotalMinutes && currentTotalMinutes <= closeTotalMinutes) {
          setIsOpen(true);
          setNextOpening(null); // Resetea si está abierto
          setNextDay(""); // Resetea el día siguiente
          setClosingTime(formatTime(closeTime)); // Guardar la hora de cierre
        } else {
          setIsOpen(false);
          // Si está cerrado, establecer la próxima apertura
          const nextOpen = Deportivo.horario[nextDayOfWeek]?.split(' - ')[0]; // Hora de apertura del siguiente día
          if (nextOpen) {
            setNextOpening(formatTime(nextOpen)); // Formatear la hora
            setNextDay(nextDayOfWeek); // Establecer el día siguiente
          }
          setClosingTime(null); // Resetea la hora de cierre
        }
      }
    };

    const getNextDay = (currentDay) => {
      const currentIndex = days.indexOf(currentDay);
      return days[(currentIndex + 1) % days.length]; // Retorna el siguiente día
    };

    const formatTime = (time) => {
      const [hour, minutes] = time.split(':').map(Number);
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12; // Convierte a formato 12 horas
      return `${formattedHour}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
    };

    checkIfOpen();
  }, [Deportivo]);

  return (
    <Card className="w-full h-dvh">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{Deportivo.nombre}</h1>
      </header>
      <p className="text-lime-950"><h4 className="text-lg">Dirección: </h4>{Deportivo.direccion}</p>
      <p className="text-lime-950"><h4 className="text-lg">Alcaldía: </h4>{Deportivo.alcaldia}</p>
      <p className="text-lime-950"><h4 className="text-lg">Costo: </h4>{Deportivo.costo}</p>
      <p className="text-lime-950"><h4 className="text-lg">Horario: </h4></p>
      {isOpen && (
        <p className="text-lime-900 font-bold">
          Abierto ahora. Cierra a las: {closingTime}
        </p>
      )}
      {!isOpen && nextOpening && nextDay && (
        <p className="text-amber-700 font-bold">
          Cerrado, abre a las: {nextOpening} el {nextDay.charAt(0).toUpperCase() + nextDay.slice(1)}.
        </p>
      )}
      <div className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            {Usuario.nivelPermiso == 5 && (
              <>
                <ButtonLink to={`/deportivos/${Deportivo._id}`}> Visualizar </ButtonLink>
                <ButtonLink to={`/EspDepUpdate/${Deportivo._id}`}> Actualizar espacio deportivo </ButtonLink>
              </>
            )}
          </>
        ) : (
          <>
            <ButtonLink to={`/deportivos/${Deportivo._id}`}> Visualizar </ButtonLink>
          </>
        )}
      </div>
    </Card>
  );
}
