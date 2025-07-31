import * as z from "zod";

export const ownerSchema = z.object({
  name: z
    .string()
    .min(4, "Nome Obrigatório (Mínimo de 4 letras)")
    .regex(/^[a-zA-Z]+$/, "Somente letras")
    .optional(),

  email: z
    .string()
    .min(1, "Campo Obrigatório")
    .regex(/^[a-zA-Z0-9._]+@[a-zA-Z.]+.com$/, 'example@dominio.com')
    .optional(),

  date: z
    .string()
    .min(1, "Data Inválida")
    .optional()
    .refine(data => !data || !isNaN(Date.parse(data)), "Data inválida"),

  cep: z
    .string()
    .min(1, "CEP obrigatório")
    .optional(),

  number: z
    .string()
    .min(1, "Número obrigatório")
    .optional(),

  complement: z
    .string()
    .optional(),

  cpfCnpj: z
    .string()
    .min(11, "CPF/CNPJ inválido")
    .optional(),

  phonenumber: z
    .string()
    .min(8, "Telefone inválido")
    .optional(),

  profilephoto: z
    .string()
    .url("URL inválida")
    .optional(),

  password: z
    .string()
    .min(8, "Mínimo de 8 caracteres")
    .regex(/^[a-zA-Z0-9!@#]+$/, 'Caracteres permitidos (A-Z | 0-9 | !@#)')
    .optional(),

  confirm: z
    .string()
    .min(8, "Mínimo de 8 caracteres")
    .regex(/^[a-zA-Z0-9!@#]+$/, 'Caracteres permitidos (A-Z | 0-9 | !@#)')
    .optional(),

  defaultPassword: z
    .boolean()
    .optional(),

  createPassword: z
    .boolean()
    .optional(),

  userCreatesPassword: z
    .boolean()
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