import { Card } from "../UI";

export function ParqueCard({ Parque }) {

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{Parque.nombre}</h1>
      </header>
      <p className="text-slate-300">{Parque.descripcion}</p>
      <p className="text-slate-300">{Parque.actividades}</p>
      <p className="text-slate-300">{Parque.horario}</p>
      <p className="text-slate-300">{Parque.delegacion}</p>
    </Card>
  );
}