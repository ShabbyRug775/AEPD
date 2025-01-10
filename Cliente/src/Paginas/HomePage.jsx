import { Link } from "react-router-dom";
import { usarUsuario } from "../Contexto/usuarioContexto";

function HomePage() {
    const { isAuthenticated, Usuario } = usarUsuario();

    const categorias = [
        {
            titulo: "Espacios Deportivos",
            enlaces: [
                { to: "/deportivos", label: "Deportivos", nivelMinimo: 0 },
            ],
        },
        {
            titulo: "Social",
            enlaces: [
                { to: "/Profile", label: "Perfil", nivelMinimo: 0 },
                { to: "/BuscarUsuarios", label: "Buscar amigos", nivelMinimo: 0 },
                { to: "/SolicitudesAmistad", label: "Ver Solicitudes", nivelMinimo: 0 },
                { to: "/VerAmigos", label: "Ver Amigos", nivelMinimo: 0 },
            ],
        },
        {
            titulo: "Negocios",
            enlaces: [
                { to: "/Negocios", label: "Directorio de Negocios", nivelMinimo: 0 },
            ],
        },
        {
            titulo: "Torneos o Cursos",
            enlaces: [
                { to: "/Torneos", label: "Ver Torneos", nivelMinimo: 0 },
                { to: "/Cursos", label: "Ver Cursos", nivelMinimo: 0 },
                { to: "/CrearTorneo", label: "Crear Torneo", nivelMinimo: 5 },
            ],
        },
    ];

    const renderCategorias = () => {
        if (!isAuthenticated) {
            const categoriaDeportivos = categorias.find(
                (categoria) => categoria.titulo === "Espacios Deportivos"
            );
            return (
                <div className="bg-lime-100 p-5 rounded-lg shadow mb-5">
                    <h2 className="text-2xl font-semibold text-center">
                        {categoriaDeportivos.titulo}
                    </h2>
                    <ul className="lg:flex lg:flex-wrap lg:items-center lg:justify-between py-5">
                        {categoriaDeportivos.enlaces.map((enlace) => (
                            <li
                                className="border border-lime-900 rounded-lg bg-lime-900 text-lime-50 text-xl m-2 p-2 hover:bg-lime-100 hover:text-lime-900"
                                key={enlace.to}
                            >
                                <Link to={enlace.to}>{enlace.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        return (
            <div className="flex flex-wrap w-full lg:w-3/4 mx-auto">
                {categorias.map((categoria) => (
                    <div
                        key={categoria.titulo}
                        className="bg-lime-100 p-5 rounded-lg shadow flex-grow lg:w-1/4 m-2"
                    >
                        <h2 className="text-2xl font-semibold text-center">{categoria.titulo}</h2>
                        <ul className="flex flex-col items-center py-5 space-y-2">
                            {categoria.enlaces
                                .filter((enlace) => Usuario.nivelPermiso >= enlace.nivelMinimo)
                                .map((enlace) => (
                                    <li
                                        className="border border-lime-900 rounded-lg bg-lime-900 text-lime-50 text-xl m-2 p-2 hover:bg-lime-100 hover:text-lime-900 w-full text-center"
                                        key={enlace.to}
                                    >
                                        <Link to={enlace.to}>{enlace.label}</Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-lime-50 p-10 mt-20">
            <h1 className="text-3xl py-2 font-bold tracking-tight ">
                <span className="text-lime-900 text-5xl flex">Espacios Deportivos</span> de la Ciudad de México
            </h1>

            <section className="mt-5">{renderCategorias()}</section>

            <div className="text-lg text-justify text-white-400 py-1">
                <p className="py-5">
                    La Secretaría de Seguridad de la Ciudad de México está comprometida en recuperar y mantener los parques públicos como espacios seguros y accesibles para toda la comunidad. Desde el inicio del proyecto, hemos recuperado más de 100 parques, mejorando la seguridad y ofreciendo una variedad de actividades recreativas y culturales para que las familias disfruten. Esta recuperación no solo mejora la calidad de vida, sino que también fomenta la convivencia.
                </p>
                <p className="py-5">
                    Este sitio ha sido desarrollado por la Dirección General de Servicios Urbanos y Sustentabilidad, específicamente para la Coordinación de Áreas Verdes y Espacios Públicos. Su objetivo es satisfacer las necesidades de las personas que buscan lugares para realizar actividades físicas, organizar partidos deportivos y permitir que los clubes deportivos gestionen eventos. Además, proporciona un espacio para que los negocios promocionen sus productos a los interesados. ¡Explora y disfruta de nuestros espacios!
                </p>
            </div>
        </div>
    );
}

export default HomePage;
