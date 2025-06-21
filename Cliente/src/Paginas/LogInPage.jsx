import { usarUsuario } from "../Contexto/usuarioContexto";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../Componentes/UI";
import { LogInEsquema } from "../Esquemas/usuario";

export function LogInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LogInEsquema) });

  const { LogIn, errors: loginErrors, isAuthenticated } = usarUsuario();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await LogIn(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/HomePage");
      // window.location.reload(); // generalmente no es necesario
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center mt-20">
      <Card>
        {/* Mostrar errores de backend */}
        {loginErrors.length > 0 &&
          loginErrors.map((error, i) => (
            <Message key={i} message={error} type="error" />
          ))}

        <div className="justify-self-center ">
          <div className="justify-self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(101 163 13)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
          </div>
          <h1 className="text-3xl  mb-10 font-bold uppercase">Iniciar sesión</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Label htmlFor="email">Correo:</Label>
          <Input
            id="email"
            type="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}

          <Label htmlFor="password" className="mt-4">
            Contraseña:
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Escribe tu contraseña"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          <div className="mt-10 justify-self-center">
            <Button type="submit">Iniciar Sesión</Button>
          </div>
        </form>

        <p className="flex gap-x-2 justify-between mt-4">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/SignInUpPage"
            className="text-lime-800 hover:underline hover:font-bold"
          >
            Crear cuenta
          </Link>
        </p>
      </Card>
    </div>
  );
}
