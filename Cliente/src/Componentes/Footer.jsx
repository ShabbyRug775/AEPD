import { Link } from "react-router-dom";
import { usarUsuario } from "../Contexto/usuarioContexto";

export function Footer() {

    const { isAuthenticated } = usarUsuario();

    return (
        <footer className="bg-lime-950 flex justify-between py-5 px-10 text-lime-50 w-full bottom-0 left-0">

            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/HomePage"> Inicio </Link>
                        </li>
                        <li>
                            <Link to="/EspDepPage"> Deportivos </Link>
                        </li>
                        <li>
                            <Link to="/Mapa"> Mapa Deportivos </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/HomePage"> Inicio </Link>
                        </li>
                        <li>
                            <Link to="/EspDepPage"> Deportivos </Link>
                        </li>
                        <li>
                            <Link to="/Mapa"> Mapa Deportivos </Link>
                        </li>
                        <li>
                            <Link to="/LogInPage"> Iniciar sesión </Link>
                        </li>
                        <li>
                            <Link to="/SignInUpPage"> Registrarse </Link>
                        </li>
                    </>
                )}
            </ul>
        </footer>
    );
}