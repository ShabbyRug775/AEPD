// Se importan las librerías
import Deportivo from "../Modelos/deportivo.model.js";

// Consulta de deportivoss
export const consulsDeports = async (req, res) => {
  try {

    // Lógica para consultar los deportes
    const deportes = await Deportivo.find(); // Llamada a base de datos u otra lógica
    return res.status(200).json(deportes);    // Respuesta correcta

  } catch (error) {

    // Imprime el error en la consola del servidor
    console.error('Error al obtener los deportivos:', error);

    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};



// Consulta individual de deportivos
export const consulDeport = async (req, res) => {

  try {

    const sports = await Deportivo.findById(req.params.id);
    // Si no lo encuentra manda un mensaje de error
    if (!sports) return res.status(404).json({ message: "Deportivo no encontrado." });

    // Manda el deportivo encontrado
    return res.json(sports);

  } catch (error) {

    // Si ocurre un error lo manda
    return res.status(500).json({ message: error.message });
  }

};