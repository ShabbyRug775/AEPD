/*DESC: Engloba todas las rutas relacionadas con autenticacion (login,register etc)*/
//Se importa express para crear un enrutador

import { Router } from 'express';
//Importamos desde auth.routes.js
import { registrar, login } from '../Controladores/auth.controlador.js';
//Se guarda el objeto en router para peticiones post, get, delete etc
const router = Router();
//
router.post('/registrar', registrar);
router.post('/login', login);

export default router;
