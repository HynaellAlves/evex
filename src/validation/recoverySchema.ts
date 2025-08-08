import * as z from "zod";

export const recoverySchema = z.object({
  email: z
    .string()
    .min(1, "Campo Obrigatório")
    .regex(/^[\w.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/, 'example@dominio.com')
    .optional(),

  password: z
    .string()
    .min(8, "Mínimo de 8 caracteres")
    .regex(/^[a-zA-Z0-9!.@#]+$/, 'Caracteres permitidos (A-Z | 0-9 | !@#)')
    .optional(),

  confirm: z
    .string()
    .min(8, "Mínimo de 8 caracteres")
    .regex(/^[a-zA-Z0-9!.@#]+$/, 'Caracteres permitidos (A-Z | 0-9 | !@#)')
    .optional(),
})
.superRefine((data, ctx) => {
  if (data.password && data.confirm && data.password !== data.confirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "As senhas precisam ser iguais",
      path: ["confirm"],
    });
  }
}); 