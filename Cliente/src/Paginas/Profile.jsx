import { useEffect, useState } from "react";
import { ImFileEmpty } from "react-icons/im";
import { Input, Select, Checkbox } from "../Componentes/UI";
import { ProfileRequest } from "../Api/usuario";

export function Profile() {
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        async function cargarPerfil() {
            try {
                const res = await ProfileRequest();
                setPerfil(res.data);
            } catch (error) {
                console.log("Error al cargar perfil:", error);
            }
        }
        cargarPerfil();
    }, []);

    if (!perfil) return <div>Cargando perfil...</div>;

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            <p>Nombre de usuario: {perfil.nombreusuario}</p>
            <p>Username: {perfil.username}</p>
            <p>Username: {perfil.email}</p>
            {/* Aquí puedes agregar otros datos de perfil */}
        </div>
    );
}

export default Profile;
