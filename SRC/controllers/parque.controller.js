// Controlador para la ruta /mapa
export const mapa = (req, res) => {
   console.log(req.query);
   res.send('Mostrando datos del mapa');
 };
 
 // Controlador para la ruta /infoParque
 export const infoParque = (req, res) => {
  console.log(req.query);
  res.send('Mostrando información del parque');
 };