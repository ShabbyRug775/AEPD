import { useState } from "react";
import { Button, ButtonDelete, Card, Card_cancha_mod, Label, Input, Select, Checkbox } from "../UI";
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
        ubicacionGeografica: {
            latitud: Deportivo.ubicacionGeografica.latitud,
            longitud: Deportivo.ubicacionGeografica.longitud
        },
        tipoDeEspacio: Deportivo.tipoDeEspacio,
        servicios: {
            baños: Deportivo.servicios.baños,
            comercios: Deportivo.servicios.comercios,
            vigilancia: Deportivo.servicios.vigilancia
        },
        puertasDeEntrada: Deportivo.puertasDeEntrada,
        aceptaMascotas: Deportivo.aceptaMascotas,
        horario: {
            lunes: Deportivo.horario.lunes,
            martes: Deportivo.horario.martes,
            miércoles: Deportivo.horario.miércoles,
            jueves: Deportivo.horario.jueves,
            viernes: Deportivo.horario.viernes,
            sábado: Deportivo.horario.sábado,
            domingo: Deportivo.horario.domingo
        },
        costo: Deportivo.costo,
        canchas: Deportivo.canchas.map(cancha => ({
            etiqueta: cancha.etiqueta || "",
            deporte: cancha.deporte || "",
            medidas: {
                largo: cancha.medidas.largo || "",
                ancho: cancha.medidas.ancho || ""
            },
            tipodesuelo: cancha.tipodesuelo || "",
            senalamientos: cancha.senalamientos || "",
            equipamiento: cancha.equipamiento || "",
            iluminacion: cancha.iluminacion || false,
            techado: cancha.techado || false,
            gradas: cancha.gradas || false,
            baños: cancha.baños || false,
            vestidores: cancha.vestidores || false,
            ubicacionGeografica: {
                latitud: cancha.ubicacionGeografica.latitud || 1,
                longitud: cancha.ubicacionGeografica.longitud || 1
            }
        }))
    });

    const handleDelete = () => {
        bajaDepor(Deportivo._id);
        navigate("/deportivos");
    };

    const handleCanchaDelete = (index) => {
        setFormData({
            ...formData,
            canchas: formData.canchas.filter((_, i) => i !== index)
        });
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
            ubicacionGeografica: {
                latitud: Deportivo.ubicacionGeografica.latitud,
                longitud: Deportivo.ubicacionGeografica.longitud
            },
            tipoDeEspacio: Deportivo.tipoDeEspacio,
            servicios: {
                baños: Deportivo.servicios.baños,
                comercios: Deportivo.servicios.comercios,
                vigilancia: Deportivo.servicios.vigilancia
            },
            puertasDeEntrada: Deportivo.puertasDeEntrada,
            aceptaMascotas: Deportivo.aceptaMascotas,
            horario: {
                lunes: Deportivo.horario.lunes,
                martes: Deportivo.horario.martes,
                miércoles: Deportivo.horario.miércoles,
                jueves: Deportivo.horario.jueves,
                viernes: Deportivo.horario.viernes,
                sábado: Deportivo.horario.sábado,
                domingo: Deportivo.horario.domingo
            },
            costo: Deportivo.costo,
            canchas: Deportivo.canchas.map(cancha => ({
                etiqueta: cancha.etiqueta || "",
                deporte: cancha.deporte || "",
                medidas: {
                    largo: cancha.medidas.largo || "",
                    ancho: cancha.medidas.ancho || ""
                },
                tipodesuelo: cancha.tipodesuelo || "",
                senalamientos: cancha.senalamientos || "",
                equipamiento: cancha.equipamiento || "",
                iluminacion: cancha.iluminacion || false,
                techado: cancha.techado || false,
                gradas: cancha.gradas || false,
                baños: cancha.baños || false,
                vestidores: cancha.vestidores || false,
                ubicacionGeografica: {
                    latitud: cancha.ubicacionGeografica.latitud || 1,
                    longitud: cancha.ubicacionGeografica.longitud || 1
                }
            }))
        });
    };

    const handleSave = () => {
        if (paramId) {
            modDepor(paramId, formData);
            window.location.reload(); // Refrescar la página después de guardar
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name.includes('.')) {
                const [parent, child] = name.split('.');
                setFormData((prevData) => ({
                    ...prevData,
                    [parent]: {
                        ...prevData[parent],
                        [child]: checked
                    }
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: checked
                }));
            }
        } else if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                [parent]: {
                    ...prevData[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
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

            <Label htmlFor="ubicacionGeografica">Ubicación Geografica</Label>

            <Label htmlFor="latitud">Latitud</Label>
            <Input id="latitud" name="ubicacionGeografica.latitud" value={formData.ubicacionGeografica.latitud} readOnly={!isEditing} onChange={handleChange} />

            <Label htmlFor="longitud">Longitud</Label>
            <Input id="longitud" name="ubicacionGeografica.longitud" value={formData.ubicacionGeografica.longitud} readOnly={!isEditing} onChange={handleChange} />

            <Label htmlFor="tipoDeEspacio">Tipo de Espacio</Label>
            <Input id="tipoDeEspacio" name="tipoDeEspacio" value={formData.tipoDeEspacio} readOnly={!isEditing} onChange={handleChange} />

            <Label htmlFor="servicios">Servicios</Label>
            <Checkbox id="baños" name="servicios.baños" checked={formData.servicios.baños} readOnly={!isEditing} onChange={handleChange} label="Baños" />
            <Checkbox id="comercios" name="servicios.comercios" checked={formData.servicios.comercios} readOnly={!isEditing} onChange={handleChange} label="Comercios" />
            <Checkbox id="vigilancia" name="servicios.vigilancia" checked={formData.servicios.vigilancia} readOnly={!isEditing} onChange={handleChange} label="Vigilancia" />

            <Label htmlFor="puertasDeEntrada">Puertas de Entrada</Label>
            <Input id="puertasDeEntrada" name="puertasDeEntrada" value={formData.puertasDeEntrada} readOnly={!isEditing} onChange={handleChange} />

            <Label htmlFor="aceptaMascotas">Acepta Mascotas</Label>
            <Checkbox id="aceptaMascotas" name="aceptaMascotas" checked={formData.aceptaMascotas} readOnly={!isEditing} onChange={handleChange} />

            <Label htmlFor="horario">Horario</Label>
            {days.map((day) => (
                <div key={day}>
                    <Label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</Label>
                    <Input id={day} name={`horario.${day}`} value={formData.horario[day]} readOnly={!isEditing} onChange={handleChange} />
                </div>
            ))}

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
                <Input id="costo" value={formData.costo} readOnly className="mb-4" />
            )}

            <Label htmlFor="canchas">Canchas</Label>

            {formData.canchas.map((cancha, index) => (
                <Card_cancha_mod
                    key={index}
                    cancha={cancha}
                    index={index}
                    isEditing={isEditing}
                    handleChange={(e) => {
                        const { name, value, type, checked } = e.target;

                        setFormData((prevState) => {
                            const updatedCanchas = [...prevState.canchas];
                            const path = name.split('.'); // Divide el nombre en niveles
                            let current = updatedCanchas[index]; // Selecciona la cancha actual

                            // Recorre los niveles del path excepto el último para llegar al objeto a modificar
                            for (let i = 1; i < path.length - 1; i++) {
                                current = current[path[i]];
                            }

                            // Actualiza el valor del campo final
                            current[path[path.length - 1]] = type === "checkbox" ? checked : value;

                            return {
                                ...prevState,
                                canchas: updatedCanchas,
                            };
                        });
                    }}
                    handleCanchaDelete={handleCanchaDelete}
                />
            ))}


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
