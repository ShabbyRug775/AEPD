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
    // Ubicación geográfica del espacio deportivo
    ubicacionGeografica: {
      latitud: {
        type: Number,
        required: true,
      },
      longitud: {
        type: Number,
        required: true,
      },
    },
    // Dirección del espacio deportivo
    direccion: {
      type: String,
      required: true,
    },
    // Alcaldía del espacio deportivo
    alcaldia: {
      type: String,
      required: true,
    },
    // Foto principal del espacio deportivo
    fotoPrincipal: {
      type: String,
      default: "",
    },
    // Fotos secundarias del espacio deportivo
    fotosSecundarias: {
      type: [String],
      default: ["", ""],
    },
    // Fecha de registro
    fechaDeRegistro: {
      type: String,
      default: "2024-01-01",
    },
    // Tipo de espacio deportivo
    tipoDeEspacio: {
      type: String,
      required: true,
    },
    // Servicios disponibles
    servicios: {
      baños: { type: Boolean, default: false },
      comercios: { type: Boolean, default: false },
      vigilancia: { type: Boolean, default: false },
    },
    // Número de puertas de entrada
    puertasDeEntrada: {
      type: Number,
      default: 1,
    },
    // Acepta mascotas
    aceptaMascotas: {
      type: Boolean,
      default: false,
    },
    // Horarios de operación
    horario: {
      lunes: {
        type: String,
        default: "",
      },
      martes: {
        type: String,
        default: "",
      },
      miércoles: {
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
      sábado: {
        type: String,
        default: "",
      },
      domingo: {
        type: String,
        default: "",
      },
    },
    // Costo del uso del espacio deportivo
    costo: {
      type: String,
      default: "Gratis",
    },
    // Información sobre las canchas disponibles
    canchas: [
      {
        etiqueta: { type: String, default: "" },
        deporte: { type: String, default: "" },
        medidas: {
          largo: { type: String, default: "" },
          ancho: { type: String, default: "" },
        },
        tipodesuelo: { type: String, default: "" },
        senalamientos: { type: String, default: "" },
        equipamiento: { type: [String], default: [] },
        iluminacion: { type: Boolean, default: false },
        techado: { type: Boolean, default: false },
        gradas: { type: Boolean, default: false },
        baños: { type: Boolean, default: false },
        vestidores: { type: Boolean, default: false },
        ubicacionGeografica: {
          latitud: { type: Number, default: 0 },
          longitud: { type: Number, default: 0 },
        },
      },
    ],
    // Información sobre negocios en el espacio deportivo
    negocios: [
      {
        nombre: { type: String, default: "" },
        dueno: { type: String, default: "" },
        serviciosProductos: { type: [String], default: [] },
        horario: {
          lunesViernes: { type: String, default: "" },
          sabadoDomingo: { type: String, default: "" },
        },
        tipodenegocio: { type: String, default: "" },
        ubicacion: { type: String, default: "" },
        descripcion: { type: String, default: "" },
        fotos: { type: [String], default: [""] },
      },
    ],
    // Información sobre cursos y torneos
    cursosYTorneos: [
      {
        nombre: { type: String, default: "" },
        objetivo: { type: String, default: "" },
        descripcion: { type: String, default: "" },
        modalidad: { type: String, default: "" },
        fechasProgramadas: { type: [String], default: [] },
        numeroDeHoras: { type: Number, default: 0 },
        precio: { type: Number, default: 0 },
        ligaInscripciones: { type: String, default: "" },
        calificacionesUsuarios: { type: Number, default: 0 },
        comentarios: { type: [String], default: [] },
        ubicacionDelCurso: { type: String, default: "" },
        tipoDeReconocimiento: { type: String, default: "" },
        empresaQueLoRespalda: { type: String, default: "" },
        prerrequisitos: { type: [String], default: [] },
        materialEquipamientoRequerido: { type: [String], default: [] },
        conocimientosPreviosONivelDeExperiencia: { type: String, default: "" },
      },
    ],
    // Información sobre partidas y eventos
    partidas: [
      {
        nombre: { type: String, default: "" },
        lugar: { type: String, default: "" },
        fecha: { type: String, default: "" },
        duracion: { type: String, default: "" },
        descripcion: { type: String, default: "" },
        deporte: { type: String, default: "" },
        empresaQueLoRealiza: { type: String, default: "" },
        publicoDirigido: { type: String, default: "" },
        nivelDeExperiencia: { type: String, default: "" },
        detalles: {
          lugarDeReunion: { type: String, default: "" },
          horaDeSalida: { type: String, default: "" },
          transporte: { type: String, default: "" },
          indicaciones: { type: [String], default: [""] },
        },
      },
    ],
  },
  {
    // Agrega automáticamente `createdAt` y `updatedAt`
    timestamps: true,
  }
);

export default mongoose.model('Deportivo', deportivoSchema);
