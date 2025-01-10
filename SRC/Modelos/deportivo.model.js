// Se importa mongoose
import mongoose from 'mongoose';

// Esquema de espacios deportivos
const deportivoSchema = mongoose.Schema(
  {
    // Nombre del espacio deportivo
    nombre: {
      type: String,
      required: true
    },
    // Ubicación geográfica del espacio deportivo
    ubicacionGeografica: {
      latitud: {
        type: Number,
        required: true,
        default: 1  // Valor por defecto si no se proporciona
      },
      longitud: {
        type: Number,
        required: true,
        default: 1  // Valor por defecto si no se proporciona
      },
    },    
    // Dirección del espacio deportivo
    direccion: {
      type: String,
      required: true
    },
    // Alcaldía del espacio deportivo
    alcaldia: {
      type: String,
      required: true
    },
    // Foto principal del espacio deportivo
    /*fotoPrincipal: {
      type: String,
      default: "",
    },
    // Fotos secundarias del espacio deportivo
    fotosSecundarias: {
      type: [String],
      default: ["", ""],
    },*/  
    // Tipo de espacio deportivo
    tipoDeEspacio: {
      type: String,
      required: true
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
      default: 1
    },
    // Acepta mascotas
    aceptaMascotas: {
      type: Boolean,
      default: false
    },
    // Horarios de operación
    horario: {
      lunes: {
        type: String,
        default: "06:00 - 20:00",
        required: true
      },
      martes: {
        type: String,
        default: "06:00 - 20:00",
        required: true
      },
      miércoles: {
        type: String,
        default: "06:00 - 20:00",
        required: true
      },
      jueves: {
        type: String,
        default: "06:00 - 20:00",
        required: true
      },
      viernes: {
        type: String,
        default: "06:00 - 20:00",
        required: true
      },
      sábado: {
        type: String,
        default: "06:00 - 20:00",
        required: true
      },
      domingo: {
        type: String,
        default: "06:00 - 20:00",
        required: true
      },
    },
    // Costo del uso del espacio deportivo
    costo: {
      type: String,
      default: "gratuito",
      required: true
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
        equipamiento: { type: String, default: "" },
        iluminacion: { type: Boolean, default: false },
        techado: { type: Boolean, default: false },
        gradas: { type: Boolean, default: false },
        baños: { type: Boolean, default: false },
        vestidores: { type: Boolean, default: false },
        ubicacionGeografica: {
          latitud: { type: Number, default: 1 },
          longitud: { type: Number, default: 1 },
        }
      }
    ]
    // Información sobre negocios en el espacio deportivo
    /*negocios: [
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
    ],*/
  },
  {
    // Agrega automáticamente `createdAt` y `updatedAt`
    timestamps: true,
  }
);

export default mongoose.model('Deportivo', deportivoSchema);
