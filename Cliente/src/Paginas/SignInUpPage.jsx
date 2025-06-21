import { useEffect } from "react";
import { usarUsuario } from "../Contexto/usuarioContexto";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../Componentes/UI";
import { useForm } from "react-hook-form";
import { SignInUpEsquema } from "../Esquemas/usuario";
import { zodResolver } from "@hookform/resolvers/zod";

function SignInUpPage() {
  const { SignInUp, errors: registerErrors = [], isAuthenticated } = usarUsuario();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignInUpEsquema) });

  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await SignInUp(value);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/deportivos");
      window.location.reload(); // Refresca la página
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center mt-20">
      <Card>
        {/* Mostrar errores que vienen del backend */}
        {registerErrors.length > 0 &&
          registerErrors.map((error, i) => (
            <Message message={error} key={i} type="error" />
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
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
          </div>

          <h1 className="text-3xl  mb-10 font-bold uppercase"> Crear cuenta </h1>
        </div>

        <form className="text-xl" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Label htmlFor="nombreusuario">Nombre: </Label>
          <Input
            id="nombreusuario"
            type="text"
            name="nombreusuario"
            placeholder="Escribe tu nombre completo"
            {...register("nombreusuario")}
            autoFocus
          />
          {errors.nombreusuario?.message && (
            <p className="text-red-500">{errors.nombreusuario.message}</p>
          )}

          <Label htmlFor="username">Nombre de usuario: </Label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Escribe un nombre de usuario"
            {...register("username")}
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <Label htmlFor="email">Correo electrónico: </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Escribe tu correo electrónico"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <Label htmlFor="password">Contraseña: </Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirmar contraseña:</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <div className="mt-10 justify-self-center">
            <Button type="submit">Crear cuenta</Button>
          </div>
        </form>

        <p className="flex gap-x-2 justify-between">
          ¿Ya tienes una cuenta?{" "}
          <Link
            className="text-lime-800 hover:underline hover:font-bold"
            to="/LogInPage"
          >
            Iniciar sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default SignInUpPage;
