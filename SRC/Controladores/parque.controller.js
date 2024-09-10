// Controlador para la ruta /infoParque
export const infoParque = async (req, res) => {

  try {

    const park = await Parque.findById(req.params.id);
    // Si no lo encuentra manda un mensaje de error
    if (!park) return res.status(404).json({ message: "Parque no encontrado." });

    // Manda el articulo encontrado
    return res.json(park);

  } catch (error) {

    // Si ocurre un error lo manda
    return res.status(500).json({ message: error.message });
  }

};