//Importamos el modelo de usuario de user.models.js
import Usuario from '../Modelos/auth.model.js';
// Libreria para tokens web de json
import jwt from "jsonwebtoken";
//Importamos bcrypt para encriptar pass
import bcrypt from 'bcryptjs';
// Se manda a llamar el token de acceso
import { TOKEN_SECRET } from "../Configuracion/configuracion.js";
//Importamos el accesstoken
import { createAccessToken } from '../Libs/jwt.js';

//Funciones registrar y login que van a tener request y response
//Se exportan para mandarlas a auth.routes de routes
/*REGISTRAR USUARIO*/
export const SignInUp = async (req, res) => {

    try {
        /*Crea el objeto y después guarda los datos
        y lo metemos ne un try ctach porque es asincrono y
        debemos asegurar que se guarde el usuario*/
        //Creamos el objeto que contiene los datos(los definidos en user.model.js)
        const { nombreusuario, username, email, password, nivelPermiso } = req.body;
        // Se busca si hay un usuario con un correo ya usado
        const usarioEncontrado = await Usuario.findOne({ email });
        // Si lo encuentra manda un mensaje
        if (usarioEncontrado) return res.status(400).json({

            // Mensaje de correo encontrado
            message: ["Este correo ya se encuentra en uso"]

        });
        //encriptador aleatorio (10 veces)
        const hashPass = await bcrypt.hash(password, 10);

        const newUsuario = new Usuario({

            nombreusuario,
            username,
            email,
            password: hashPass,
            nivelPermiso,

        });

        //Guarda el usuario
        const usuarioGuardado = await newUsuario.save();

        //Solo guardamos el id dle usuartio en el token
        const token = await createAccessToken({ id: usuarioGuardado._id });

        // Se manda el token para revisión
        res.cookie("token", token, {

            secure: true,
            sameSite: "none"

        });

        //Devuelve id, username y email, que son datos que se usarán en front
        res.json({

            id: usuarioGuardado._id,
            nombreusuario: usuarioGuardado.nombreusuario,
            username: usuarioGuardado.username,
            email: usuarioGuardado.email,
            nivelPermiso: usuarioGuardado.nivelPermiso,

        });

    } catch (error) {
        //Respuesta al cliente en caso de error
        res.status(500).json({ message: error.message });
    }
};
/*LOGIN USUARIO*/
//Se exportan para mandarlas a auth.routes de routes
export const LogIn = async (req, res) => {

    try {
        //Solo guardamos email y password que es lo que se pide para login
        const { email, password } = req.body;
        /*Crea el objeto y después guarda los datos
        y lo metemos ne un try ctach porque es asincrono y
        debemos asegurar que se guarde el usuario*/
        //Buscamos si el usuario existe
        //Usamos el modelo de usuario para buscar un usuario por email
        const usuarioFound = await Usuario.findOne({ email });
        //Si no encuentra al usuario
        if (!usuarioFound) return res.status(400).json({

            // Mensaje de usuario no encontrado
            message: ["Usuario no encontrado"]

        });

        //Comparamos la contraseña del cliente con la del objeto
        const isMatch = await bcrypt.compare(password, usuarioFound.password);
        //Si la contraseña no es correcta
        if (!isMatch) return res.status(400).json({

            // Mensaje de contraseña incorrecta
            message: ["Contraseña incorrecta"]

        });

        //Si encuentra al usuario creamos token con su id
        const token = await createAccessToken({ id: usuarioFound._id });

        // Se manda el token para revisión
        res.cookie("token", token, {

            secure: true,
            sameSite: "none"

        });

        //Devuelve id, username y email, que son datos que se usarán en front
        res.json({

            id: usuarioFound._id,
            username: usuarioFound.username,
            nombreusuario: usuarioFound.nombreusuario,
            email: usuarioFound.email,
            nivelPermiso: usuarioFound.nivelPermiso,

        });
    } catch (error) {

        //Respuesta al cliente en caso de error
        res.status(500).json({ message: error.message });

    }
};

/*VERIFICACIÓN DE TOKEN ACTIVO*/
// Verificación del token
export const verifyToken = async (req, res) => {

    // Constante de token
    const { token } = req.cookies;

    // Si el token no coincide manda un false
    if (!token) return res.send(false);

    // Verificación del token
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {

        // Si ocurre un error lo manda
        if (error) return res.sendStatus(401);

        // Se busca al usuario por su id
        const usarioEncontrado = await Usuario.findById(user.id);

        // Si no se encuentra se manda un mensaje de error
        if (!usarioEncontrado) return res.sendStatus(401);

        // Se regresa la información del usuario
        return res.json({

            id: usarioEncontrado._id,
            nombreusuario: usarioEncontrado.nombreusuario,
            username: usarioEncontrado.nombreusuario,
            email: usarioEncontrado.email,
            nivelPermiso: usarioEncontrado.nivelPermiso,

        });

    });
};

