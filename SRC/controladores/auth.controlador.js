//Importamos el modelo de usuario de user.models.js
import Usuario from '../Modelos/user.model.js';
//Importamos bcrypt para encriptar pass
import bcrypt from 'bcryptjs';
//Importamos el de los tokens xd
import jwt from 'jsonwebtoken';

//Funciones registrar y login que van a tener request y response
//Se exportan para mandarlas a auth.routes de routes
export const registrar = async (req, res) => {
    //Creamos el objeto que contiene los datos(los definidos en user.model.js)
    const { nombreusuario, username, email, password } = req.body;
    /*Crea el objeto y después guarda los datos
    y lo metemos ne un try ctach porque es asincrono y
    debemos asegurar que se guarde el usuario*/
    try {
        //encriptador aleatorio (10 veces)
        const hashPass = await bcrypt.hash(password, 10)

        const newUsuario = new Usuario({
            nombreusuario,
            username,
            email,
            password: hashPass,
        });
        //Guarda el usuario
        const usuarioGuardado = await newUsuario.save();

        //Datos que se guardan en el token
        jwt.sign({
            id: usuarioGuardado._id,
            //Key
        }, "secret123",
            //Expiracion del token
            {
                expiresIn: "1d",
            },
            //Callback
            (err, token) => {
                //Muestra error
                if (err) console.log(err);
                //SI no hay error devuelve el token al cliente
                res.json({ token });
                //POR SEGUIR AQUI (YO)
            }
        );
        //Devuelve id, username y email, que son datos que se usarán en front
        res.json({
            id: usuarioGuardado._id,
            username: usuarioGuardado.username,
            email: usuarioGuardado.email,
        });
    } catch (error) {
        console.log(error);
    }
};

export const login = (req, res) => res.send("login");