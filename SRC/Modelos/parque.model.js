// Se importa mongoose
import mongoose from 'mongoose';

// Esquema de parques deportivos
const parqueSchema = mongoose.Schema(
   {
      nombre: {
         type: String,
         required: true
      },
      latitud: {
         type: Number,
         required: true
      },
      longitud: {
         type: Number,
         required: true
      },
      descripcion: {
         type: String,
         required: true
      },
      actividades: {
         type: String
      },
      horario: {
         type: String,
         required: true
      },
      delegacion: {
         type: String,
         required: true
      },
      url: {
         type: String
      },
      metro: {
         type: String
      }
   }
);

export default mongoose.model('Parque', parqueSchema)