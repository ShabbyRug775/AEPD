// Se importan librerias de react, componentes y contexto de usuario
import { useState } from "react"; // Para usar el estado local
import { usarDeportivo } from "../Contexto/deportivoContexto";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { crearDeportivoSchema } from "../Esquemas/deportivo"; // Supón que has definido un esquema con Zod
import { Input, Label, Button, Card, Card_cancha, Select, Checkbox } from "../Componentes/UI";
import { alcaldias, costos } from "../Componentes/deportivos/listasDesp";

// Funcion de altas de espacio deportivo
function EspDepAdd() {

  // Constante de verificacion de errores
  const { altaDepor } = usarDeportivo();

  // Estado para controlar la visibilidad de Card_cancha
  const [canchas, setCards] = useState([]);

  // Inicializa el hook de formulario
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(crearDeportivoSchema) });

  // Se llama navigate de react
  const navigate = useNavigate();

  // Constante de OnSubmit
  const onSubmit = async (value) => {
    await altaDepor(value);
    navigate("/deportivos");
    window.location.reload(); // Refresca la página
  };

  const handleAddCardCancha = (e) => {
    e.preventDefault(); // Prevenir el envío del formulario
    setCards([...canchas, {}]); // Añadir una nueva cancha al estado
  };

  const handleRemoveCardCancha = (index) => {
    setCards(canchas.filter((_, i) => i !== index)); // Eliminar la cancha del estado
  };

  // Retorna el HTML de la página
  return (

    <div className="flex items-center justify-center min-h-screen mt-20 mb-5">

      <Card>

        <h1 className="text-3xl font-bold"> Alta de Deportivo </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Label htmlFor="nombre">Nombre del deportivo:</Label>

          <Input
            type="text"
            name="nombre"
            placeholder="Escribe el nombre"
            {...register("nombre", { required: "Este campo es obligatorio" })}
          />

          {errors.nombre?.message && (<p className="text-red-500">{errors.nombre?.message}</p>)}

          <Label htmlFor="direccion">Ubicación geográfica:</Label>

          <Label htmlFor="direccion">Latitud:</Label>

          <Input
            type="number"
            step="any" // Permite decimales si es necesario
            name="ubicacionGeografica.latitud"
            placeholder="Escribe la latitud"
            {...register("ubicacionGeografica.latitud", {
              setValueAs: (value) => parseFloat(value), // Asegura que el valor sea un número flotante
              required: "La latitud es requerida", // Puedes agregar otras validaciones aquí
            })}
          />

          {errors.ubicacionGeografica?.latitud && (<p className="text-red-500">{errors.ubicacionGeografica?.latitud?.message}</p>)}


          <Label htmlFor="direccion">Longitud:</Label>

          <Input
            type="number"
            step="any" // Permite decimales si es necesario
            name="ubicacionGeografica.longitud"
            placeholder="Escribe la longitud"
            {...register("ubicacionGeografica.longitud", {
              setValueAs: (value) => parseFloat(value), // Asegura que el valor sea un número flotante
              required: "La longitud es requerida", // Puedes agregar otras validaciones aquí
            })}
          />

          {errors.ubicacionGeografica?.longitud && (<p className="text-red-500">{errors.ubicacionGeografica?.longitud?.message}</p>)}

          <Label htmlFor="direccion">Dirección:</Label>

          <Input
            type="text"
            name="direccion"
            placeholder="Escribe la dirección"
            {...register("direccion", { required: "Este campo es obligatorio" })}
          />

          {errors.direccion?.message && (<p className="text-red-500">{errors.direccion?.message}</p>)}

          <Label htmlFor="alcaldia">Alcaldía:</Label>

          <Select
            name="alcaldia"
            {...register("alcaldia", {
              validate: value => value !== "" || "Seleccione una alcaldía"
            })}
          >
            <option value="">Seleccione alcaldía</option>
            {alcaldias.map((alcaldia, index) => (
              <option key={index} value={alcaldia}>{alcaldia}</option>
            ))}
          </Select>

          {errors.alcaldia?.message && (<p className="text-red-500">{errors.alcaldia?.message}</p>)}

          <Label htmlFor="tipoDeEspacio">Tipo de espacio:</Label>

          <Input
            type="text"
            name="tipoDeEspacio"
            placeholder="Escribe el tipo de espacio"
            {...register("tipoDeEspacio", { required: "Este campo es obligatorio" })}
          />

          {errors.tipoDeEspacio?.message && (<p className="text-red-500">{errors.tipoDeEspacio?.message}</p>)}

          <Label htmlFor="servicios">Servicios:</Label>

          <div className="flex justify-center items-center space-x-4">
            <Checkbox
              label="Baños"
              name="servicios.baños"
              {...register("servicios.baños")}
            />

            <Checkbox
              label="Comercios"
              name="servicios.comercios"
              {...register("servicios.comercios")}
            />

            <Checkbox
              label="Vigilancia"
              name="servicios.vigilancia"
              {...register("servicios.vigilancia")}
            />
          </div>

          <Label htmlFor="puertasDeEntrada">Puertas de entrada:</Label>

          <Input
            type="number"
            name="puertasDeEntrada"
            placeholder="Escriba la cantidad de puertas de entrada"
            {...register("puertasDeEntrada", {
              setValueAs: (value) => parseInt(value, 10)
            })}
          />

          {errors.puertasDeEntrada?.message && (<p className="text-red-500">{errors.puertasDeEntrada?.message}</p>)}

          <div className="flex justify-center items-center">
            <Checkbox
              label="Acepta Mascotas"
              name="aceptaMascotas"
              {...register("aceptaMascotas")}
            />
          </div>

          <div>
            <Label htmlFor="horario">Horario:</Label>

            <Label htmlFor="lunes">Lunes:</Label>
            <Input
              type="text"
              name="horario.lunes"
              placeholder="06:00 - 20:00"
              {...register("horario.lunes", { required: "Este campo es obligatorio" })}
            />

            {errors.horario?.lunes && (<p className="text-red-500">{errors.horario?.lunes?.message}</p>)}

            <Label htmlFor="martes">Martes:</Label>

            <Input
              type="text"
              name="horario.martes"
              placeholder="06:00 - 20:00"
              {...register("horario.martes", { required: "Este campo es obligatorio" })}
            />

            {errors.horario?.martes && (<p className="text-red-500">{errors.horario?.martes?.message}</p>)}

            <Label htmlFor="miercoles">Miércoles:</Label>
            <Input
              type="text"
              name="horario.miércoles"
              placeholder="06:00 - 20:00"
              {...register("horario.miércoles", { required: "Este campo es obligatorio" })}
            />

            {errors.horario?.miércoles && (<p className="text-red-500">{errors.horario?.miércoles?.message}</p>)}

            <Label htmlFor="jueves">Jueves:</Label>
            <Input
              type="text"
              name="horario.jueves"
              placeholder="06:00 - 20:00"
              {...register("horario.jueves", { required: "Este campo es obligatorio" })}
            />

            {errors.horario?.jueves && (<p className="text-red-500">{errors.horario?.jueves?.message}</p>)}

            <Label htmlFor="viernes">Viernes:</Label>
            <Input
              type="text"
              name="horario.viernes"
              placeholder="06:00 - 20:00"
              {...register("horario.viernes", { required: "Este campo es obligatorio" })}
            />

            {errors.horario?.viernes && (<p className="text-red-500">{errors.horario?.viernes?.message}</p>)}

            <Label htmlFor="sabado">Sábado:</Label>
            <Input
              type="text"
              name="horario.sábado"
              placeholder="06:00 - 20:00"
              {...register("horario.sábado", { required: "Este campo es obligatorio" })}
            />

            {errors.horario?.sábado && (<p className="text-red-500">{errors.horario?.sábado?.message}</p>)}

            <Label htmlFor="domingo">Domingo:</Label>
            <Input
              type="text"
              name="horario.domingo"
              placeholder="06:00 - 20:00"
              {...register("horario.domingo", { required: "Este campo es obligatorio" })}
            />

            {errors.horario?.domingo && (<p className="text-red-500">{errors.horario?.domingo?.message}</p>)}

          </div>

          <Label htmlFor="costo">Costo:</Label>

          <Select
            name="costo"
            {...register("costo", {
              validate: value => value !== "" || "Seleccione un costo"
            })}
          >
            <option value="">Seleccione el costo</option>
            {costos.map((costo, index) => (
              <option key={index} value={costo}>{costo}</option>
            ))}
          </Select>

          {errors.costo?.message && (<p className="text-red-500">{errors.costo?.message}</p>)}

          <div className="flex justify-center items-center space-x-4">
            <Button type="button" onClick={handleAddCardCancha}>
              Añadir cancha
            </Button>
          </div>
          {canchas.map((_, index) => (
            <div className="mb-4" key={index}>
              <Card_cancha
                index={index}
                onRemove={() => handleRemoveCardCancha(index)}
                register={register}
              />
            </div>
          ))}

          <Button type="submit">Guardar</Button>
        </form>
      </Card>
    </div>
  );
}

export default EspDepAdd;
