/*DESC: Engloba todas las rutas relacionadas con autenticacion (login,register etc)*/
//Se importa express para crear un enrutador

import { Router } from 'express';
//Importamos desde auth.routes.js
import {

    SignInUp,
    LogIn,
    LogOut,
    verifyToken,
    Profile
    /*
    SendFriendRequest 
    UpdateProfile,
    DeleteProfile*/

} from '../Controladores/auth.controller.js';

//Importamos de Middlewares
//import { authRequired } from '../Middlewares/auth.middleware.js';
//Importamos a validador.js
import { validarEsquema } from '../Middlewares/validador.middleware.js';
//Importamos el esquema de validaciones de auth.esquema.js
import { SignInUpEsquema, LogInEsquema } from '../Esquemas/auth.schema.js';
//Importamos middleware para permisos de usuario
import { Usuario } from '../Middlewares/auth.middleware.js';
//Importamos controlador para búsqueda de usuarios
import { consulsUsuarios } from '../Controladores/auth.controller.js';

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
router.get('/Profile', Usuario, Profile); //Primero valida sesion antes de pasar al perfil
//Get Usuarios en la app
router.get('/Usuarios', Usuario, consulsUsuarios);//Para buscar usuarios en la aplicación primero verifica que tenga sesión iniciada
/*Update Perfil usuario
router.put('/Profile', verifyToken, UpdateProfile);
//Delete Perfil usuario
router.delete('/Profile', verifyToken, DeleteProfile); 
//Post sol de amistad
router.post('/SendFriendRequest', verifyToken, authRequired(0), SendFriendRequest); */

export default router;
