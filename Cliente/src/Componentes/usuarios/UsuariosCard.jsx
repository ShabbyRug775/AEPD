import { ButtonLink, Card } from "../UI";

export function UsuarioCard({ usuarios }) {

    return (
        <Card>
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{usuarios.nombreusuario}</h1>
            </header>
            <p className="text-lime-950"><h4 className="text-lg">Username: </h4>{usuarios.username}</p>
            <p className="text-lime-950"><h4 className="text-lg">Correo: </h4>{usuarios.email}</p>{/*
            <p className="text-lime-950"><h4 className="text-lg">ward</h4>{Usuario.nombreusuario}</p>
            <p className="text-lime-950"><h4 className="text-lg">ward </h4>{Usuario.nombreusuario}</p>
            <p className="text-lime-950"><h4 className="text-lg">ward</h4>{Usuario.nombreusuario}</p> */}
            <div className="flex gap-x-2 items-center">
                <ButtonLink to={``}> Enviar Solicitud </ButtonLink>
            </div>
        </Card>
    );
}