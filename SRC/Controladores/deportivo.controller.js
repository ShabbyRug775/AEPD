// Se importan las librerías
import Deportivo from "../Modelos/deportivo.model.js";

// Consulta de deportivos
export const consulsDeports = async (req, res) => {
  try {

    // Lógica para consultar los deportivos
    const deport = await Deportivo.find();  // Llamada a base de datos u otra lógica
    return res.status(200).json(deport);    // Respuesta correcta

  } catch (error) {

    // Imprime el error en la consola del servidor
    console.error('Error al obtener los deportivos:', error);

    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Consulta individual de deportivos
export const consulDeport = async (req, res) => {

  try {

    // Lógica para consultar los deportivos
    const deport = await Deportivo.findById(req.params.id); // Llamada a base de datos por ID
    // Si no lo encuentra manda un mensaje de error
    if (!deport) return res.status(404).json({ message: "Deportivo no encontrado." });

    // Manda el deportivo encontrado
    return res.json(deport);

  } catch (error) {

    // Si ocurre un error lo manda
    return res.status(500).json({ message: error.message });
  }

};

// Altas de deportivos
export const altaDeport = async (req, res) => {
  try {
    // Constantes para guardar los datos del deportivo
    const { nombre, ubicacionGeografica, direccion, alcaldia,
      tipoDeEspacio, servicios, puertasDeEntrada, aceptaMascotas,
      horario, costo, canchas } = req.body;

    // Creación de nuevo deportivo con los campos básicos y arrays vacíos 
    // para canchas, negocios, cursos y torneos, y partidas
    const nuevoDep = new Deportivo({
      nombre,
      ubicacionGeografica,
      direccion,
      alcaldia,
      fotoPrincipal: [], // Array vacío
      fotosSecundarias: [], // Array vacío
      tipoDeEspacio,
      servicios,
      puertasDeEntrada,
      aceptaMascotas,
      horario,
      costo,
      canchas,
      negocios: [], // Array vacío
      cursosYTorneos: [], // Array vacío
      partidas: [] // Array vacío
    });

    // Guarda el nuevo deportivo
    await nuevoDep.save();

    // Responde con el nuevo deportivo creado
    res.json(nuevoDep);

  } catch (error) {
    // Si ocurre un error, responde con el mensaje de error
    return res.status(500).json({ message: error.message });
  }
};


// Bajas de deportivos
export const bajaDeport = async (req, res) => {

  try {

    // Constante para buscar el deportivo y borrarlo
    const borrarDep = await Deportivo.findByIdAndDelete(req.params.id);

    // Si no se encuentra el deportivo manda un mensaje de error
    if (!borrarDep) return res.status(404).json({ message: "Deportivo no encontrado." });

    // Manda el estatus de la petición
    return res.sendStatus(204);

  } catch (error) {

    // Si ocurre un error lo manda
    return res.status(500).json({ message: error.message });
  }

};

// Cambios de deportivos
export const modDeport = async (req, res) => {

  try {
    // Constantes para actualizar el deportivo
    const { nombre, ubicacionGeografica, direccion, alcaldia, 
      tipoDeEspacio, servicios, puertasDeEntrada, aceptaMascotas, 
      horario, costo, canchas } = req.body;

    // Busca y actualiza el deportivo
    const modDep = await Deportivo.findOneAndUpdate(
      { _id: req.params.id },
      {
        nombre,
        ubicacionGeografica,
        direccion,
        alcaldia,
        tipoDeEspacio,
        servicios,
        puertasDeEntrada,
        aceptaMascotas,
        horario,
        costo,
        canchas,
        negocios: [], // Array vacío
        cursosYTorneos: [], // Array vacío
        partidas: [] // Array vacío
      },
      { new: true }
    );

    // Manda el deportivo modificado
    return res.json(modDep);

  } catch (error) {
    // Si ocurre un error lo manda
    return res.status(500).json({ message: error.message });
  }

};