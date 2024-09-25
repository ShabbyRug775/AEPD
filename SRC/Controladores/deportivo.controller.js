// Controlador para la ruta /infoParque
export const consulsDeporRequest = async (req, res) => {

  try {

    const sports = await Deportivo.findById(req.params.id);
    // Si no lo encuentra manda un mensaje de error
    if (!sports) return res.status(404).json({ message: "Deportivo no encontrado." });

    // Manda el articulo encontrado
    return res.json(sports);

  } catch (error) {

    // Si ocurre un error lo manda
    return res.status(500).json({ message: error.message });
  }

};