import { Link } from "react-router-dom";
import { usarUsuario } from "../Contexto/usuarioContexto";
import { ButtonLink } from "./UI/ButtonLink";

export function Navbar() {
  const { isAuthenticated, LogOut, Usuario } = usarUsuario();
  console.log(isAuthenticated, Usuario)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/EspDep" : "/"}> Espacios Deportivos </Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido {Usuario.nombreusuario}
            </li>
            <li>
              <ButtonLink to="/EspDepPage"> Deportivos </ButtonLink>
            </li>
            <li>
              <Link to="/" onClick={() => LogOut()}>
                Cerrar sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/LogInPage"> Iniciar sesión </ButtonLink>
            </li>
            <li>
              <ButtonLink to="/SignInUpPage"> Registrarse </ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}