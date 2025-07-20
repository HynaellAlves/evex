/* 
Identei o código para ficar fácil de visualizar.
Adicionei o .optional() para que o form só valide se o input estiver nele
foi aquela coisa que eu comentei no discord
*/

// validation/validation.ts
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

  senhaConfirm: z
    .string()
    .min(8, "Mínimo de 8 caracteres")
    .regex(/^[a-zA-Z0-9!@#]+$/, 'Caracteres permitidos (A-Z | 0-9 | !@#)')
    .optional(),

  nome: z
    .string()
    .min(4, "Nome Obrigatório")
    .optional(),

  dataNascimento: z
    .string()
    .min(1, "Data obrigatória")
    .optional(),

  cep: z
    .string()
    .min(1, "CEP obrigatório")
    .optional(),

  numero: z
    .string()
    .min(1, "Número obrigatório")
    .optional(),

  complemento: z
    .string()
    .optional(),

  cpfCnpj: z
    .string()
    .min(11, "CPF/CNPJ inválido")
    .optional(),

  telefone: z
    .string()
    .min(8, "Telefone inválido")
    .optional(),

  fotoPerfil: z
    .string()
    .url("URL inválida")
    .optional(),
})

/* 
Preferi usar o superRefine, com ele você pode mesclar validações além dessa que eu já fiz
Se usar o Refine não é possível realizar mais de uma, é meio que mesclar validações
*/
  .superRefine((data, ctx) => {
    if (data.password && data.senhaConfirm && data.password !== data.senhaConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas precisam ser iguais",
        path: ["senhaConfirm"],
      });
    }
  });