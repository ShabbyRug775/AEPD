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
      navigate("/EspDepPage");
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

        <h1 className="text-3xl font-bold"> Registro de usuario </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Label htmlFor="nombreusuario"> Nombre de usuario: </Label>

          <Input
            type="text"
            name="nombreusuario"
            placeholder="Escribe tu nombre"
            {...register("nombreusuario")}
            autoFocus
          />

          {errors.nombre_usuario?.message && (
            <p className="text-red-500">{errors.nombreusuario?.message}</p>
          )}

          <Label htmlFor="username"> Nombre de usuario: </Label>

          <Input
            type="text"
            name="username"
            placeholder="Escribe tu nombre de usuario"
            {...register("username")}
            autoFocus
          />

          {errors.nombre_usuario?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <Label htmlFor="email"> Correo: </Label>

          <Input
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password"> Contraseña: </Label>

          <Input
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword"> Confirmar contraseña: </Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <Button> Registrar </Button>
        </form>
        <p className="flex gap-x-2 justify-between">
          ¿Ya tienes una cuenta?
          <Link className="text-lime-800" to="/LogInPage">
            Iniciar Sesión
          </Link>
        </p>

      </Card>

    </div>

  );
}

// Se exporta el registro de usuario
export default SignInUpPage;