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
        }
        /*
                solAmistad: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User' // Referencia a otros usuarios que enviaron solicitud
                    }
                ],
        
                amigos: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User' // Referencia a usuarios que son amigos
                    }
                ]
        
                
                partidasCreadas: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Partida' // Referencia a partidas creadas por el usuario
                }
                ] 
        */
    }
);

/*El modelo indica como se guardan los datos en MongoDB
en este caso son parte de Usuario (nos permite interactuar con la BD)*/
export default mongoose.model('Usuario', userSchema);