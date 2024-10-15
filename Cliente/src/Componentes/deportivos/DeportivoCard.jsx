import { Card } from "../UI";

export function ParqueCard({ Deportivo }) {

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{Deportivo.nombre}</h1>
      </header>
      <p className="text-slate-300">{Deportivo.direccion}</p>
      <p className="text-slate-300">{Deportivo.fechaDeRegistro}</p>
      <p className="text-slate-300">{Deportivo.costo}</p>
      <p className="text-slate-300">{Deportivo.horario}</p>
    </Card>
  );
}