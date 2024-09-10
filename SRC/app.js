// Se importan las librerias necesarias
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import parqueRoutes from "./routes/parque.routes.js";
import authRoutes from './routes/auth.routes.js';

// Se llaman las rutas
import { FRONTEND_URL } from "./Configuracion/configuracion.js";

// Constante para llamar express
const app = express();
/*
app.use(

  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })

);
*/
// App ocupa las librerias necesarias
app.use(cors());
app.use(morgan("dev"));
//Usamos el método json de express para que pueda leer los datos (convertirlos a JSON)
app.use(express.json());
app.use(cookieParser());
//Morgan primero muestra la peticion, y despues ejecutamos authRoutes
app.use("/sys", authRoutes);

// Rutas para los usuarios y para los deportivos
app.use("/api",parqueRoutes);


// Se llama al cliente
const path = await import("path");
app.use(express.static("Cliente/dist"));

// Se llama al index del cliente
app.get("*", (req, res) => {
  console.log(path.resolve("Cliente", "dist", "index.html"));
  res.sendFile(path.resolve("Cliente", "dist", "index.html"));
});

// Se exporta el app
export default app;