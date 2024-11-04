import { Button, Card } from "../UI";

export function AmigoCard({ usuarios }) {

    return (
        <Card>
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{usuarios.nombreusuario}</h1>
            </header>
            <p className="text-lime-950"><h4 className="text-lg">Username: </h4>{usuarios.username}</p>
            <p className="text-lime-950"><h4 className="text-lg">Correo: </h4>{usuarios.email}</p>
        </Card>
    );
}
