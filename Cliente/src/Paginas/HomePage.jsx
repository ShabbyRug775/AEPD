// Se importa la libreria link de react-router-dom
import { Link } from "react-router-dom";

// Función de página principal
function HomePage() {

  // Retorna el html de la pagina principal
  return (

    <body className="bg-lime-50 p-10 mt-20">

      <h1 className="text-5xl py-2 font-bold">Espacios Públicos Deportivos</h1>

      <p className="text-md text-white-400">
        La Secretaría de Seguridad de la Ciudad de México está trabajando arduamente para recuperar y mantener
        los parques públicos como espacios seguros y accesibles para toda la comunidad.
      </p>

      <ul>
        <li><strong>Más de 100 Parques Recuperados:</strong> Desde el inicio del proyecto, hemos recuperado más de 100 parques públicos en toda la ciudad.</li>
        <li><strong>Mejora en la Seguridad:</strong> Gracias a la implementación de medidas de seguridad, los parques se han convertido en espacios más seguros para la comunidad.</li>
        <li><strong>Más Actividades Recreativas:</strong> Los parques recuperados ofrecen una variedad de actividades recreativas y culturales para que las familias puedan disfrutar.</li>
      </ul>

      <section class="section">
        <h2>Beneficios para la Comunidad</h2>
        <p>
          La recuperación de los parques públicos trae múltiples beneficios para la comunidad, mejorando la
          calidad de vida y fomentando la convivencia.
        </p>
        <a href="#" class="button">Más Información</a>
      </section>
    </body>

  );

}

// Exporta la pagina principal
export default HomePage;