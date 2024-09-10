import { Router } from "express";
import { mapa, infoParque } from "../controllers/auth.controller.js";

const router = Router()

router.get('/mapa', mapa);
router.get('/infoParque', infoParque);

export default router