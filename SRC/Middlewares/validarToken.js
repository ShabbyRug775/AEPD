
import jwt from 'jsonwebtoken';//Importamos para verificar token
import { TOKEN_SECRET } from "../Configuracion/configuracion.js"; //Importamos TOKEN_SECRET
/*Funciones que se ejecutan antes de llegar a una ruta */

//Autenticación requerida
export const authRequired = (req, res, next) => {
    //Obtenemos las cookies del header
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Inicia sesión primero" });
    //Verifica el token secret
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalido" });
        //Del usuario decodificado se guarda en user que es la petición
        req.user = user;
        next();
    })

};