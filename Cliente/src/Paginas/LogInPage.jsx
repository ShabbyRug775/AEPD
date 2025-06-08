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
        navigate("/HomePage");
        window.location.reload(); // Refresca la página
      }
    }, [isAuthenticated]);

    // Retorna el HTML de la página
    return (

        <div className="h-[calc(100vh-100px)] flex items-center justify-center mt-20">

            <Card>

                {loginErrors.map((error, i) => (
                  <Message message={error} key={i} />
                ))}

                <div className="justify-self-center ">
                  <div className="justify-self-center">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke=" rgb(101 163 13)"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                    </svg>
                  </div>
                  <h1 className="text-3xl  mb-10 font-bold uppercase">Iniciar sesión</h1>
                </div>

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
                    <div className="mt-10 justify-self-center">
                      <Button> Iniciar Sesión </Button>
                    </div>
                    
                </form>

                <p className="flex gap-x-2 justify-between">
                    ¿No tienes una cuenta? <Link to="/SignInUpPage" className="text-lime-800 hover:underline hover:font-bold"> Crear cuenta </Link>
                </p>

            </Card>

        </div>

    );

}