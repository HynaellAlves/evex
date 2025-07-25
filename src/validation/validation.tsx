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

  confirm: z
    .string()
    .min(8, "Mínimo de 8 caracteres")
    .regex(/^[a-zA-Z0-9!@#]+$/, 'Caracteres permitidos (A-Z | 0-9 | !@#)')
    .optional(),

  name: z
    .string()
    .min(4, "Nome Obrigatório")
    .optional(),

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

  img: z
    .string()
    .url("URL inválida")
    .optional(),

  category: z
    .string()
    .min(1, "Selecione uma categoria")
    .optional(),

  date: z
    .string()
    .min(1, "Data obrigatória")
    .optional(),

  hour: z
    .string()
    .min(1, "Hora obrigatória")
    .optional(),

  eventDescription: z
    .string()
    .max(2000, "Máximo de 2000 caracteres")
    .optional(),

  localDefined: z
    .boolean()
    .optional(),

  local: z
    .string()
    .min(1, "Nome do local obrigatório")
    .optional(),

  showMap: z
    .boolean()
    .optional(),

  ticketType: z
    .enum(["pago", "gratis"], {
      message: "Selecione tipo de ingresso"
    })
    .optional(),

  ticketValue: z
    .string()
    .optional(),

  batch: z
    .string()
    .optional(),

  ticketDescription: z
    .string()
    .optional(),

  startSold: z
    .string()
    .refine((val) => val !== "", {
      message: "Data de início das vendas obrigatória",
    })
    .optional(),

  endSold: z
    .string()
    .refine((val) => val !== "", {
      message: "Data de término das vendas obrigatória",
    })
    .optional(),

  quantityForBuy: z
    .number()
    .min(1, "Quantidade mínima é 1")
    .optional(),

  absolveTax: z
    .boolean()
    .optional(),

  ticketNameHalfPrice: z
    .string()
    .optional(),

  ticketHalfPrice: z
    .string()
    .optional(),

  typeEvent: z
    .enum(["publico", "privado"], {
      message: "Selecione tipo de evento"
    })
    .optional(),

  terms: z
    .boolean()
    .refine((val) => val === true, {
      message: "Você deve aceitar os termos",
    })
    .optional(),

})

  /* 
  Preferi usar o superRefine, com ele você pode mesclar validações além dessa que eu já fiz
  Se usar o Refine não é possível realizar mais de uma, é meio que mesclar validações
  */
  .superRefine((data, ctx) => {
    if (data.password && data.confirm && data.password !== data.confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas precisam ser iguais",
        path: ["confirm"],
      });
    }
  });