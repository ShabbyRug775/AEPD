//BrowserRouter engloba todo
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Se manda a llamar la Navbar
import { Navbar } from "./Componentes/Navbar";
// Se manda a llamar el contexto de usuario
import { UsuarioProvider } from "./Contexto/usuarioContexto";
// Se manda a llamar el contexto de los articulos
import { ParqueProvider } from "./Contexto/parqueContexto";
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


//Creamos las rutas en la funcion
function App() {
    return (

        <UsuarioProvider>

            <ParqueProvider>

                <BrowserRouter>

                    <main className="container content-container mx-auto px-10 md:px-0">

                        <Navbar />

                        <Routes>

                            <Route path='/' element={<HomePage />} />
                            <Route path='/LogInPage' element={<LogInPage />} />
                            <Route path='/SignInUpPage' element={<SignInUpPage />} />
                            <Route path='/EspDep' element={<EspDepPage />} />

                        </Routes>

                    </main>

                </BrowserRouter>

            </ParqueProvider>

        </UsuarioProvider>

    )
}

// Se exporta App
export default App;