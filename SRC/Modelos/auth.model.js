//Se importa mongoose
import mongoose from 'mongoose';

//Usamos el esquema para definir el objeto que especifica lo que se va a guardar
const userSchema = new mongoose.Schema(
    {

        nombreusuario: {
            type: String,
            required: true,
            trim: true
        },

        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },
        /*
        fotoPerfil: {
            type: String,
            default: ""
        }, */
        nivelPermiso: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0
        },
        solEnviadas: [
            {
                ID: { type: String, trim: true },
            },
        ],

        solRecibidas: [
            {
                ID: { type: String, trim: true },
            },
        ],

        amigos: [
            {
                ID: { type: String, trim: true },
            },
        ],
    },
);

/*El modelo indica como se guardan los datos en MongoDB
en este caso son parte de Usuario (nos permite interactuar con la BD)*/
export default mongoose.model('Usuario', userSchema);