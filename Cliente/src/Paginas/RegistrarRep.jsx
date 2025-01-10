// RegistrarRep.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignInUpEsquema } from "../Esquemas/usuario";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../Componentes/UI";
import { usarUsuario } from "../Contexto/usuarioContexto";

function RegistrarRep() {
    const { RegistrarRep, errors: registerErrors } = usarUsuario();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(SignInUpEsquema) });


    const onSubmit = async (value) => {
        // Asignamos nivelPermiso como 4 por defecto
        const data = { ...value, nivelPermiso: 4 };

        // Usamos SignInUp en lugar de RegistrarRep
        await RegistrarRep(data);
        window.location.reload();
    };

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center mt-20">
            <Card>
                {registerErrors.map((error, i) => (
                    <Message message={error} key={i} />
                ))}

                <h1 className="text-3xl font-bold">Registrar Nuevo Usuario</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="nombreusuario">Nombre:</Label>
                    <Input type="text" name="nombreusuario" placeholder="Escribe el nombre" {...register("nombreusuario")} />
                    {errors.nombreusuario?.message && <p className="text-red-500">{errors.nombreusuario?.message}</p>}

                    <Label htmlFor="username">Nombre de usuario:</Label>
                    <Input type="text" name="username" placeholder="Escribe el nombre de usuario" {...register("username")} />
                    {errors.username?.message && <p className="text-red-500">{errors.username?.message}</p>}

                    <Label htmlFor="email">Correo:</Label>
                    <Input name="email" placeholder="youremail@domain.tld" {...register("email")} />
                    {errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}

                    <Label htmlFor="password">Contraseña:</Label>
                    <Input type="password" name="password" placeholder="********" {...register("password")} />
                    {errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}

                    <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
                    <Input type="password" name="confirmPassword" placeholder="********" {...register("confirmPassword")} />
                    {errors.confirmPassword?.message && <p className="text-red-500">{errors.confirmPassword?.message}</p>}

                    <Button>Registrar</Button>
                </form>
            </Card>
        </div>
    );
}

export default RegistrarRep;
