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

// Ruta de home
import HomePage from "./Paginas/HomePage";
// Ruta de registro de usuario
import SignInUpPage from "./Paginas/SignInUpPage";
// Ruta de LogIn
import { LogInPage } from "./Paginas/LogInPage";
// Ruta para las consultas
import { EspDepPage } from "./Paginas/EspDepPage";
// Ruta Mapa
import { Mapa } from "./Paginas/Mapa";
// Ruta lista de espacios deportivos
import EspDepList from "./Paginas/EspDepList";
//Ruta Perfil Usuario
import { Profile } from './Paginas/Profile';


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