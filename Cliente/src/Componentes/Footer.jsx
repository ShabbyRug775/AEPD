import { Link } from "react-router-dom";
import { usarUsuario } from "../Contexto/usuarioContexto";

export function Footer() {
    const { isAuthenticated, Usuario } = usarUsuario();

    return (
        <footer className="bg-lime-950 py-5 px-10 text-lime-50 w-full bottom-0 left-0">
            <ul className="flex flex-col md:flex-row gap-x-2 justify-center items-center">
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/HomePage"> Inicio </Link>
                        </li>
                        <li>
                            <Link to="/deportivos"> Deportivos </Link>
                        </li>
                        {/* Agregar nivel necesario para que el usuario visuzalice esa página de acuerdo con su nivel de usauario */}
                        {Usuario.nivelPermiso >= 0 && (
                            <li>
                                <Link to="/Profile"> Perfil </Link>
                            </li>
                        )}
                        {Usuario.nivelPermiso >= 0 && (
                            <li>
                                <Link to="/BuscarUsuarios"> Buscar amigos </Link>
                            </li>
                        )}
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/HomePage"> Inicio </Link>
                        </li>
                        <li>
                            <Link to="/deportivos"> Deportivos </Link>
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
