import { ButtonLink, Card } from "../UI";

export function UsuarioCard({ Usuario }) {

    return (
        <Card>
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{Usuario.nombreusuario}</h1>
            </header>
            <p className="text-lime-950"><h4 className="text-lg">Username: </h4>{Usuario.username}</p>
            <p className="text-lime-950"><h4 className="text-lg">Correo: </h4>{Usuario.email}</p>{/*
            <p className="text-lime-950"><h4 className="text-lg">ward</h4>{Usuario.nombreusuario}</p>
            <p className="text-lime-950"><h4 className="text-lg">ward </h4>{Usuario.nombreusuario}</p>
            <p className="text-lime-950"><h4 className="text-lg">ward</h4>{Usuario.nombreusuario}</p> */}
            <div className="flex gap-x-2 items-center">
                <ButtonLink to={``}> Enviar Solicitud </ButtonLink>
            </div>
        </Card>
    );
}