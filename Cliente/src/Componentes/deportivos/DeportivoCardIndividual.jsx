import { ButtonLink, Card } from "../UI";

export function DeportivoCard_idv({ Deportivo }) {

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{Deportivo.nombre}</h1>
      </header>
      <p className="text-lime-950">{Deportivo.direccion}</p>
      <p className="text-lime-950">{Deportivo.fechaDeRegistro}</p>
      <p className="text-lime-950">{Deportivo.costo}</p>
    </Card>
  );
}