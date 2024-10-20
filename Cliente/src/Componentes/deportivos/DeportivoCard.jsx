import { ButtonLink, Card } from "../UI";

export function ParqueCard({ Deportivo }) {

  return (
    <Card className="w-full h-dvh">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{Deportivo.nombre}</h1>
      </header>
      <p className="text-lime-950"><h4 className="text-lg">Dirección: </h4>{Deportivo.direccion}</p>
      <p className="text-lime-950"><h4 className="text-lg">Alcaldía: </h4>{Deportivo.alcaldia}</p>
      <p className="text-lime-950"><h4 className="text-lg">Horario de lunes a viernes: </h4>{Deportivo.horario.lunesViernes}</p>
      <p className="text-lime-950"><h4 className="text-lg">Horario de sábado y domingo: </h4>{Deportivo.horario.sabadoDomingo}</p>
      <p className="text-lime-950"><h4 className="text-lg">Costo: </h4>{Deportivo.costo}</p>
      <div className="flex gap-x-2 items-center">
        <ButtonLink to={`/deportivos/${Deportivo._id}`}> Visualizar </ButtonLink>
      </div>
    </Card>
  );
}