// Se importa libreria de express router
import { Router } from "express";

// Se llaman los controladores desde parque_controller
import { 

    infoParque

} from "../Controladores/parque.controller.js";

// Constante del router
const router = Router();

// Ruta de consultas de parque //
router.get('/infoParque', infoParque);

// Se exporta el router con las rutas
export default router;