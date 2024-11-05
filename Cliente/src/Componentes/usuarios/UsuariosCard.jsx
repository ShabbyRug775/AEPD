import { enviarSolicitudAmistadRequest } from "../../Api/usuario";
import { Button, Card } from "../UI";

export function UsuarioCard({ usuarios }) {
    const handleEnviarSolicitud = async () => {
        try {
            await enviarSolicitudAmistadRequest(usuarios._id);
            alert("Solicitud enviada");

        } catch (error) {
            console.error("Error al enviar la solicitud de amistad:", error);
            alert("Error al enviar la solicitud");
        }
    };

    return (
        <Card>
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{usuarios.nombreusuario}</h1>
            </header>
            <p className="text-lime-950"><h4 className="text-lg">Username: </h4>{usuarios.username}</p>
            <p className="text-lime-950"><h4 className="text-lg">Correo: </h4>{usuarios.email}</p>
            <div className="flex gap-x-2 items-center">
                <Button onClick={handleEnviarSolicitud} className="btn btn-primary">
                    Enviar Solicitud
                </Button>
            </div>
        </Card>
    );
}
