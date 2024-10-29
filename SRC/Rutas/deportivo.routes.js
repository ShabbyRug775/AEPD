// Se importa libreria de express router
import { Router } from "express";

// Se llaman los controladores desde parque_controller
import { 

    consulsDeports,
    consulDeport,
    altaDeport,
    bajaDeport,
    modDeport

} from "../Controladores/deportivo.controller.js";

//Importamos a validador.js
import { validarEsquema } from '../Middlewares/validador.middleware.js';
// Se importa el esquema de iniciar sesion y registro de usuarios
import { crearDeportivoSchema } from "../Esquemas/deportivo.schema.js";

// Constante del router
const router = Router();

// Ruta de consultas de deportivos //
router.get('/deportivos', consulsDeports);
// Ruta de consultas de deportivos individual //
router.get('/deportivos/:id', consulDeport);
// Ruta de alta de deportivo //
router.post('/deportivos', validarEsquema(crearDeportivoSchema), altaDeport);
// Ruta de bajas //
router.delete("/deportivos/:id", bajaDeport);
// Ruta de cambios //
router.put("/deportivos/:id", modDeport);

// Se exporta el router con las rutas
export default router;