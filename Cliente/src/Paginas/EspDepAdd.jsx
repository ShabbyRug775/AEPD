import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { crearDeportivoSchema } from "../Esquemas/deportivo"; // Supón que has definido un esquema con Zod
import { Input, Label, Button, Message, Card } from "../Componentes/UI";

function EspDepAdd() {
  // Inicializa el hook de formulario
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(crearDeportivoSchema),
  });

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/deportivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al crear el deportivo");
      const nuevoDep = await response.json();
      console.log("Deportivo creado:", nuevoDep);
    } catch (error) {
      console.error("Error en la alta de deportivos:", error.message);
    }
  };

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
            {...register("nombre")}
          />
          {errors.nombre && <Message message={errors.nombre.message} />}

          <Label htmlFor="direccion">Dirección:</Label>
          <Input
            type="text"
            name="direccion"
            placeholder="Escribe la dirección"
            {...register("direccion")}
          />
          {errors.direccion && <Message message={errors.direccion.message} />}

          <Label htmlFor="tipoDeEspacio">Tipo de espacio:</Label>
          <Input
            type="text"
            name="tipoDeEspacio"
            placeholder="Escribe el tipo de espacio"
            {...register("tipoDeEspacio")}
          />
          {errors.tipoDeEspacio && (
            <Message message={errors.tipoDeEspacio.message} />
          )}

          {/* Campos para el horario por día */}
          {["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"].map((dia) => (
            <div key={dia}>
              <Label htmlFor={`horario.${dia}`}>{`Horario ${dia.charAt(0).toUpperCase() + dia.slice(1)}:`}</Label>
              <Input
                type="text"
                name={`horario.${dia}`}
                placeholder="Ej: 06:00 - 20:00"
                {...register(`horario.${dia}`)}
              />
              {errors.horario?.[dia] && <Message message={errors.horario[dia].message} />}
            </div>
          ))}

          <Button>Registrar Deportivo</Button>
        </form>
      </Card>
    </div>
  );
}

export default EspDepAdd;
