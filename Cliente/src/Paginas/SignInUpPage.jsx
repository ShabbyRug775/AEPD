// Se importan librerias de react, componentes y contexto de usuario
import { useEffect } from "react";
import { usarUsuario } from "../Contexto/usuarioContexto";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../Componentes/UI";
import { useForm } from "react-hook-form";
import { SignInUpEsquema } from "../Esquemas/usuario";
import { zodResolver } from "@hookform/resolvers/zod";

// Funcion de SignInUp
function SignInUpPage() {

  // Constante de verificacion de errores
  const { SignInUp, errors: registerErrors, isAuthenticated } = usarUsuario();

  // Constante para verificar errores
  const {

    register,
    handleSubmit,
    formState: { errors },

  } = useForm({ resolver: zodResolver(SignInUpEsquema) });

  // Se llama navigate de react
  const navigate = useNavigate();

  // Constante de OnSubmit
  const onSubmit = async (value) => { await SignInUp(value) };

  // Si se corroboran los datos lo manda a espacios deportivos
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/deportivos");
      window.location.reload(); // Refresca la página
    }
  }, [isAuthenticated]);

  // Retorna el HTML de la página
  return (

    <div className="h-[calc(100vh-100px)] flex items-center justify-center mt-20">

      <Card>

        {registerErrors.map((error, i) => (
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
          
          <h1 className="text-3xl  mb-10 font-bold uppercase"> Crear cuenta </h1>
          
        </div>

        <form className="text-xl" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="nombreusuario">Nombre: </Label>

            <Input
              type="text"
              name="nombreusuario"
              placeholder="Escribe tu nombre completo"
              {...register("nombreusuario")}
              autoFocus
            />

          {errors.nombre_usuario?.message && (
            <p className="text-red-500">{errors.nombreusuario?.message}</p>
          )}

          <Label htmlFor="username">Nombre de usuario: </Label>

          <Input
            type="text"
            name="username"
            placeholder="Escribe un nombre de usuario"
            {...register("username")}
            autoFocus
          />

          {errors.nombre_usuario?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <Label htmlFor="email">Correo electrónico: </Label>

          <Input
            name="email"
            placeholder="Escribe tu correo electrónico"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password">Contraseña:  </Label>

          <Input
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirmar contraseña:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <div className="mt-10 justify-self-center">
            <Button>Crear cuenta </Button>
          </div>
        </form>
        <p className="flex gap-x-2 justify-between">
          ¿Ya tienes una cuenta?
          <Link className="text-lime-800 hover:underline hover:font-bold" to="/LogInPage">
            Iniciar sesión
          </Link>
        </p>

      </Card>

    </div>

  );
}

// Se exporta el registro de usuario
export default SignInUpPage;