import { Link } from "react-router-dom";
import './EspDepList.css'; // Asegúrate de crear este archivo CSS

// Función de consulta de espacios deportivos
function EspDepList() {
  // Lista de espacios deportivos
  const espaciosDeportivos = [
    {
      id: 1,
      nombre: "Parque México",
      descripcion: "Parque emblemático en la colonia Condesa, ideal para paseos y actividades al aire libre.",
      ubicacionGeografica: {
        latitud: "19.411784",
        longitud: "-99.169514"
      },
      direccion: "Avenida México, Condesa",
      fotoPrincipal: "url_de_foto_principal_1.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_1_1.jpg",
        "url_de_foto_secundaria_1_2.jpg"
      ],
      fechaDeRegistro: "2024-01-01",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: true
      },
      puertasDeEntrada: 2,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "8:00 - 20:00",
        sabadoDomingo: "9:00 - 18:00"
      },
      costo: "Gratis"
    },
    {
      id: 2,
      nombre: "Bosque de Chapultepec",
      descripcion: "Uno de los parques urbanos más grandes del mundo, ideal para correr, pasear y disfrutar de la naturaleza.",
      ubicacionGeografica: {
        latitud: "19.419785",
        longitud: "-99.189434"
      },
      direccion: "Avenida Paseo de la Reforma, Chapultepec",
      fotoPrincipal: "url_de_foto_principal_2.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_2_1.jpg",
        "url_de_foto_secundaria_2_2.jpg"
      ],
      fechaDeRegistro: "2024-01-02",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: true
      },
      puertasDeEntrada: 5,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "6:00 - 20:00",
        sabadoDomingo: "6:00 - 21:00"
      },
      costo: "Gratis"
    },
    {
      id: 3,
      nombre: "Parque Lincoln",
      descripcion: "Parque familiar en la colonia Polanco, con áreas verdes y espacios recreativos.",
      ubicacionGeografica: {
        latitud: "19.429722",
        longitud: "-99.197351"
      },
      direccion: "Avenida Homero, Polanco",
      fotoPrincipal: "url_de_foto_principal_3.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_3_1.jpg",
        "url_de_foto_secundaria_3_2.jpg"
      ],
      fechaDeRegistro: "2024-01-03",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: false,
        vigilancia: true
      },
      puertasDeEntrada: 3,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "8:00 - 20:00",
        sabadoDomingo: "9:00 - 19:00"
      },
      costo: "Gratis"
    },
    {
      id: 4,
      nombre: "Parque España",
      descripcion: "Parque con áreas para niños, canchas deportivas y eventos culturales.",
      ubicacionGeografica: {
        latitud: "19.415601",
        longitud: "-99.171185"
      },
      direccion: "Avenida Veracruz, Condesa",
      fotoPrincipal: "url_de_foto_principal_4.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_4_1.jpg",
        "url_de_foto_secundaria_4_2.jpg"
      ],
      fechaDeRegistro: "2024-01-04",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: false
      },
      puertasDeEntrada: 2,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "7:00 - 19:00",
        sabadoDomingo: "8:00 - 18:00"
      },
      costo: "Gratis"
    },
    {
      id: 5,
      nombre: "Deportivo Benito Juárez",
      descripcion: "Complejo deportivo con canchas de fútbol, baloncesto y áreas recreativas.",
      ubicacionGeografica: {
        latitud: "19.484334",
        longitud: "-99.134399"
      },
      direccion: "Avenida Manuel J. Clouthier, Benito Juárez",
      fotoPrincipal: "url_de_foto_principal_5.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_5_1.jpg",
        "url_de_foto_secundaria_5_2.jpg"
      ],
      fechaDeRegistro: "2024-01-05",
      tipoDeEspacio: "Deportivo",
      servicios: {
        baños: true,
        comercios: false,
        vigilancia: true
      },
      puertasDeEntrada: 3,
      aceptaMascotas: false,
      horario: {
        lunesViernes: "7:00 - 21:00",
        sabadoDomingo: "8:00 - 20:00"
      },
      costo: "$20"
    },
    {
      id: 6,
      nombre: "Deportivo Plan Sexenal",
      descripcion: "Instalaciones deportivas que incluyen canchas de tenis, fútbol y áreas de entrenamiento.",
      ubicacionGeografica: {
        latitud: "19.455243",
        longitud: "-99.172357"
      },
      direccion: "Avenida Plan Sexenal, Coyoacán",
      fotoPrincipal: "url_de_foto_principal_6.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_6_1.jpg",
        "url_de_foto_secundaria_6_2.jpg"
      ],
      fechaDeRegistro: "2024-01-06",
      tipoDeEspacio: "Deportivo",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: true
      },
      puertasDeEntrada: 2,
      aceptaMascotas: false,
      horario: {
        lunesViernes: "7:00 - 22:00",
        sabadoDomingo: "8:00 - 20:00"
      },
      costo: "$25"
    },
    {
      id: 7,
      nombre: "Parque Bicentenario",
      descripcion: "Parque que celebra el Bicentenario de México, con áreas recreativas y culturales.",
      ubicacionGeografica: {
        latitud: "19.467973",
        longitud: "-99.196039"
      },
      direccion: "Paseo de la Reforma, Santa Fe",
      fotoPrincipal: "url_de_foto_principal_7.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_7_1.jpg",
        "url_de_foto_secundaria_7_2.jpg"
      ],
      fechaDeRegistro: "2024-01-07",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: true
      },
      puertasDeEntrada: 4,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "7:00 - 20:00",
        sabadoDomingo: "8:00 - 21:00"
      },
      costo: "Gratis"
    },
    {
      id: 8,
      nombre: "Parque Hundido",
      descripcion: "Parque popular con áreas verdes y un lago artificial, ideal para actividades familiares.",
      ubicacionGeografica: {
        latitud: "19.378535",
        longitud: "-99.178490"
      },
      direccion: "Avenida 5 de Febrero, San Ángel",
      fotoPrincipal: "url_de_foto_principal_8.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_8_1.jpg",
        "url_de_foto_secundaria_8_2.jpg"
      ],
      fechaDeRegistro: "2024-01-08",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: true
      },
      puertasDeEntrada: 3,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "6:00 - 20:00",
        sabadoDomingo: "7:00 - 21:00"
      },
      costo: "Gratis"
    },
    {
      id: 9,
      nombre: "Deportivo Magdalena Mixhuca",
      descripcion: "Gran espacio deportivo, sede de eventos masivos y competiciones deportivas.",
      ubicacionGeografica: {
        latitud: "19.407811",
        longitud: "-99.091499"
      },
      direccion: "Avenida Río de la Piedad, Iztacalco",
      fotoPrincipal: "url_de_foto_principal_9.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_9_1.jpg",
        "url_de_foto_secundaria_9_2.jpg"
      ],
      fechaDeRegistro: "2024-01-09",
      tipoDeEspacio: "Deportivo",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: true
      },
      puertasDeEntrada: 2,
      aceptaMascotas: false,
      horario: {
        lunesViernes: "8:00 - 22:00",
        sabadoDomingo: "9:00 - 20:00"
      },
      costo: "Gratis"
    },
    {
      id: 10,
      nombre: "Deportivo Oceanía",
      descripcion: "Instalaciones deportivas con canchas y áreas para la práctica de diversos deportes.",
      ubicacionGeografica: {
        latitud: "19.448603",
        longitud: "-99.080855"
      },
      direccion: "Avenida Oceanía, Venustiano Carranza",
      fotoPrincipal: "url_de_foto_principal_10.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_10_1.jpg",
        "url_de_foto_secundaria_10_2.jpg"
      ],
      fechaDeRegistro: "2024-01-10",
      tipoDeEspacio: "Deportivo",
      servicios: {
        baños: true,
        comercios: false,
        vigilancia: true
      },
      puertasDeEntrada: 2,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "7:00 - 21:00",
        sabadoDomingo: "8:00 - 20:00"
      },
      costo: "$15"
    },
    {
      id: 11,
      nombre: "Parque La Mexicana",
      descripcion: "Parque moderno con áreas recreativas, senderos y espacios para eventos.",
      ubicacionGeografica: {
        latitud: "19.357195",
        longitud: "-99.269452"
      },
      direccion: "Avenida La Mexicana, Santa Fe",
      fotoPrincipal: "url_de_foto_principal_11.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_11_1.jpg",
        "url_de_foto_secundaria_11_2.jpg"
      ],
      fechaDeRegistro: "2024-01-11",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: true
      },
      puertasDeEntrada: 3,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "6:00 - 22:00",
        sabadoDomingo: "7:00 - 21:00"
      },
      costo: "Gratis"
    },
    {
      id: 12,
      nombre: "Parque Lineal Ave Fénix",
      descripcion: "Parque lineal ideal para correr y andar en bicicleta, con áreas verdes.",
      ubicacionGeografica: {
        latitud: "19.448371",
        longitud: "-99.102506"
      },
      direccion: "Avenida Ave Fénix, Nezahualcóyotl",
      fotoPrincipal: "url_de_foto_principal_12.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_12_1.jpg",
        "url_de_foto_secundaria_12_2.jpg"
      ],
      fechaDeRegistro: "2024-01-12",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: false,
        vigilancia: true
      },
      puertasDeEntrada: 2,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "7:00 - 19:00",
        sabadoDomingo: "8:00 - 18:00"
      },
      costo: "Gratis"
    },
    {
      id: 13,
      nombre: "Parque Ecológico Xochimilco",
      descripcion: "Área natural protegida con biodiversidad, ideal para actividades al aire libre.",
      ubicacionGeografica: {
        latitud: "19.298256",
        longitud: "-99.094585"
      },
      direccion: "Camino Viejo a Xochimilco, Xochimilco",
      fotoPrincipal: "url_de_foto_principal_13.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_13_1.jpg",
        "url_de_foto_secundaria_13_2.jpg"
      ],
      fechaDeRegistro: "2024-01-13",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: true
      },
      puertasDeEntrada: 2,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "7:00 - 20:00",
        sabadoDomingo: "8:00 - 19:00"
      },
      costo: "Gratis"
    },
    {
      id: 14,
      nombre: "Parque Cuitláhuac",
      descripcion: "Parque familiar con áreas verdes y actividades recreativas.",
      ubicacionGeografica: {
        latitud: "19.362073",
        longitud: "-99.044670"
      },
      direccion: "Avenida Cuitláhuac, Iztapalapa",
      fotoPrincipal: "url_de_foto_principal_14.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_14_1.jpg",
        "url_de_foto_secundaria_14_2.jpg"
      ],
      fechaDeRegistro: "2024-01-14",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: false
      },
      puertasDeEntrada: 2,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "7:00 - 19:00",
        sabadoDomingo: "8:00 - 18:00"
      },
      costo: "Gratis"
    },
    {
      id: 15,
      nombre: "Parque Cantera",
      descripcion: "Parque urbano con áreas verdes y espacios recreativos.",
      ubicacionGeografica: {
        latitud: "19.310484",
        longitud: "-99.164956"
      },
      direccion: "Avenida Cantera, Tlalpan",
      fotoPrincipal: "url_de_foto_principal_15.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_15_1.jpg",
        "url_de_foto_secundaria_15_2.jpg"
      ],
      fechaDeRegistro: "2024-01-15",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: false,
        vigilancia: true
      },
      puertasDeEntrada: 1,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "7:00 - 19:00",
        sabadoDomingo: "8:00 - 18:00"
      },
      costo: "Gratis"
    },
    {
      id: 16,
      nombre: "Parque Lineal Vicente Guerrero",
      descripcion: "Parque lineal ideal para actividades deportivas y paseos.",
      ubicacionGeografica: {
        latitud: "19.358084",
        longitud: "-99.058203"
      },
      direccion: "Avenida Vicente Guerrero, Iztacalco",
      fotoPrincipal: "url_de_foto_principal_16.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_16_1.jpg",
        "url_de_foto_secundaria_16_2.jpg"
      ],
      fechaDeRegistro: "2024-01-16",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: false,
        vigilancia: true
      },
      puertasDeEntrada: 2,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "6:00 - 20:00",
        sabadoDomingo: "7:00 - 21:00"
      },
      costo: "Gratis"
    },
    {
      id: 17,
      nombre: "Parque Althea",
      descripcion: "Espacio recreativo familiar con áreas verdes y juegos para niños.",
      ubicacionGeografica: {
        latitud: "19.315155",
        longitud: "-99.122829"
      },
      direccion: "Avenida Althea, Coyoacán",
      fotoPrincipal: "url_de_foto_principal_17.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_17_1.jpg",
        "url_de_foto_secundaria_17_2.jpg"
      ],
      fechaDeRegistro: "2024-01-17",
      tipoDeEspacio: "Parque",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: false
      },
      puertasDeEntrada: 1,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "7:00 - 19:00",
        sabadoDomingo: "8:00 - 18:00"
      },
      costo: "Gratis"
    },
    {
      id: 18,
      nombre: "Plaza Morelia / Jardín Garibaldi",
      descripcion: "Plaza pública con espacios para eventos culturales y recreativos.",
      ubicacionGeografica: {
        latitud: "19.424700",
        longitud: "-99.155521"
      },
      direccion: "Avenida Morelia, Centro Histórico",
      fotoPrincipal: "url_de_foto_principal_18.jpg",
      fotosSecundarias: [
        "url_de_foto_secundaria_18_1.jpg",
        "url_de_foto_secundaria_18_2.jpg"
      ],
      fechaDeRegistro: "2024-01-18",
      tipoDeEspacio: "Plaza",
      servicios: {
        baños: true,
        comercios: true,
        vigilancia: true
      },
      puertasDeEntrada: 3,
      aceptaMascotas: true,
      horario: {
        lunesViernes: "6:00 - 22:00",
        sabadoDomingo: "7:00 - 21:00"
      },
      costo: "Gratis"
    }
  ];


  // Retorna el html de la pagina principal
  return (
    <div className="bg-lime-50 p-10 mt-20">
      <h1 className="text-center">Lista de Espacios Deportivos</h1>
      <ul>
        {espaciosDeportivos.map((espacio) => (
          <li key={espacio.id} className="espacio-item">
            <img className="espacio-imagen" src={espacio.fotoPrincipal} alt={`Foto principal de ${espacio.nombre}`} />
            <div className="espacio-info">
              <h2 className="espacio-nombre">{espacio.nombre}</h2>
              <p>{espacio.descripcion}</p>
              <p>Ubicación: {espacio.ubicacionGeografica.latitud}, {espacio.ubicacionGeografica.longitud}</p>
              <p>Dirección: {espacio.direccion}</p>
              <p>Fecha de Registro: {espacio.fechaDeRegistro}</p>
              <p>Tipo de Espacio: {espacio.tipoDeEspacio}</p>
              <p>Costo: {espacio.costo}</p>
              <p>¿Acepta Mascotas?: {espacio.aceptaMascotas ? 'Sí' : 'No'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exporta la lista de espacios deportivos
export default EspDepList;
