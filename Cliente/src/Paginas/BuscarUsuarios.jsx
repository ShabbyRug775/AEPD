import { useEffect, useState } from "react";
import { usarUsuario } from "../Contexto/usuarioContexto";
import { UsuarioCard } from "../Componentes/usuarios/UsuariosCard";
import { ImFileEmpty } from "react-icons/im";
import { Input, Select, Checkbox } from "../Componentes/UI";
import { consulsUsuariosRequest } from "../Api/usuario";

export function BuscarUsuarios() {

    const [usuarios, setUsuarios] = useState(null);

    useEffect(() => {
        async function consulsUsuarios() {
            try {
                const res = await consulsUsuariosRequest();
                setUsuarios(res.data);
            } catch (error) {
                console.log("Error al cargar usuarios:", error);
            }
        }
        consulsUsuarios();
    }, []);

    //Filtrado de usuarios
    const [filters, setFilters] = useState({
        nombreusuario: "",
        username: "",
        email: "",
    });

    //Estado para los Usuarios filtrados
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // 10 elementos por página

    useEffect(() => {
        // Ajustar el número de elementos por página según el tamaño de la ventana
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 768) {
                setItemsPerPage(10);
            } else {
                setItemsPerPage(2);
            }
        };

        updateItemsPerPage(); // Llamar a la función al montar el componente
        window.addEventListener('resize', updateItemsPerPage); // Añadir listener para cambios en el tamaño de la ventana

        return () => {
            window.removeEventListener('resize', updateItemsPerPage); // Limpiar el listener al desmontar
        };
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let results = usuarios; // Asegúrate de que esto sea un array
    
            console.log('Usuario:', usuarios); // Verifica qué contiene Usuario
    
            if (!Array.isArray(results)) {
                results = []; // Asegúrate de que results sea un array
            }
    
            // Filtrado por nombre usuario
            if (filters.nombreusuario) {
                results = results.filter(usuarios =>
                    usuarios.nombreusuario.toLowerCase().includes(filters.nombreusuario.toLowerCase())
                );
            }
    
            if (filters.username) {
                results = results.filter(usuarios =>
                    usuarios.username.toLowerCase().includes(filters.username.toLowerCase())
                );
            }
    
            if (filters.email) {
                results = results.filter(usuarios =>
                    usuarios.email.toLowerCase().includes(filters.email.toLowerCase())
                );
            }
    
            setFilteredUsuarios(results);
            setCurrentPage(1); // Reiniciar a la primera página al filtrar
        };
    
        applyFilters();
    }, [filters, usuarios]);
    

    // Calcular los índices de los elementos a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsuarios.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);

    return (
        <div className="bg-lime-50 p-10 mt-20">
            <div className="mb-5">
                <h2 className="text-xl font-bold text-lime-900">Filtrar Usuarios por nombre</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <Input
                        type="text"
                        placeholder="Nombre"
                        value={filters.nombreusuario}
                        onChange={(e) => setFilters({ ...filters, nombreusuario: e.target.value })}
                        className="border border-lime-500 p-2 rounded-md bg-lime-100"
                    />

                </div>
            </div>

            {filteredUsuarios.length === 0 && (
                <div className="flex justify-center items-center p-10">
                    <div>
                        <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
                        <h1 className="font-bold text-xl">
                            No hay Usuarios
                        </h1>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
                {currentItems.map((usuarios) => (
                    <UsuarioCard usuarios={usuarios} key={usuarios._id} />
                ))}
            </div>

            {/* Controles de Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-5">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mx-1 px-3 py-1 bg-lime-900 text-white rounded-md disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-lime-700 text-white' : 'bg-lime-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="mx-1 px-3 py-1 bg-lime-900 text-white rounded-md disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}