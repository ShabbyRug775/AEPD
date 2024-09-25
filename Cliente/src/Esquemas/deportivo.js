import { z } from "zod";

// Esquema para crear espacios deportivos
export const crearDeportivoSchema = z.object({
  // Lista de espacios deportivos (puede haber más de uno)
  espacios_deportivos: z.array(
    z.object({
      // Nombre del espacio deportivo
      nombre: z.string({
        required_error: "Se requiere un nombre de espacio deportivo",
      }),
      // Tipo de espacio deportivo (ej: parque, gimnasio, etc.)
      tipo: z.string({
        required_error: "Se requiere un tipo de espacio deportivo",
      }),
      // Dirección del espacio deportivo
      direccion: z.object({
        // Calle donde se ubica
        calle: z.string({
          required_error: "Se requiere una calle",
        }),
        // Colonia del espacio deportivo
        colonia: z.string({
          required_error: "Se requiere una colonia",
        }),
        // Alcaldía o municipio donde se ubica
        alcaldia: z.string({
          required_error: "Se requiere una alcaldía",
        }),
      }),
      // Coordenadas del espacio deportivo
      coordenadas: z.object({
        // Latitud en coordenadas geográficas
        latitud: z.number({
          required_error: "Se requiere una latitud",
        }),
        // Longitud en coordenadas geográficas
        longitud: z.number({
          required_error: "Se requiere una longitud",
        }),
      }),
      // Horarios de funcionamiento
      horarios: z.object({
        // Horarios por día de la semana
        lunes: z.string(),
        martes: z.string(),
        miercoles: z.string(),
        jueves: z.string(),
        viernes: z.string(),
        sabado: z.string(),
        domingo: z.string(),
        // Horarios en días festivos
        dias_festivos: z.string(),
        // Horarios en días especiales
        dias_especiales: z.string(),
      }),
      // Servicios disponibles en el espacio deportivo
      servicios: z.object({
        alberca: z.string(),                                // Si hay alberca
        auditorio: z.string(),                              // Si hay auditorio
        baños: z.string(),                                  // Si hay baños
        cancha_basquetbol: z.string(),                      // Si hay cancha de básquetbol
        cancha_beisbol: z.string(),                         // Si hay cancha de béisbol
        cancha_futbol: z.string(),                          // Si hay cancha de fútbol
        cancha_futbol_americano: z.string(),                // Si hay cancha de fútbol americano
        cancha_voleibol: z.string(),                        // Si hay cancha de voleibol
        comedores: z.string(),                              // Si hay comedores
        clinica: z.string(),                                // Si hay clínica
        estacionamiento: z.string(),                        // Si hay estacionamiento
        estadio: z.string(),                                // Si hay estadio
        gradas: z.string(),                                 // Si hay gradas
        modulo_vigilancia: z.string(),                      // Si hay módulo de vigilancia
        pista_atletismo: z.string(),                        // Si hay pista de atletismo
        palapas: z.string(),                                // Si hay palapas
        regaderas: z.string(),                              // Si hay regaderas
        teatro: z.string(),                                 // Si hay teatro
        wifi: z.string(),                                   // Si hay wifi
      }),
      // Información sobre equipos deportivos que usan el espacio (opcional)
      equipos: z.object({
        nombre_equipo: z.string(),                          // Nombre del equipo
        numero_integrantes: z.string(),                     // Número de integrantes
        deporte: z.string(),                                // Deporte que practican
        entrenador: z.string(),                             // Nombre del entrenador
        patrocinador: z.string(),                           // Nombre del patrocinador
        horario_entrenamiento: z.string(),                  // Horario de entrenamiento
      }).optional(),
      // Costo del uso del espacio deportivo
      costo: z.string(),
      // Información de contacto del espacio deportivo
      contacto: z.object({
        correo: z.string().email(),                         // Correo electrónico
        telefono: z.string(),                               // Teléfono de contacto
        pagina_web: z.string().optional(),                  // Página web (opcional)
        redes_sociales: z.array(z.string()).optional(),     // Redes sociales (opcional)
      }),
      // Opciones de accesibilidad (opcional)
      accesibilidad: z.array(z.string()).optional(),
      // Reportes y sugerencias de los usuarios (opcional)
      reportes_sugerencias: z.array(z.string()).optional(),
      // Información sobre los vendedores en el espacio deportivo (opcional)
      vendedores: z.object({
        nombre_vendedor: z.string(),                        // Nombre del vendedor
        horario_vendedor: z.string(),                       // Horario de venta
        producto_vendedor: z.object({
          nombre_producto: z.string(),                      // Nombre del producto vendido
          coste_producto: z.string(),                       // Costo del producto vendido
        }),
        reportes_vendedor: z.string(),                      // Reportes sobre el vendedor
      }).optional(),
      // Lista de URLs de fotos del espacio deportivo (opcional)
      fotos: z.array(z.string()).optional(),
    })
  ),
});
