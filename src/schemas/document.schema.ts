import { z } from "zod";

export const documentSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
    ,
    content: z
      .string({
        required_error: "El contenido es requerido",
      }),
    key: z
      .string({
        required_error: "La clave es requerida",
      })
  })