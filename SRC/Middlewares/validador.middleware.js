
//Valida el esquema y lo ejecutamos en la funcion
export const validarEsquema = (schema) => (req, res, next) => {
    
    try {

        //Si la validación es correcta continua
        schema.parse(req.body);
        next();

    } catch (error) {

        //SI no es correcta manda el error
        return res.status(400).json({

            //Obtiene unicamente el error y no todo el objeto error
            error: error.errors.map(error => error.message)

        });
    }
}