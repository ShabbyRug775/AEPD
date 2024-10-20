import { Link } from "react-router-dom";
import { usarUsuario } from "../Contexto/usuarioContexto";
import { ButtonLink } from "./UI/ButtonLink";
import { useState, useEffect, useRef } from "react";
import { Bars3Icon } from '@heroicons/react/24/solid';

export function Navbar() {
  const { isAuthenticated, LogOut, Usuario } = usarUsuario();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Referencia para el menú desplegable

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Función para manejar clics fuera del menú
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Añadir el event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-lime-900 flex justify-between py-5 px-10 text-lime-50 w-full fixed top-0 left-0 ">
      <h1 className="text-2xl font-bold text-lime-100">
        <Link to="/"> Espacios Deportivos </Link>
      </h1>

      <div className="relative" ref={dropdownRef}>
        <button
          className="bg-lime-400 text-lime-950 p-2 rounded-md md:hidden"
          onClick={toggleDropdown}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        <ul className={`md:hidden ${isDropdownOpen ? "block" : "hidden"} absolute right-0 mt-2 bg-lime-800 bg-opacity-70 p-2 rounded-md`}>
          {isAuthenticated ? (
            <>
              <li>
                Bienvenido {Usuario.nombreusuario}
              </li>
              <li>
                <ButtonLink to="/deportivos"> Deportivos </ButtonLink>
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
                <ButtonLink to="/deportivos"> Deportivos </ButtonLink>
              </li>
              <li>
                <ButtonLink to="/LogInPage"> Iniciar sesión </ButtonLink>
              </li>
              <li>
                <ButtonLink to="/SignInUpPage"> Registrarse </ButtonLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <ul className="hidden md:flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido {Usuario.nombreusuario}
            </li>
            <li>
              <ButtonLink to="/deportivos"> Deportivos </ButtonLink>
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
              <ButtonLink to="/deportivos"> Deportivos </ButtonLink>
            </li>
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
