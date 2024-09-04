// Se importan los archivos necesarios
import app from "./app.js";
import { PORT } from "./Configuracion/configuracion.js";
import { connectDB } from "./Conexion/conexion.js";


// Servidor inicializado en el puerto
async function main() {
    
    try {
        await connectDB();
        app.listen(PORT);
        console.log(`Servidor inicializado en el puerto http://localhost:${PORT}`);
    } catch (error) {
        console.error(error);
    }

}
  
main();