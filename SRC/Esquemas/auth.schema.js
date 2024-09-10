/* NOTA: Para las validaciones se esta usando el sistema de esquemas de "Zod".
Este es el esquema de validaciones para autenticación de usuario
 */

//Importamos libreria
import { z } from 'zod';

/* Validación de Registro*/
export const registroEsquema = z.object({ //Esquema de registro

    nombreusuario: z.string({
        required_error: 'El Nombre de Usuario es requerido',
    }),
    username: z.string({
        required_error: 'El Username es requerido',
    }),
    email: z.string({
        required_error: 'El Correo es requerido',
    }).email({
        required_error: 'Correo invalido',
    }),
    password: z.string({
        required_error: 'Coloca una contraseña',
    }).min({
        required_error: 'La contraseña debe tener al menos 6 caracteres',
    })
    
});

/* Validación de login*/
export const loginEsquema = z.object({ //Esquema de login
    
    email: z.string().email(),
    password: z.string().min(6),

});