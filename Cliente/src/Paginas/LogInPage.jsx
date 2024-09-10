// Se importan librerias de react, componentes y contexto de usuario
import { usarUsuario } from "../Contexto/usuarioContexto";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../Componentes/UI";
import { LogInEsquema } from "../Esquemas/usuario";

// Funcion de LogIn
export function LogInPage() {

    // Constante para verificar errores
    const {

        register,
        handleSubmit,
        formState: { errors },

    } = useForm({ resolver: zodResolver(LogInEsquema) });

    // Constante de verificacion de errores
    const { LogIn, errors: loginErrors, isAuthenticated } = usarUsuario();
    // Se llama navigate de react
    const navigate = useNavigate();

    // Constante de OnSubmit para iniciar sesion
    const onSubmit = (data) => LogIn(data);

    // Si se corroboran los datos lo manda a articulos
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/EspDepPage");
      }
    }, [isAuthenticated]);

    // Retorna el HTML de la página
    return (

        <div className="h-[calc(100vh-100px)] flex items-center justify-center">

            <Card>

                {loginErrors.map((error, i) => (
                  <Message message={error} key={i} />
                ))}

                <h1 className="text-2xl font-bold"> Inicio de Sesión </h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Label htmlFor="email"> Correo: </Label>

                    <Input
                      label="Escribe tu correo"
                      type="email"
                      name="correo"
                      placeholder="youremail@domain.tld"
                      {...register("email", { required: true })}
                    />
                    
                    <p>{errors.email?.message}</p>

                    <Label htmlFor="password"> Contraseña: </Label>

                    <Input
                      type="password"
                      name="password"
                      placeholder="Escribe tu contraseña"
                      {...register("password", { required: true, minLength: 6 })}
                    />

                    <p>{errors.password?.message}</p>

                    <Button> Iniciar Sesión </Button>
                </form>

                <p className="flex gap-x-2 justify-between">
                    ¿No tienes una cuenta? <Link to="/SignInUpPage" className="text-sky-500"> Crear cuenta </Link>
                </p>

            </Card>

        </div>

    );

}