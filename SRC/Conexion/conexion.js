// libreria de mongoose y la URL de la base de datos
import mongoose from "mongoose";
import { MONGODB_URI } from "../Configuracion/configuracion.js";

// Se exporta la conexion con la base
export const connectDB = async () => {

    try {
        // conexion con la ruta de mongoDB
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB se ha conectado");

    } catch (error) {
        console.error(error);
    }
  
};