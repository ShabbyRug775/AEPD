//importamos librerias
import { useForm } from 'react-hook-form';
import { registerRequest } from "../Api/axios";


function RegistrarUs() {
    //registra inputs
    const { register, handleSubmit } = useForm();
    const onSubmit = handleSubmit(async (values) => {
        const res = await registerRequest(values);
        console.log(res);
    });

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input type="text" {...register("nombreusuario", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Nombre del Usuario"
                />
                <input type="text" {...register('username', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Username'
                />
                <input type="email" {...register('email', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Correo'
                />
                <input type="password" {...register('password', { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Contraseña'
                />
                <button type='submit'>
                    Registrarse
                </button>

            </form>

        </div>
    )
}

export default RegistrarUs