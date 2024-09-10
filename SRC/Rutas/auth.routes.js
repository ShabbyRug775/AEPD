/*DESC: Engloba todas las rutas relacionadas con autenticacion (login,register etc)*/
//Se importa express para crear un enrutador

import { Router } from 'express';
//Importamos desde auth.routes.js
import { 

    SignInUp, 
    LogIn, 
    LogOut, 
    verifyToken

} from '../Controladores/auth.controller.js';

//Importamos de Middlewares
//import { authRequired } from '../Middlewares/auth.middleware.js';
//Importamos a validador.js
import { validarEsquema } from '../Middlewares/validador.middleware.js';
//Importamos el esquema de validaciones de auth.esquema.js
import { SignInUpEsquema, LogInEsquema } from '../Esquemas/auth.schema.js';

//Se guarda el objeto en router para peticiones post, get, delete etc
const router = Router();
//Post registrar usuario -- compara el esquema enviado con el de registro
router.post('/SignInUp', validarEsquema(SignInUpEsquema), SignInUp);
//Post login usuario --- compara el esquema enviado con el de login
router.post('/LogIn', validarEsquema(LogInEsquema), LogIn);
// Ruta para verificar el token //
router.get("/verifyToken", verifyToken);
//Post logout usuario
router.post('/LogOut', verifyToken, LogOut);
//Get Perfil usuario
//Primero valida token antes de pasar al perfil
//router.get('/perfil', authRequired, perfil);

export default router;
