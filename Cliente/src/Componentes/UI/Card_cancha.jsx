import { Input, Label, Button, Select, Checkbox } from ".";
import { deportes } from "../deportivos/listasDesp";

export function Card_cancha({ index, onRemove, register }) {

  return (

    <div className="bg-lime-400 max-w-md w-full p-10 rounded-md mb-4">

      <button onClick={() => onRemove(index)} className="mt-4 bg-red-500 text-white p-2 rounded">
        Cancelar cancha
      </button>

      <h1 className="text-3xl font-bold"> Agregar cancha {index + 1} </h1>
      
      <Label htmlFor={`canchas[${index}].etiqueta`}>Nombre de la etiqueta:</Label>

      <Input
        type="text"
        name={`canchas[${index}].etiqueta`}
        placeholder="Escribe la etiqueta"
        {...register(`canchas[${index}].etiqueta`)}
      />
      <Label htmlFor={`canchas[${index}].deporte`}>Deporte:</Label>
      <Select
        name={`canchas[${index}].deporte`}
        {...register(`canchas[${index}].deporte`, {
          validate: value => value !== "" || "Seleccione un deporte"
        })}
      >
        <option value="">Seleccione el deporte</option>
        {deportes.map((deporte, index) => (
          <option key={index} value={deporte}>{deporte}</option>
        ))}
      </Select>

      <Label htmlFor={`canchas[${index}].medidas.largo`}>Largo:</Label>
      <Input
        type="text"
        name={`canchas[${index}].medidas.largo`}
        placeholder="Largo"
        {...register(`canchas[${index}].medidas.largo`)}
      />

      <Label htmlFor={`canchas[${index}].medidas.ancho`}>Ancho:</Label>
      <Input
        type="text"
        name={`canchas[${index}].medidas.ancho`}
        placeholder="Ancho"
        {...register(`canchas[${index}].medidas.ancho`)}
      />

      <Label htmlFor={`canchas[${index}].tipodesuelo`}>Tipo de suelo:</Label>
      <Input
        type="text"
        name={`canchas[${index}].tipodesuelo`}
        placeholder="Escribe el tipo de suelo"
        {...register(`canchas[${index}].tipodesuelo`)}
      />

      <Label htmlFor={`canchas[${index}].senalamientos`}>Señalamientos:</Label>
      <Input
        type="text"
        name={`canchas[${index}].senalamientos`}
        placeholder="Escribe los señalamientos"
        {...register(`canchas[${index}].senalamientos`)}
      />

      <Label htmlFor={`canchas[${index}].equipamiento`}>Equipamiento:</Label>
      <Input
        type="text"
        name={`canchas[${index}].equipamiento`}
        placeholder="Escribe el equipamiento"
        {...register(`canchas[${index}].equipamiento`)}
      />

      <div className="flex justify-center items-center">
        <Checkbox
          label="Iluminación"
          name={`canchas[${index}].iluminacion`}
          {...register(`canchas[${index}].iluminacion`)}
        />

        <Checkbox
          label="Techado"
          name={`canchas[${index}].techado`}
          {...register(`canchas[${index}].techado`)}
        />
      </div>

      <div className="flex justify-center items-center">
        <Checkbox
          label="Gradas"
          name={`canchas[${index}].gradas`}
          {...register(`canchas[${index}].gradas`)}
        />

        <Checkbox
          label="Baños"
          name={`canchas[${index}].baños`}
          {...register(`canchas[${index}].baños`)}
        />

        <Checkbox
          label="Vestidores"
          name={`canchas[${index}].vestidores`}
          {...register(`canchas[${index}].vestidores`)}
        />
      </div>

      <Label htmlFor={`canchas[${index}].ubicacionGeografica.latitud`}>Latitud:</Label>

      <Input
        type="number"
        step="any"
        name={`canchas[${index}].ubicacionGeografica.latitud`}
        placeholder="Escribe la latitud"
        {...register(`canchas[${index}].ubicacionGeografica.latitud`, {
          setValueAs: (value) => parseFloat(value)
        })}
      />

      <Label htmlFor={`canchas[${index}].ubicacionGeografica.longitud`}>Longitud:</Label>
      
      <Input
        type="number"
        step="any"
        name={`canchas[${index}].ubicacionGeografica.longitud`}
        placeholder="Escribe la longitud"
        {...register(`canchas[${index}].ubicacionGeografica.longitud`, {
          setValueAs: (value) => parseFloat(value)
        })}
      />
    </div>
  );
}