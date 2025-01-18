import { Link } from "react-router-dom";
import { usarUsuario } from "../Contexto/usuarioContexto";

export function Footer() {
    const { isAuthenticated, Usuario } = usarUsuario();

    return (
        <footer className="bg-lime-950 py-5 px-10 text-lime-50 w-full bottom-0 left-0">
            <ul className="flex flex-col md:flex-row gap-x-2 justify-center items-center">
                {isAuthenticated ? (
                    <>
                        <li className="hover:text-lime-200 hover:font-semibold">
                            <Link to="/HomePage"> Inicio </Link>
                        </li>
                        <li className="hover:text-lime-200 hover:font-semibold">
                            <Link to="/deportivos"> Deportivos </Link>
                        </li>
                        {/* Agregar nivel necesario para que el usuario visuzalice esa página de acuerdo con su nivel de usauario */}
                        {Usuario.nivelPermiso >= 0 && (
                            <>
                                <li className="hover:text-lime-200 hover:font-semibold">
                                    <Link to="/Profile"> Perfil </Link>
                                </li>
                                <li className="hover:text-lime-200 hover:font-semibold">
                                    <Link to="/BuscarUsuarios"> Buscar amigos </Link>
                                </li>
                                <li className="hover:text-lime-200 hover:font-semibold">
                                    <Link to="/SolicitudesAmistad"> Ver Solicitudes </Link>
                                </li>
                                <li className="hover:text-lime-200 hover:font-semibold">
                                    <Link to="/VerAmigos"> Ver Amigos </Link>
                                </li>
                            </>
                        )}
                        {Usuario.nivelPermiso == 5 && (
                            <>
                                <li className="hover:text-lime-200 hover:font-semibold">
                                    <Link to="/EspDepAdd"> Agregar espacios deportivos </Link>
                                </li>
                                <li className="hover:text-lime-200 hover:font-semibold">
                                    <Link to="/RegistrarRep"> Registrar Representante </Link>
                                </li>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <li className="hover:text-lime-200 hover:font-semibold">
                            <Link to="/HomePage"> Inicio </Link>
                        </li>
                        <li className="hover:text-lime-200 hover:font-semibold">
                            <Link to="/deportivos"> Deportivos </Link>
                        </li>
                        <li className="hover:text-lime-200 hover:font-semibold">
                            <Link to="/LogInPage"> Iniciar sesión </Link>
                        </li>
                        <li className="hover:text-lime-200 hover:font-semibold">
                            <Link to="/SignInUpPage"> Registrarse </Link>
                        </li>
                    </>
                )}
            </ul>
        </footer>
    );
}
