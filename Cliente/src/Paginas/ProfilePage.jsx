import React, { useState } from 'react';
import axios from 'axios';
import { usarUsuario } from '../Contexto/usuarioContexto';

const Perfil = () => {
    // Obtenemos la información del usuario desde el contexto
    const { Usuario, token } = usarUsuario();
    const [userData, setUserData] = useState({
        nombreusuario: Usuario.nombreusuario,
        username: Usuario.username,
        correo: Usuario.correo
    });

    const [isEditing, setIsEditing] = useState({
        nombreusuario: false,
        username: false,
        correo: false
    });

    const [newData, setNewData] = useState({
        nombreusuario: '',
        username: '',
        correo: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        });
    };

    const toggleEditing = (field) => {
        setIsEditing({
            ...isEditing,
            [field]: !isEditing[field]
        });
    };

    const handleUpdate = async (field) => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // Datos a enviar para la actualización
            const updateData = {
                [field]: newData[field],
                // Validación de la contraseña
                password: newData.password
            };

            // Solicitud al backend (SE CREA CONST EN usuario.js del Cliente?)
            const response = await axios.put(`/api/usuario/update/${field}`, updateData, config);

            /* Actualizar los datos en el frontend si la actualización fue exitosa (MISSING)
            setUserData({
                ...userData,
                [field]: newData[field]
            });*/

            // Limpiar el estado de edición y los campos de contraseña/nuevo valor
            setNewData({ ...newData, [field]: '', password: '' });
            toggleEditing(field); // Cierra el campo de edición

        } catch (error) {
            console.error("Error al actualizar el campo", error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Perfil del Usuario</h2>

            {/* Nombre de usuario */}
            <div>
                <p><strong>Nombre de usuario:</strong> {userData.nombreusuario}</p>
                <button onClick={() => toggleEditing('nombreusuario')}>
                    {isEditing.nombreusuario ? 'Cancelar' : 'Editar'}
                </button>
                {isEditing.nombreusuario && (
                    <div>
                        <input
                            type="text"
                            name="nombreusuario"
                            value={newData.nombreusuario}
                            onChange={handleInputChange}
                            placeholder="Nuevo nombre de usuario"
                        />
                        <input
                            type="password"
                            name="password"
                            value={newData.password}
                            onChange={handleInputChange}
                            placeholder="Contraseña actual"
                        />
                        <button onClick={() => handleUpdate('nombreusuario')} disabled={loading}>
                            {loading ? 'Actualizando...' : 'Guardar cambios'}
                        </button>
                    </div>
                )}
            </div>

            {/* Username */}
            <div>
                <p><strong>Username:</strong> {userData.username}</p>
                <button onClick={() => toggleEditing('username')}>
                    {isEditing.username ? 'Cancelar' : 'Editar'}
                </button>
                {isEditing.username && (
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={newData.username}
                            onChange={handleInputChange}
                            placeholder="Nuevo username"
                        />
                        <input
                            type="password"
                            name="password"
                            value={newData.password}
                            onChange={handleInputChange}
                            placeholder="Contraseña actual"
                        />
                        <button onClick={() => handleUpdate('username')} disabled={loading}>
                            {loading ? 'Actualizando...' : 'Guardar cambios'}
                        </button>
                    </div>
                )}
            </div>

            {/* Correo */}
            <div>
                <p><strong>Correo electrónico:</strong> {userData.correo}</p>
                <button onClick={() => toggleEditing('correo')}>
                    {isEditing.correo ? 'Cancelar' : 'Editar'}
                </button>
                {isEditing.correo && (
                    <div>
                        <input
                            type="email"
                            name="correo"
                            value={newData.email}
                            onChange={handleInputChange}
                            placeholder="Nuevo correo electrónico"
                        />
                        <input
                            type="password"
                            name="password"
                            value={newData.password}
                            onChange={handleInputChange}
                            placeholder="Contraseña actual"
                        />
                        <button onClick={() => handleUpdate('correo')} disabled={loading}>
                            {loading ? 'Actualizando...' : 'Guardar cambios'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Perfil;
