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
        // Obtenemos el ID del usuario autenticado desde `req.user`
        const userId = req.Usuario.id;

        // Buscamos usuarios excluyendo al usuario autenticado actual
        const usuarios = await Usuario.find({ _id: { $ne: userId } });

        return res.status(200).json(usuarios);
    } catch (error) {
        // Imprime el error en la consola del servidor
        console.error('Error al obtener los usuarios:', error);

        return res.status(500).json({ message: error.message }); // Manejo de errores
    }
};
