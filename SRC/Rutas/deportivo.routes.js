// Se importa libreria de express router
import { Router } from "express";

// Se llaman los controladores desde parque_controller
import { 

    consulsDeporRequest

} from "../Controladores/deportivo.controller.js";

// Constante del router
const router = Router();

// Ruta de consultas de parque //
router.get('/consulsDeporRequest', consulsDeporRequest);

// Se exporta el router con las rutas
export default router;