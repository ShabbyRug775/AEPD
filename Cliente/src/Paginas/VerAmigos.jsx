import { useEffect, useState } from "react";
import { AmigoCard } from "../Componentes/usuarios/AmigosCard";
import { obtenerAmigosRequest, eliminarAmigoRequest } from "../Api/usuario";

export function VerAmigos() {
    const [amigos, setAmigos] = useState([]);

    useEffect(() => {
        async function cargarAmigos() {
            try {
                // Solicitar los amigos del usuario
                const res = await obtenerAmigosRequest();
                console.log("Datos de amigos:", res.data);

                // Verifica si los amigos son un arreglo antes de asignarlos
                if (Array.isArray(res.data)) {
                    setAmigos(res.data); // Aquí se almacena la lista de amigos
                } else {
                    console.error("La respuesta no contiene un arreglo de amigos.");
                }
            } catch (error) {
                console.log("Error al cargar amigos:", error);
            }
        }

        cargarAmigos();
    }, []);

    const eliminarAmigo = async (amigoId) => {
        try {
            // Eliminar el amigo de la lista de ambos usuarios 
            await eliminarAmigoRequest(amigoId);
            setAmigos((prevAmigos) => prevAmigos.filter((amigo) => amigo._id !== amigoId));
            alert("Amigo eliminado correctamente");
        } catch (error) {
            console.log("Error al eliminar amigo:", error);
        }
    };


    return (
        <div className="bg-lime-50 p-10 mt-20">
            <h2 className="text-xl font-bold text-lime-900">Lista de Amigos</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
                {amigos.length === 0 ? (
                    <p>No tienes amigos en tu lista.</p>
                ) : (
                    amigos.map((amigo) => (
                        <AmigoCard
                            usuarios={amigo}
                            key={amigo._id}
                            onEliminar={eliminarAmigo}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
