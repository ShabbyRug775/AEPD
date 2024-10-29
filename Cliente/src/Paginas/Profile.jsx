import { useEffect, useState } from "react";
import { ImFileEmpty } from "react-icons/im";
import { Input, Card, Label, Button, ButtonLink } from "../Componentes/UI";
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
        <div className="flex justify-center mt-10">
            <Card>
                <h1 className="text-xl font-bold text-center mb-4">Perfil de Usuario</h1>
                <Label htmlFor="nombreusuario">Nombre de usuario</Label>
                <Input id="nombreusuario" value={perfil.nombreusuario} readOnly />

                <Label htmlFor="username">Username</Label>
                <Input id="username" value={perfil.username} readOnly />

                <Label htmlFor="email">Email</Label>
                <Input id="email" value={perfil.email} readOnly />

                <div className="flex justify-between mt-6">
                    <ButtonLink to="/editar-perfil">Editar Perfil</ButtonLink>
                    <ButtonLink to="/solicitar-amistad">Enviar Solicitud de Amistad</ButtonLink>
                </div>
            </Card>
        </div>
    );
}

export default Profile;
