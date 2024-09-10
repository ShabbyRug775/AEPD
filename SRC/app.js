// Se importan las librerias necesarias
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Se llaman las rutas
import parqueRoutes from "./Rutas/parque.routes.js";
import authRoutes from './Rutas/auth.routes.js';
import { FRONTEND_URL } from "./Configuracion/configuracion.js";

// Constante para llamar express
const app = express();

app.use(

  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })

);

// App ocupa las librerias necesarias
//Morgan primero muestra la peticion, y despues ejecutamos authRoutes
app.use(morgan("dev"));
//Usamos el método json de express para que pueda leer los datos (convertirlos a JSON)
app.use(express.json());
app.use(cookieParser());

// Rutas para los usuarios y para los deportivos
app.use("/Api/usuario", authRoutes);
app.use("/Api", parqueRoutes);

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