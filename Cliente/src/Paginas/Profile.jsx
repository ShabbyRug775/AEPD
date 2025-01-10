import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Card, Label, Button } from "../Componentes/UI";
import { ProfileRequest, actualizarPerfilRequest } from "../Api/usuario";

export function Profile() {
    const [perfil, setPerfil] = useState(null);
    const [formulario, setFormulario] = useState({
        nombreusuario: "",
        username: "",
        password: "",
    });
    const [editando, setEditando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function cargarPerfil() {
            try {
                const res = await ProfileRequest();
                setPerfil(res.data);
                setFormulario({
                    nombreusuario: res.data.nombreusuario,
                    username: res.data.username,
                    password: "",
                });
            } catch (error) {
                console.log("Error al cargar perfil:", error);
            }
        }
        cargarPerfil();
    }, []);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const manejarGuardar = async (e) => {
        e.preventDefault();
        if (!formulario.password) {
            alert("Por favor, introduce tu contraseña para guardar los cambios.");
            return;
        }
        try {
            await actualizarPerfilRequest({
                nombreusuario: formulario.nombreusuario,
                username: formulario.username,
                password: formulario.password,
            });
            alert("Perfil actualizado con éxito.");
            setEditando(false);
            window.location.reload();
        } catch (error) {
            console.log("Error al actualizar perfil:", error);
            alert("Error al actualizar perfil. Verifica tu contraseña.");
        }
    };

    if (!perfil) return <div>Cargando perfil...</div>;

    return (
        <div className="flex justify-center bg-lime-50 p-10 mt-20">
            <Card>
                <h1 className="text-xl font-bold text-center mb-4">Editar Perfil</h1>
                <form onSubmit={manejarGuardar}>
                    <Label htmlFor="nombreusuario">Nombre de usuario</Label>
                    <Input
                        id="nombreusuario"
                        name="nombreusuario"
                        value={formulario.nombreusuario}
                        onChange={manejarCambio}
                        readOnly={!editando}
                    />

                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        name="username"
                        value={formulario.username}
                        onChange={manejarCambio}
                        readOnly={!editando}
                    />

                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={perfil.email} readOnly />

                    {editando && (
                        <>
                            <Label htmlFor="contraseña">Contraseña</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formulario.password}
                                onChange={manejarCambio}
                            />
                        </>
                    )}

                    <div className="flex justify-between mt-6">
                        {editando ? (
                            <>
                                <Button type="submit" className="bg-lime-500 text-white">
                                    Guardar Cambios
                                </Button>
                                <Button
                                    type="button"
                                    className="bg-red-500 text-white"
                                    onClick={() => setEditando(false)}
                                >
                                    Cancelar
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    className="bg-lime-500 text-white"
                                    onClick={() => setEditando(true)}
                                >
                                    Editar Perfil
                                </Button>
                                <Button
                                    type="button"
                                    className="bg-red-500 text-white"
                                    onClick={() => navigate("/EliminarCuenta")}
                                >
                                    Eliminar Cuenta
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </Card>
        </div>
    );
}