/*LOGOUT USUARIO*/
//Se exporta logout para hacer una ruta post en auth.routes
export const LogOut = (req, res) => {

    //Expira el token
    res.cookie('token', "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });

    // Retorna el status de la sesión
    return res.sendStatus(200);
};

/* PERFIL USUARIO */
// Obtener el perfil del usuario junto con sus solicitudes de amistad y amigos
export const Profile = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.Usuario.id);

        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({
            id: usuario._id,
            nombreusuario: usuario.nombreusuario,
            username: usuario.username,
            email: usuario.email,
            nivelPermiso: usuario.nivelPermiso,

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const consulsUsuarios = async (req, res) => {
    try {
        const userId = req.Usuario.id;

        const usuarioAutenticado = await Usuario.findById(userId);
        if (!usuarioAutenticado) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const amigosId = usuarioAutenticado.amigos.map(amigo => amigo.ID);
        const solicitudesEnviadasId = usuarioAutenticado.solEnviadas.map(sol => sol.ID);
        const solicitudesRecibidasId = usuarioAutenticado.solRecibidas.map(sol => sol.ID);

        const idsAExcluir = [userId, ...amigosId, ...solicitudesEnviadasId, ...solicitudesRecibidasId];

        const usuarios = await Usuario.find({ _id: { $nin: idsAExcluir } }).select("nombreusuario username email");

        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return res.status(500).json({ message: error.message });
    }
};


export const enviarSolicitudAmistad = async (req, res) => {
    try {
        const { idUsuarioReceptor } = req.body;
        const idUsuarioEmisor = req.Usuario.id;

        const usuarioEmisor = await Usuario.findById(idUsuarioEmisor);
        const usuarioReceptor = await Usuario.findById(idUsuarioReceptor);

        if (!usuarioEmisor || !usuarioReceptor) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const solicitudExistente = usuarioEmisor.solEnviadas.some(
            solicitud => solicitud.ID === idUsuarioReceptor
        );
        if (solicitudExistente) {
            return res.status(400).json({ message: "Solicitud ya enviada" });
        }

        usuarioEmisor.solEnviadas.push({ ID: idUsuarioReceptor });
        usuarioReceptor.solRecibidas.push({ ID: idUsuarioEmisor });

        await usuarioEmisor.save();
        await usuarioReceptor.save();

        return res.status(200).json({ message: "Solicitud de amistad enviada" });

    } catch (error) {
        console.error("Error al enviar solicitud de amistad:", error);
        return res.status(500).json({ message: error.message });
    }
};


export const obtenerSolicitudesRecibidas = async (req, res) => {
    try {
        const userId = req.Usuario.id;
        const usuario = await Usuario.findById(userId).select("solRecibidas");

        if (!usuario) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const solicitudes = await Usuario.find({
            _id: { $in: usuario.solRecibidas.map(sol => sol.ID) },
        }).select("_id nombreusuario username email");

        return res.status(200).json(solicitudes);
    } catch (error) {
        console.error("Error al obtener solicitudes recibidas:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const aceptarSolicitudAmistad = async (req, res) => {
    try {
        const { idUsuarioEmisor } = req.body;
        const idUsuarioReceptor = req.Usuario.id;

        // Buscar ambos usuarios
        const usuarioReceptor = await Usuario.findById(idUsuarioReceptor);
        const usuarioEmisor = await Usuario.findById(idUsuarioEmisor);

        if (!usuarioReceptor || !usuarioEmisor) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que la solicitud exista
        const solicitudExiste = usuarioReceptor.solRecibidas.some(solicitud => solicitud.ID === idUsuarioEmisor);
        if (!solicitudExiste) {
            return res.status(400).json({ message: "Solicitud no encontrada" });
        }

        // Agregar ambos usuarios como amigos
        usuarioReceptor.amigos.push({ ID: idUsuarioEmisor });
        usuarioEmisor.amigos.push({ ID: idUsuarioReceptor });

        // Eliminar la solicitud de amistad
        usuarioReceptor.solRecibidas = usuarioReceptor.solRecibidas.filter(solicitud => solicitud.ID !== idUsuarioEmisor);
        usuarioEmisor.solEnviadas = usuarioEmisor.solEnviadas.filter(solicitud => solicitud.ID !== idUsuarioReceptor);

        await usuarioReceptor.save();
        await usuarioEmisor.save();

        return res.status(200).json({ message: "Solicitud de amistad aceptada" });
    } catch (error) {
        console.error("Error al aceptar solicitud de amistad:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const rechazarSolicitudAmistad = async (req, res) => {
    try {
        const { idUsuarioEmisor } = req.body;
        const idUsuarioReceptor = req.Usuario.id;

        // Buscar ambos usuarios
        const usuarioReceptor = await Usuario.findById(idUsuarioReceptor);
        const usuarioEmisor = await Usuario.findById(idUsuarioEmisor);

        if (!usuarioReceptor || !usuarioEmisor) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que la solicitud exista
        const solicitudExiste = usuarioReceptor.solRecibidas.some(solicitud => solicitud.ID === idUsuarioEmisor);
        if (!solicitudExiste) {
            return res.status(400).json({ message: "Solicitud no encontrada" });
        }

        // Eliminar la solicitud de amistad
        usuarioReceptor.solRecibidas = usuarioReceptor.solRecibidas.filter(solicitud => solicitud.ID !== idUsuarioEmisor);
        usuarioEmisor.solEnviadas = usuarioEmisor.solEnviadas.filter(solicitud => solicitud.ID !== idUsuarioReceptor);

        await usuarioReceptor.save();
        await usuarioEmisor.save();

        return res.status(200).json({ message: "Solicitud de amistad rechazada" });
    } catch (error) {
        console.error("Error al rechazar solicitud de amistad:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerAmigos = async (req, res) => {
    const usuarioId = req.Usuario.id;

    try {
        // Buscar al usuario por su ID y obtener los datos de sus amigos
        const usuario = await Usuario.findById(usuarioId);

        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Obtener los amigos basados en los IDs de amigos
        const amigos = await Usuario.find({
            _id: { $in: usuario.amigos.map(amigo => amigo.ID) },
        }).select("nombreusuario username email");

        // Enviar los amigos encontrados como respuesta
        res.status(200).json(amigos);
    } catch (error) {
        console.error("Error al obtener amigos:", error);
        res.status(500).send("Error al obtener amigos");
    }
};


/* Eliminar amigo de lista de amigos */
export const eliminarAmigo = async (req, res) => {
    const { amigoId } = req.body;
    const usuarioId = req.Usuario.id;
    console.log('amigoId recibido:', amigoId);

    try {
        // Eliminar el ID del amigo de la lista de amigos del usuario
        await Usuario.findByIdAndUpdate(usuarioId, {
            $pull: { amigos: { ID: amigoId } }
        });

        // Eliminar el ID del usuario de la lista de amigos del amigo
        await Usuario.findByIdAndUpdate(amigoId, {
            $pull: { amigos: { ID: usuarioId } }
        });

        res.status(200).send("Amigo eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar amigo:", error);
        res.status(500).send("Error al eliminar amigo");
    }
};

/*Editar datos del usuario*/
export const actualizarPerfil = async (req, res) => {
    try {
        const userId = req.Usuario.id;
        const { nombreusuario, username, password } = req.body;

        // Buscar al usuario en la base de datos por su ID
        const usuario = await Usuario.findById(userId);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Actualizar los campos del usuario si la contraseña es válida
        usuario.nombreusuario = nombreusuario || usuario.nombreusuario;
        usuario.username = username || usuario.username;

        await usuario.save();

        return res.status(200).json({ message: "Perfil actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        return res.status(500).json({ message: error.message });
    }
};

/*Eliminar cuenta */
export const eliminarCuenta = async (req, res) => {
    try {
        const userId = req.Usuario.id;
        const { password } = req.body;

        // Buscar al usuario en la base de datos por su ID
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Eliminar el usuario de la base de datos
        await Usuario.findByIdAndDelete(userId);

        // Limpiar la ID de amigos, solEnviadas, solRecibidas
        await eliminarReferenciasUsuario(userId);

        return res.status(200).json({ message: "Cuenta eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar cuenta:", error);
        return res.status(500).json({ message: error.message });
    }
};

/* Eliminar usuario de la faz de la tierra */
const eliminarReferenciasUsuario = async (userId) => {
    try {
        // Eliminar el usuario de las solicitudes enviadas y recibidas
        await Solicitudes.deleteMany({ $or: [{ usuarioEmisor: userId }, { usuarioReceptor: userId }] });

        // Eliminar el usuario de los amigos
        await Amigos.deleteMany({ $or: [{ usuario1: userId }, { usuario2: userId }] });

    } catch (error) {
        console.error("Error al eliminar referencias de usuario:", error);
    }
};

