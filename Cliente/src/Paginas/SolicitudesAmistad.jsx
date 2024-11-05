import { useEffect, useState } from "react";
import { AceptarCard } from "../Componentes/usuarios/AceptarCard";
import { obtenerSolicitudesRecibidasRequest, aceptarSolicitudRequest } from "../Api/usuario";

export function SolicitudesAmistad() {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        async function cargarSolicitudes() {
            try {
                const res = await obtenerSolicitudesRecibidasRequest();
                console.log("Datos de solicitudes recibidas:", res.data);
                setSolicitudes(res.data);
            } catch (error) {
                console.log("Error al cargar solicitudes recibidas:", error);
            }
        }
        cargarSolicitudes();
    }, []);

    const aceptarSolicitud = async (solicitudId) => {
        try {
            await aceptarSolicitudRequest(solicitudId);
            setSolicitudes(prevSolicitudes => prevSolicitudes.filter(solicitud => solicitud.ID !== solicitudId));
            alert("Solicitud aceptada");
        } catch (error) {
            console.log("Error al aceptar solicitud de amistad:", error);
        }
    };

    return (
        <div className="bg-lime-50 p-10 mt-20">
            <h2 className="text-xl font-bold text-lime-900">Solicitudes de Amistad Recibidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
                {solicitudes.length === 0 ? (
                    <p>No tienes solicitudes de amistad pendientes.</p>
                ) : (
                    solicitudes.map((solicitud) => (
                        <AceptarCard
                            usuarios={solicitud}
                            key={solicitud.ID}
                            onAceptar={() => aceptarSolicitud(solicitud.ID)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
