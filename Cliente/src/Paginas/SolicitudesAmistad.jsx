import { useEffect, useState } from "react";
import { AceptarCard } from "../Componentes/usuarios/AceptarCard";
import { obtenerSolicitudesRecibidasRequest, aceptarSolicitudRequest, rechazarSolicitudRequest } from "../Api/usuario";

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

    async function aceptarSolicitud(idUsuarioEmisor) {
        try {
            await aceptarSolicitudRequest(idUsuarioEmisor);
            setSolicitudes(solicitudes.filter(solicitud => solicitud._id !== idUsuarioEmisor));
            window.location.reload();
        } catch (error) {
            console.error("Error al aceptar solicitud:", error);
        }
    }

    async function rechazarSolicitud(idUsuarioEmisor) {
        try {
            await rechazarSolicitudRequest(idUsuarioEmisor);
            setSolicitudes(solicitudes.filter(solicitud => solicitud._id !== idUsuarioEmisor));
        } catch (error) {
            console.error("Error al rechazar solicitud:", error);
        }
    }


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
                            key={solicitud._id} // Cambiar si es necesario
                            onAceptar={() => aceptarSolicitud(solicitud._id)}
                            onRechazar={() => rechazarSolicitud(solicitud._id)}
                        />
                    ))

                )}
            </div>
        </div>
    );
}
