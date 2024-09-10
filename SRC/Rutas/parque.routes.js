// Se importa libreria de express router
import { Router } from "express";

// Se llaman los controladores desde parque_controller
import { 

    consulsParksRequest

} from "../Controladores/parque.controller.js";

// Constante del router
const router = Router();

// Ruta de consultas de parque //
router.get('/consulsParksRequest', consulsParksRequest);

// Se exporta el router con las rutas
export default router;