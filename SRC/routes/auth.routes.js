/*DESC: Engloba todas las rutas relacionadas con autenticacion (login,register etc)*/
//Se importa express para crear un enrutador

import { Router } from 'express';
//Importamos desde auth.routes.js
import { registrar, login, logout, perfil } from '../Controladores/auth.controlador.js';
//IMportamos de Middlewares
import { authRequired } from '../Middlewares/validarToken.js';
//Importamos a validador.js
import { validarEsquema } from '../Middlewares/validador.js';
//Importamos el esquema de validaciones de auth.esquema.js
import { registroEsquema, loginEsquema } from '../Esquemas/auth.esquema.js';

//Se guarda el objeto en router para peticiones post, get, delete etc
const router = Router();
//Post registrar usuario -- compara el esquema enviado con el de registro
router.post('/registrar', validarEsquema(registroEsquema), registrar);
//Post login usuario --- compara el esquema enviado con el de login
router.post('/login', validarEsquema(loginEsquema), login);
//Post logout usuario
router.post('/logout', logout);
//Get Perfil usuario
//Primero valida token antes de pasar al perfil
router.get('/perfil', authRequired, perfil);

export default router;
