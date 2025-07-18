import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  senha: z.string().min(8, "Senha deve ter ao menos 8 caracteres").optional(),
  senhaConfirm: z.string().min(8, "As senha devem ser iguais").optional(),
});
