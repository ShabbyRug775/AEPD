/*DESC: Engloba todas las rutas relacionadas con autenticacion (login,register etc)*/
//Se importa express para crear un enrutador

import { Router } from 'express';
//Importamos desde auth.routes.js
import { 

    registrar, 
    login, 
    logout, 
    perfil,
    verifyToken

} from '../Controladores/auth.controlador.js';

//Importamos de Middlewares
//import { authRequired } from '../Middlewares/auth.middleware.js';
//Importamos a validador.js
import { validarEsquema } from '../Middlewares/validador.middleware.js';
//Importamos el esquema de validaciones de auth.esquema.js
import { registroEsquema, loginEsquema } from '../Esquemas/auth.schema.js';

//Se guarda el objeto en router para peticiones post, get, delete etc
const router = Router();
//Post registrar usuario -- compara el esquema enviado con el de registro
router.post('/registrar', validarEsquema(registroEsquema), registrar);
//Post login usuario --- compara el esquema enviado con el de login
router.post('/login', validarEsquema(loginEsquema), login);
// Ruta para verificar el token //
router.get("/verifyToken", verifyToken);
//Post logout usuario
router.post('/logout', verifyToken, logout);
//Get Perfil usuario
//Primero valida token antes de pasar al perfil
//router.get('/perfil', authRequired, perfil);

export default router;
