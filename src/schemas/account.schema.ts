import { z } from "zod";

export const accountSchema = z
  .object({
    username: z
      .string({
        required_error: "El usuario es requerido",
      })
    ,
    new_username: z
      .string({
        required_error: "El nuevo usuario es requerido",
      })
    ,
    password: z
      .string({
        required_error: "La clave es requerida",
      })
    ,
    new_password: z
      .string({
        required_error: "La nueva clave es requerida",
      })
  })