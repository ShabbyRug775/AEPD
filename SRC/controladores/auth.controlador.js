//Importamos el modelo de usuario de user.models.js
import Usuario from '../Modelos/user.model.js';
//Importamos bcrypt para encriptar pass
import bcrypt from 'bcryptjs';
//Importamos el accesstoken
import { createAccessToken } from '../Libs/jwt.js';

//Funciones registrar y login que van a tener request y response
//Se exportan para mandarlas a auth.routes de routes
/*REGISTRAR USUARIO*/
export const registrar = async (req, res) => {
    //Creamos el objeto que contiene los datos(los definidos en user.model.js)
    const { nombreusuario, username, email, password } = req.body;
    /*Crea el objeto y después guarda los datos
    y lo metemos ne un try ctach porque es asincrono y
    debemos asegurar que se guarde el usuario*/
    try {
        //encriptador aleatorio (10 veces)
        const hashPass = await bcrypt.hash(password, 10);

        const newUsuario = new Usuario({
            nombreusuario,
            username,
            email,
            password: hashPass,
        });
        //Guarda el usuario
        const usuarioGuardado = await newUsuario.save();
        //Solo guardamos el id dle usuartio en el token
        const token = await createAccessToken({ id: usuarioGuardado._id });
        //Lo guarda en la cookie
        res.cookie('token', token);
        //Devuelve id, username y email, que son datos que se usarán en front
        res.json({
            id: usuarioGuardado._id,
            username: usuarioGuardado.username,
            email: usuarioGuardado.email,
        });
    } catch (error) {
        //Respuesta al cliente en caso de error
        res.status(500).json({ message: error.message });
    }
};
/*LOGIN USUARIO*/
//Se exportan para mandarlas a auth.routes de routes
export const login = async (req, res) => {
    //Solo guardamos email y password que es lo que se pide para login
    const { email, password } = req.body;
    /*Crea el objeto y después guarda los datos
    y lo metemos ne un try ctach porque es asincrono y
    debemos asegurar que se guarde el usuario*/
    try {
        //Buscamos si el usuario existe
        //Usamos el modelo de usuario para buscar un usuario por email
        const usuarioFound = await Usuario.findOne({ email });
        //Si no encuentra al usuario
        if (!usuarioFound) return res.status(400).json({ message: "Usuario no encontrado" });

        //Comparamos la contraseña del cliente con la del objeto
        const isMatch = await bcrypt.compare(password, usuarioFound.password);
        //Si la contraseña no es correcta
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" })

        //Si encuentra al usuario creamos token con su id
        const token = await createAccessToken({ id: usuarioFound._id });
        //Lo guarda en la cookie
        res.cookie('token', token);
        //Devuelve id, username y email, que son datos que se usarán en front
        res.json({
            id: usuarioFound._id,
            username: usuarioFound.username,
            email: usuarioFound.email,
        });
    } catch (error) {
        //Respuesta al cliente en caso de error
        res.status(500).json({ message: error.message });
    }
};

/*LOGOUT USUARIO*/
//Se exporta logout para hacer una ruta post en auth.routes
export const logout = (req, res) => {
    //Expira el token
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};
/* PERFIL USUARIO (mientras se realiza html)*/
export const perfil = async (req, res) => {
    //Todos los datos de usuario se guardan
    const usuarioFound = await Usuario.findById(req.user.id);
    //usuario no encontrado
    if (!usuarioFound) return res.status(400).json({ message: "Usuario no encontrado" });
    //Regresa datos del usuario
    return res.json({
        id: usuarioFound._id,
        nombreusuario: usuarioFound.nombreusuario,
        username: usuarioFound.username,
        email: usuarioFound.email,
    });
};

