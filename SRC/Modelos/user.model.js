//Se importa mongoose
import mongoose from 'mongoose';

//Usamos el esquema para definir el objeto que especifica lo que se va a guardar
const userSchema = new mongoose.Schema({
    //Nombre del usuario
    nombreusuario: {
        type: String,
        required: true,
        trim: true
    },
    //Username
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    //Correo
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    //Contraseña
    password: {
        type: String,
        required: true
    }
})

/*El modelo indica como se guardan los datos en MongoDB
en este caso son parte de Usuario (nos permite interactuar con la BD)*/
export default mongoose.model('Usuario', userSchema);