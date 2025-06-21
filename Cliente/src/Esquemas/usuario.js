// usuario.js
import { z } from "zod";

/* Validación de Registro */
export const SignInUpEsquema = z
  .object({
    nombreusuario: z
      .string()
      .min(1, { message: "El nombre de usuario es requerido" }),
    username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    email: z
      .string()
      .min(1, { message: "El correo es requerido" })
      .email({ message: "Correo inválido" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirma tu contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // El error aparecerá en confirmPassword
  });

/* Validación de login */
export const LogInEsquema = z.object({
  email: z
    .string({ required_error: "El correo es requerido" })
    .email({ message: "Correo inválido" }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
