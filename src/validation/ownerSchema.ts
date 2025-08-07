import * as z from "zod";
import { parse, isValid } from 'date-fns';

export const ownerSchema = z.object({
  name: z
    .string()
    .min(4, "Nome Obrigatório (Mínimo de 4 letras)")
    .regex(/^[A-ZÀ-Ÿ][a-zà-ÿ]+(?:[-'][A-ZÀ-Ÿ]?[a-zà-ÿ]+)*(?: [A-ZÀ-Ÿ][a-zà-ÿ]+(?:[-'][A-ZÀ-Ÿ]?[a-zà-ÿ]+)*)*$/, "Somente letras e espaços")
    .optional(),

  email: z
    .string()
    .min(1, "Campo Obrigatório")
    .regex(/^[a-zA-Z0-9._]+@[a-zA-Z.]+.com$/, 'example@dominio.com')
    .optional(),

  date: z
    .string()
    .min(10)
    .refine(data => {
      if (!data) return true;
      const parsed = parse(data, 'dd/MM/yyyy', new Date());
      return isValid(parsed);
    }, "Data inválida"),

  cep: z
    .string()
    .min(8, "CEP obrigatório")
    .regex(/^\d+$/, "Somente números")
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
    .regex(/^\d+$/, "Somente números")
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

    if (data.password && data.createPassword) {
      if (data.createPassword == true) {

        const senhaValida = /^[a-zA-Z0-9!@#]+$/.test(data.password);
        console.log(senhaValida)
        if (!senhaValida) {
          console.log("Entrando")
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Senha incorreta",
            path: ["password"],
          });
        }
      }
    }
  }); 