
import jwt from 'jsonwebtoken';//Importamos para verificar token
import { TOKEN_SECRET } from "../Configuracion/configuracion.js"; //Importamos TOKEN_SECRET
/*Funciones que se ejecutan antes de llegar a una ruta */

//Autenticación requerida
export const user = (req, res, next) => {

    try {
        //Obtenemos las cookies del header
        const { token } = req.cookies;

        // Si no hay token no coincide
        if (!token) return res.status(401).json({ message: "Inicia sesión primero" });

        //Verifica el token secret
        jwt.verify(token, TOKEN_SECRET, (err, user) => {

            // Si ocurre algún error lo muestra
            if (err) {

                // Se muestra un mensaje si el token no es valido
                return res.status(403).json({ message: "Token invalido" });

            }

            // Si el usuario coincide lo asigna a usuario requerido
            req.user = user;
            next();

        });
    } catch (error) {

        // Si hay un error lo manda
        return res.status(500).json({ message: error.message });

    }
};