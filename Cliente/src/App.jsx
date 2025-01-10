//BrowserRouter engloba todo
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Se manda a llamar la Navbar
import { Navbar } from "./Componentes/Navbar";
// Se manda a llamar el footer
import { Footer } from "./Componentes/Footer";
// Se manda a llamar el contexto de usuario
import { UsuarioProvider } from "./Contexto/usuarioContexto";
// Se manda a llamar el contexto de los articulos
import { DeportivoProvider } from "./Contexto/deportivoContexto";
// Ruta protegida
import { RutaProtegida } from "./Rutas/Rutas";

// Ruta de home (página principal)
import HomePage from "./Paginas/HomePage";

/*** Rutas para usuarios ***/
// Ruta de registro de usuario
import SignInUpPage from "./Paginas/SignInUpPage";
// Ruta de LogIn de usuario
import { LogInPage } from "./Paginas/LogInPage";
//Ruta Perfil Usuario
import { Profile } from './Paginas/Profile';
//Ruta Buscar Usuario
import { BuscarUsuarios } from './Paginas/BuscarUsuarios';
//Ruta Ver solicitudes de Amigos
import { SolicitudesAmistad } from './Paginas/SolicitudesAmistad';
//Ruta Ver Amigos
import { VerAmigos } from './Paginas/VerAmigos';

/*** Rutas para espacios deportivos ***/
// Ruta para las consultas de espacios deportivos
import { EspDepPage } from "./Paginas/EspDepPage";
// Ruta para actualizar o eliminar espacio deportivo
import { EspDepUpdate } from "./Paginas/EspDepUpdate";
// Ruta para añadir espacio deportivo
import EspDepAdd from "./Paginas/EspDepAdd";
// Ruta Mapa de espacio deportivo
import { Mapa } from "./Paginas/Mapa";
// Ruta lista de espacios deportivos (hay que quitarlo a futuro)
import EspDepList from "./Paginas/EspDepList"; // Recordatorio de verificar si funciona


//Creamos las rutas en la funcion
function App() {
    return (
        <>
            <DeportivoProvider>
                <UsuarioProvider>
                    <BrowserRouter>
                        <main className="container content-container mx-auto px-10 md:px-0 flex-1">
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/HomePage" element={<HomePage />} />
                                <Route path="/LogInPage" element={<LogInPage />} />
                                <Route path="/SignInUpPage" element={<SignInUpPage />} />
                                <Route path="/deportivos" element={<EspDepPage />} />
                                <Route path="/Mapa" element={<Mapa />} />
                                <Route path="/deportivos/:id" element={<Mapa />} />
                                <Route path="/EspDepList" element={<EspDepList />} />
                                <Route element={<RutaProtegida />}>
                                    <Route path="/Profile" element={<Profile />} />
                                    <Route path="/EspDepUpdate/:id" element={<EspDepUpdate />} />
                                    <Route path="/BuscarUsuarios" element={<BuscarUsuarios />} />
                                    <Route path="/EspDepAdd" element={<EspDepAdd />} />
                                    <Route path='/SolicitudesAmistad' element={<SolicitudesAmistad />} />
                                    <Route path='/VerAmigos' element={<VerAmigos />} />
                                </Route>
                            </Routes>
                            <Footer />
                        </main>
                    </BrowserRouter>
                </UsuarioProvider>
            </DeportivoProvider>
        </>
    );
}


// Se exporta App
export default App;