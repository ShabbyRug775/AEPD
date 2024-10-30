import { z } from "zod";

// Esquema para crear espacios deportivos
export const crearDeportivoSchema = z.object({
  // Nombre del espacio deportivo
  nombre: z.string({
    required_error: "Se requiere un nombre de espacio deportivo",
  }),
  // Ubicación geográfica del espacio deportivo
  ubicacionGeografica: z.object({
    latitud: z.number(),
    longitud: z.number()
  }),
  // Dirección del espacio deportivo
  direccion: z.string({
    required_error: "Se requiere una dirección",
  }),
  // Alcaldia del espacio deportivo
  alcaldia: z.string({
    required_error: "Se requiere una alcaldia",
  }),
  // Foto principal del espacio deportivo
  fotoPrincipal: z.string().optional(),
  // Fotos secundarias del espacio deportivo
  fotosSecundarias: z.array(z.string()).optional(),
  // Fecha de registro
  fechaDeRegistro: z.string({
    required_error: "Se requiere una fecha de registro",
  }),
  // Tipo de espacio deportivo (ej: parque, gimnasio, etc.)
  tipoDeEspacio: z.string({
    required_error: "Se requiere un tipo de espacio deportivo",
  }),
  // Servicios disponibles en el espacio deportivo
  servicios: z.object({
    baños: z.boolean(),
    comercios: z.boolean(),
    vigilancia: z.boolean(),
  }),
  // Número de puertas de entrada
  puertasDeEntrada: z.number(),
  // Si el espacio acepta mascotas
  aceptaMascotas: z.boolean(),
  // Horarios de funcionamiento
  horario: z.object({
    lunes: z.string({
      required_error: "Se requiere un horario para lunes",
    }),
    martes: z.string({
      required_error: "Se requiere un horario para martes",
    }),
    miércoles: z.string({
      required_error: "Se requiere un horario para miércoles",
    }),
    jueves: z.string({
      required_error: "Se requiere un horario para jueves",
    }),
    viernes: z.string({
      required_error: "Se requiere un horario para viernes",
    }),
    sábado: z.string({
      required_error: "Se requiere un horario para sábado",
    }),
    domingo: z.string({
      required_error: "Se requiere un horario para domingo",
    }),
  }),

  // Costo del uso del espacio deportivo
  costo: z.string(),
  // Información de las canchas
  canchas: z.array(
    z.object({
      etiqueta: z.string().optional(),
      deporte: z.string().optional(),
      medidas: z.object({
        largo: z.string().optional(),
        ancho: z.string().optional(),
      }).optional(),
      tipodesuelo: z.string().optional(),
      senalamientos: z.string().optional(),
      equipamiento: z.array(z.string()).optional(),
      iluminacion: z.boolean().optional(),
      techado: z.boolean().optional(),
      gradas: z.boolean().optional(),
      baños: z.boolean().optional(),
      vestidores: z.boolean().optional(),
      ubicacionGeografica: z.object({
        latitud: z.number().optional(),
        longitud: z.number().optional(),
      }).optional(),
    })
  ).optional(),
  // Información sobre los negocios en el espacio deportivo
  negocios: z.array(
    z.object({
      nombre: z.string().optional(),
      dueno: z.string().optional(),
      serviciosProductos: z.array(z.string()).optional(),
      horario: z.object({
        lunesViernes: z.string().optional(),
        sabadoDomingo: z.string().optional(),
      }).optional(),
      tipodenegocio: z.string().optional(),
      ubicacion: z.string().optional(),
      descripcion: z.string().optional(),
      fotos: z.array(z.string()).optional(),
    })
  ).optional(),
  // Información sobre cursos y torneos
  cursosYTorneos: z.array(
    z.object({
      nombre: z.string().optional(),
      objetivo: z.string().optional(),
      descripcion: z.string().optional(),
      modalidad: z.string().optional(),
      fechasProgramadas: z.array(z.string()).optional(),
      numeroDeHoras: z.number().optional(),
      precio: z.number().optional(),
      ligaInscripciones: z.string().optional(),
      calificacionesUsuarios: z.number().optional(),
      comentarios: z.array(z.string()).optional(),
      ubicacionDelCurso: z.string().optional(),
      tipoDeReconocimiento: z.string().optional(),
      empresaQueLoRespalda: z.string().optional(),
      prerrequisitos: z.array(z.string()).optional(),
      materialEquipamientoRequerido: z.array(z.string()).optional(),
      conocimientosPreviosONivelDeExperiencia: z.string().optional(),
    })
  ).optional(),
  // Información sobre partidas y eventos deportivos
  partidas: z.array(
    z.object({
      nombre: z.string().optional(),
      lugar: z.string().optional(),
      fecha: z.string().optional(),
      duracion: z.string().optional(),
      descripcion: z.string().optional(),
      deporte: z.string().optional(),
      empresaQueLoRealiza: z.string().optional(),
      publicoDirigido: z.string().optional(),
      nivelDeExperiencia: z.string().optional(),
      detalles: z.object({
        lugarDeReunion: z.string().optional(),
        horaDeSalida: z.string().optional(),
        transporte: z.string().optional(),
        indicaciones: z.array(z.string()).optional(),
      }).optional(),
    })
  ).optional(),
});
