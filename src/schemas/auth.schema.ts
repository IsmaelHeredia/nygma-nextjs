import { z } from "zod";

export const authSchema = z
  .object({
    username: z
      .string({
        required_error: "El usuario es requerido",
      })
    ,
    password: z
      .string({
        required_error: "La clave es requerida",
      })
  })