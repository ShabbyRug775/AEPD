import { Button, Card } from "../UI";

export function AceptarCard({ usuarios, onAceptar }) {
    const handleAceptarClick = () => {
        if (onAceptar) {
            onAceptar();
        }
        window.location.reload(); // Recarga la página
    };

    return (
        <Card>
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{usuarios.nombreusuario}</h1>
            </header>
            <p className="text-lime-950">
                <h4 className="text-lg">Username: </h4>{usuarios.username}
            </p>
            <p className="text-lime-950">
                <h4 className="text-lg">Correo: </h4>{usuarios.email}
            </p>
            <div className="flex gap-x-2 items-center">
                {onAceptar && (
                    <Button onClick={handleAceptarClick} className="px-3 py-1 bg-lime-500 text-white rounded-md">
                        Aceptar Solicitud
                    </Button>
                )}
            </div>
        </Card>
    );
}
