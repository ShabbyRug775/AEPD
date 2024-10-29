import { useState } from "react";
import { Button, ButtonDelete, Card, Label, Input, Select } from "../UI";
import { usarDeportivo } from "../../Contexto/deportivoContexto";
import { useNavigate, useParams } from "react-router-dom";
import { alcaldias, costos, days } from "./listasDesp";

export function DeportivoCard_Update({ Deportivo }) {
    const { bajaDepor, modDepor } = usarDeportivo();
    const navigate = useNavigate();
    const { id: paramId } = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        nombre: Deportivo.nombre,
        direccion: Deportivo.direccion,
        alcaldia: Deportivo.alcaldia,
        horario: Deportivo.horario,
        costo: Deportivo.costo
    });

    const handleDelete = () => {
        bajaDepor(Deportivo._id);
        navigate("/deportivos");
    };

    const handleEdit = () => {
        setIsEditing(true); // Activar modo de edición
        setMessage("Ya se puede editar el espacio deportivo");
    };

    const handleCancel = () => {
        setIsEditing(false); // Desactivar modo de edición
        setMessage(""); // Ocultar el mensaje
        setFormData({
            nombre: Deportivo.nombre,
            direccion: Deportivo.direccion,
            alcaldia: Deportivo.alcaldia,
            horario: Deportivo.horario,
            costo: Deportivo.costo
        });
    };

    const handleSave = () => {
        if (paramId) {
            modDepor(paramId, formData);
            window.location.reload(); // Refrescar la página después de guardar
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        // Si el input es de horario, actualiza el horario basado en el día seleccionado
        if (id === 'horario') {
            setFormData((prevData) => ({
                ...prevData,
                horario: {
                    ...prevData.horario,
                    [formData.days]: value // Asigna el valor según el día actual
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value
            }));
        }
    };


    return (
        <Card className="w-full h-dvh">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{Deportivo.nombre}</h1>
            </header>

            {message && <p className="text-green-600 mb-4">{message}</p>}

            <Label htmlFor="nombre">Nombre de Deportivo</Label>
            <Input id="nombre" value={formData.nombre} readOnly={!isEditing} onChange={handleChange} />

            <Label htmlFor="direccion">Dirección</Label>
            <Input id="direccion" value={formData.direccion} readOnly={!isEditing} onChange={handleChange} />

            <Label htmlFor="alcaldia">Alcaldía</Label>
            {isEditing ? (
                <Select
                    id="alcaldia"
                    value={formData.alcaldia}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded"
                >
                    <option value="">Seleccione Alcaldía</option>
                    {alcaldias.map((alcaldia, index) => (
                        <option key={index} value={alcaldia}>
                            {alcaldia}
                        </option>
                    ))}
                </Select>
            ) : (
                <Input id="alcaldia" value={formData.alcaldia} readOnly />
            )}

            {isEditing && (
                <>
                    <Label htmlFor="days">Día de la semana</Label>
                    <Select
                        id="days"
                        value={formData.days}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option value="">Seleccione día</option>
                        {days.map((day, index) => (
                            <option key={index} value={day}>
                                {day.charAt(0).toUpperCase() + day.slice(1)} {/* Capitaliza el primer carácter */}
                            </option>
                        ))}
                    </Select>

                    <Label htmlFor="horario">Horario</Label>
                    <Input id="horario" value={formData.horario[formData.days] || ""} readOnly={!isEditing} onChange={handleChange} />
                </>
            )}

            <Label htmlFor="costo">Costo</Label>
            {isEditing ? (
                <Select id="costo" value={formData.costo} onChange={handleChange} className="border border-gray-300 p-2 rounded">
                    <option value="">Seleccione Costo</option>
                    {costos.map((costo) => (
                        <option key={costo} value={costo}>
                            {costo}
                        </option>
                    ))}
                </Select>
            ) : (
                <Input id="costo" value={formData.costo} readOnly />
            )}

            <div className="flex justify-between gap-x-2 items-center mt-5">
                {isEditing ? (
                    <>
                        <Button onClick={handleCancel}>Cancelar</Button>
                        <Button onClick={handleSave}>Guardar</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleEdit}>Editar</Button>
                        <ButtonDelete onClick={handleDelete}>Eliminar</ButtonDelete>
                    </>
                )}
            </div>
        </Card>
    );
}
