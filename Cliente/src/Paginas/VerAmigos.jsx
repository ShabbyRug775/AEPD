import { useEffect, useState } from "react";
import { AmigoCard } from "../Componentes/usuarios/AmigosCard";
import { obtenerAmigosRequest } from "../Api/usuario";

export function VerAmigos() {
    const [amigos, setAmigos] = useState([]);

    useEffect(() => {
        async function cargarAmigos() {
            try {
                const res = await obtenerAmigosRequest();
                setAmigos(res.data);
            } catch (error) {
                console.log("Error al cargar amigos:", error);
            }
        }
        cargarAmigos();
    }, []);

    return (
        <div className="bg-lime-50 p-10 mt-20">
            <h2 className="text-xl font-bold text-lime-900">Lista de Amigos</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
                {amigos.length === 0 ? (
                    <p>No tienes amigos en tu lista.</p>
                ) : (
                    amigos.map((amigo) => (
                        <AmigoCard usuarios={amigo} key={amigo.ID} />
                    ))
                )}
            </div>
        </div>
    );
}