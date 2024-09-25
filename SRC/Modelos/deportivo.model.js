// Se importa mongoose
import mongoose from 'mongoose';

// Esquema de espacios deportivos
const deportivoSchema = mongoose.Schema(
  {
    // Nombre del espacio deportivo
    nombre: {
      type: String,
      required: true,
    },
    // Tipo de espacio deportivo
    tipo: {
      type: String,
      required: true,
    },
    // Dirección del espacio deportivo
    direccion: {
      calle: {
        type: String,
        required: true,
      },
      colonia: {
        type: String,
        required: true,
      },
      alcaldia: {
        type: String,
        required: true,
      },
    },
    // Coordenadas geográficas
    coordenadas: {
      latitud: {
        type: Number,
        required: true,
      },
      longitud: {
        type: Number,
        required: true,
      },
    },
    // Horarios de operación
    horarios: {
      lunes: {
        type: String,
        default: "",
      },
      martes: {
        type: String,
        default: "",
      },
      miercoles: {
        type: String,
        default: "",
      },
      jueves: {
        type: String,
        default: "",
      },
      viernes: {
        type: String,
        default: "",
      },
      sabado: {
        type: String,
        default: "",
      },
      domingo: {
        type: String,
        default: "",
      },
      dias_festivos: {
        type: String,
        default: "",
      },
      dias_especiales: {
        type: String,
        default: "",
      },
    },
    // Servicios disponibles
    servicios: {
      alberca: { type: String, default: "" },
      auditorio: { type: String, default: "" },
      baños: { type: String, default: "" },
      cancha_basquetbol: { type: String, default: "" },
      cancha_beisbol: { type: String, default: "" },
      cancha_futbol: { type: String, default: "" },
      cancha_futbol_americano: { type: String, default: "" },
      cancha_voleibol: { type: String, default: "" },
      comedores: { type: String, default: "" },
      clinica: { type: String, default: "" },
      estacionamiento: { type: String, default: "" },
      estadio: { type: String, default: "" },
      gradas: { type: String, default: "" },
      modulo_vigilancia: { type: String, default: "" },
      pista_atletismo: { type: String, default: "" },
      palapas: { type: String, default: "" },
      regaderas: { type: String, default: "" },
      teatro: { type: String, default: "" },
      wifi: { type: String, default: "" },
    },
    // Información sobre equipos deportivos
    equipos: {
      nombre_equipo: { type: String, default: "" },
      numero_integrantes: { type: String, default: "" },
      deporte: { type: String, default: "" },
      entrenador: { type: String, default: "" },
      patrocinador: { type: String, default: "" },
      horario_entrenamiento: { type: String, default: "" },
    },
    // Costo del uso del espacio deportivo
    costo: {
      type: String,
      default: "",
    },
    // Información de contacto
    contacto: {
      correo: {
        type: String,
        required: true,
      },
      telefono: {
        type: String,
        required: true,
      },
      pagina_web: {
        type: String,
        default: "",
      },
      redes_sociales: {
        type: [String],
        default: [],
      },
    },
    // Opciones de accesibilidad
    accesibilidad: {
      type: [String],
      default: [],
    },
    // Reportes y sugerencias de usuarios
    reportes_sugerencias: {
      type: [String],
      default: [],
    },
    // Información sobre vendedores en el espacio deportivo
    vendedores: {
      nombre_vendedor: { type: String, default: "" },
      horario_vendedor: { type: String, default: "" },
      producto_vendedor: {
        nombre_producto: { type: String, default: "" },
        coste_producto: { type: String, default: "" },
      },
      reportes_vendedor: { type: String, default: "" },
    },
    // URLs de fotos del espacio deportivo
    fotos: {
      type: [String],
      default: [],
    },
  },
  {
    // Agrega automáticamente `createdAt` y `updatedAt`
    timestamps: true,
  }
);

export default mongoose.model('Deportivo', deportivoSchema);
