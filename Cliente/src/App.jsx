//BrowserRouter engloba todo
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Importamos registrar y login de paginas
import RegistrarUs from "./Paginas/RegistrarUs";
import LoginUs from "./Paginas/LoginUs";


//Creamos las rutas en la funcion
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Inicio</h1>} />
        <Route path='/login' element={<LoginUs />} />
        <Route path='/registro' element={<RegistrarUs />} />
        <Route path='/perfil' element={<h1>Perfil</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;