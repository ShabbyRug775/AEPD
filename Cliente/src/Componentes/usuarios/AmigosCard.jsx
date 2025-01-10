import { Button, Card } from "../UI";

export function AmigoCard({ usuarios, onEliminar }) {
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
                {onEliminar && (
                    <Button
                        onClick={() => onEliminar(usuarios._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                        Eliminar Amigo
                    </Button>
                )}
            </div>
        </Card>
    );
}
