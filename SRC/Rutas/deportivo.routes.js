// Se importa libreria de express router
import { Router } from "express";

// Se llaman los controladores desde parque_controller
import { 

    consulsDeports,
    consulDeport

} from "../Controladores/deportivo.controller.js";

// Constante del router
const router = Router();

// Ruta de consultas de deportivos //
router.get('/deportivos', consulsDeports);
// Ruta de consultas de deportivos individual //
router.get('/deportivos/:id', consulDeport);

// Se exporta el router con las rutas
export default router;