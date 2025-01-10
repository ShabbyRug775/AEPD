import React from 'react';
import { Input, Label, Select, Checkbox, ButtonDelete } from "."; // Asegúrate de importar el componente Button correctamente
import { deportes } from "../deportivos/listasDesp";

export function Card_cancha_mod({ cancha, index, isEditing, handleChange, handleCanchaDelete }) {

  return (
    <div className="bg-lime-300 max-w-md w-full p-10 rounded-md mb-4">
      <h1 className="text-3xl font-bold">Cancha {index + 1}</h1>

      <Label htmlFor={`canchas[${index}].etiqueta`}>Nombre de la etiqueta:</Label>
      <Input
        name={`canchas[${index}].etiqueta`}
        value={cancha.etiqueta}
        readOnly={!isEditing} // Aplicar isEditing
        onChange={handleChange} 
      />

      <Label htmlFor={`canchas[${index}].deporte`}>Deporte:</Label>
      <Select
        name={`canchas[${index}].deporte`}
        value={cancha.deporte}
        readOnly={!isEditing}
        onChange={handleChange}
      >
        <option value="">Seleccione el deporte</option>
        {deportes.map((deporte, i) => (
          <option key={i} value={deporte}>{deporte}</option>
        ))}
      </Select>

      <Label htmlFor={`canchas[${index}].medidas.largo`}>Largo:</Label>
      <Input
        type="text"
        name={`canchas[${index}].medidas.largo`}
        value={cancha.medidas.largo}
        readOnly={!isEditing}
        onChange={handleChange}
      />

      <Label htmlFor={`canchas[${index}].medidas.ancho`}>Ancho:</Label>
      <Input
        type="text"
        name={`canchas[${index}].medidas.ancho`}
        value={cancha.medidas.ancho}
        readOnly={!isEditing}
        onChange={handleChange}
      />

      <Label htmlFor={`canchas[${index}].tipodesuelo`}>Tipo de suelo:</Label>
      <Input
        type="text"
        name={`canchas[${index}].tipodesuelo`}
        value={cancha.tipodesuelo}
        readOnly={!isEditing}
        onChange={handleChange}
      />

      <Label htmlFor={`canchas[${index}].senalamientos`}>Señalamientos:</Label>
      <Input
        type="text"
        name={`canchas[${index}].senalamientos`}
        value={cancha.senalamientos}
        readOnly={!isEditing}
        onChange={handleChange}
      />

      <Label htmlFor={`canchas[${index}].equipamiento`}>Equipamiento:</Label>
      <Input
        type="text"
        name={`canchas[${index}].equipamiento`}
        value={cancha.equipamiento}
        readOnly={!isEditing}
        onChange={handleChange}
      />

      <div className="flex justify-center items-center">
        <Checkbox
          label="Iluminación"
          name={`canchas[${index}].iluminacion`}
          checked={cancha.iluminacion}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <Checkbox
          label="Techado"
          name={`canchas[${index}].techado`}
          checked={cancha.techado}
          readOnly={!isEditing}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center items-center">
        <Checkbox
          label="Gradas"
          name={`canchas[${index}].gradas`}
          checked={cancha.gradas}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <Checkbox
          label="Baños"
          name={`canchas[${index}].baños`}
          checked={cancha.baños}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <Checkbox
          label="Vestidores"
          name={`canchas[${index}].vestidores`}
          checked={cancha.vestidores}
          readOnly={!isEditing}
          onChange={handleChange}
        />
      </div>

      <Label htmlFor={`canchas[${index}].ubicacionGeografica.latitud`}>Latitud:</Label>
      <Input
        type="number"
        step="any"
        name={`canchas[${index}].ubicacionGeografica.latitud`}
        value={cancha.ubicacionGeografica.latitud}
        readOnly={!isEditing}
        onChange={handleChange}
      />

      <Label htmlFor={`canchas[${index}].ubicacionGeografica.longitud`}>Longitud:</Label>
      <Input
        type="number"
        step="any"
        name={`canchas[${index}].ubicacionGeografica.longitud`}
        value={cancha.ubicacionGeografica.longitud}
        readOnly={!isEditing}
        onChange={handleChange}
      />
      {isEditing ? (
        <ButtonDelete onClick={() => handleCanchaDelete(index)} className="mt-4 bg-red-500 text-white p-2 rounded">
          Eliminar Cancha
        </ButtonDelete> 
      ) : ( <></> )}
      
    </div>
  );
}