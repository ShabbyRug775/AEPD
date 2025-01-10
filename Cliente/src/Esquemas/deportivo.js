import { z } from "zod";

// Esquema para crear espacios deportivos
export const crearDeportivoSchema = z.object({
  // Nombre del espacio deportivo
  nombre: z.string({
    required_error: "Se requiere un nombre de espacio deportivo",
  }).min(1, "El nombre no puede estar vacío"),
  // Ubicación geográfica del espacio deportivo
  ubicacionGeografica: z.object({
    latitud: z.number().min(-90).max(90, "Latitud debe estar entre -90 y 90"),  // Rango válido de latitud
    longitud: z.number().min(-180).max(180, "Longitud debe estar entre -180 y 180")  // Rango válido de longitud
  }),
  // Dirección del espacio deportivo
  direccion: z.string({
    required_error: "Se requiere una dirección",
  }).min(1, "La dirección no puede estar vacía"),
  // Alcaldia del espacio deportivo
  alcaldia: z.string({
    required_error: "Se requiere una alcaldia",
  }).min(1, "La alcaldía no puede estar vacía"),
  // Foto principal del espacio deportivo
  /*fotoPrincipal: z.string().optional(),
  // Fotos secundarias del espacio deportivo
  fotosSecundarias: z.array(z.string()).optional(),*/
  // Tipo de espacio deportivo (ej: parque, gimnasio, etc.)
  tipoDeEspacio: z.string({
    required_error: "Se requiere un tipo de espacio deportivo",
  }).min(1, "El tipo de espacio no puede estar vacío"),
  // Servicios disponibles en el espacio deportivo
  servicios: z.object({
    baños: z.boolean(),
    comercios: z.boolean(),
    vigilancia: z.boolean()
  }),
  // Número de puertas de entrada
  puertasDeEntrada: z.number(),
  // Si el espacio acepta mascotas
  aceptaMascotas: z.boolean(),
  // Horarios de funcionamiento
  horario: z.object({
    lunes: z.string({
      required_error: "Se requiere un horario para lunes",
    }).min(1, "El horario no puede estar vacío"),
    martes: z.string({
      required_error: "Se requiere un horario para martes",
    }).min(1, "El horario no puede estar vacío"),
    miércoles: z.string({
      required_error: "Se requiere un horario para miércoles",
    }).min(1, "El horario no puede estar vacío"),
    jueves: z.string({
      required_error: "Se requiere un horario para jueves",
    }).min(1, "El horario no puede estar vacío"),
    viernes: z.string({
      required_error: "Se requiere un horario para viernes",
    }).min(1, "El horario no puede estar vacío"),
    sábado: z.string({
      required_error: "Se requiere un horario para sábado",
    }).min(1, "El horario no puede estar vacío"),
    domingo: z.string({
      required_error: "Se requiere un horario para domingo",
    }).min(1, "El horario no puede estar vacío")
  }),
  // Costo del uso del espacio deportivo
  costo: z.string({
    required_error: "Se requiere un costo",
  }).min(1, "El costo no puede estar vacío"),
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
      equipamiento: z.string().optional(),
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
  ).optional()
  // Información sobre los negocios en el espacio deportivo
  /*negocios: z.array(
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
  ).optional(),*/
});
