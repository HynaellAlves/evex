import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Campo Obrigatório")
    .regex(/^[a-zA-Z0-9._]+@[a-zA-Z.]+.com$/, 'example@dominio.com')
    .optional(),

  password: z
    .string()
    .min(8, "Mínimo de 8 caracteres")
    .regex(/^[a-zA-Z0-9!@#]+$/, 'Caracteres permitidos (A-Z | 0-9 | !@#)')
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