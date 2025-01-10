import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Card, Label, Button } from "../Componentes/UI";
import { eliminarCuentaRequest } from "../Api/usuario";
import { usarUsuario } from "../Contexto/usuarioContexto";

export function EliminarCuenta() {
    const [formulario, setFormulario] = useState({
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const { Usuario } = usarUsuario();
    const navigate = useNavigate();

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const manejarEliminacion = async (e) => {
        e.preventDefault();

        if (formulario.password !== formulario.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (!formulario.password) {
            setError("Por favor, introduce tu contraseña.");
            return;
        }

        try {
            // Enviar solicitud de eliminación de cuenta con la contraseña
            await eliminarCuentaRequest({ id: Usuario._id, password: formulario.password });
            alert("Tu cuenta ha sido eliminada.");
            navigate("/HomePage"); // Redirigir a la página de inicio después de la eliminación
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar cuenta:", error);
            setError("Error al eliminar la cuenta. Verifica tu contraseña.");
        }
    };

    return (
        <div className="flex justify-center bg-lime-50 p-10 mt-20">
            <Card>
                <h1 className="text-xl font-bold text-center mb-4">Eliminar Cuenta</h1>
                <form onSubmit={manejarEliminacion}>
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formulario.password}
                        onChange={manejarCambio}
                    />

                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formulario.confirmPassword}
                        onChange={manejarCambio}
                    />

                    {error && <div className="text-red-500 mt-2">{error}</div>}

                    <Button type="submit" className="bg-red-500 text-white mt-4">
                        Eliminar Cuenta
                    </Button>
                </form>
            </Card>
        </div>
    );
}
