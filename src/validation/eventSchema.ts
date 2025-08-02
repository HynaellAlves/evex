import * as z from "zod";

export const eventSchema = z.object({
  eventName: z
    .string()
    .min(4, "Nome Obrigatório (Mínimo de 4 caractéres)")
    .regex(/^[a-zA-Z0-9\s]+$/, "Somente letras e números")
    .optional(),

  img: z
    .string()
    .url("Formato URL inválido")
    .optional(),

  category: z
    .string()
    .min(1, "Selecione uma categoria")
    .optional(),

  startDateEvent: z
    .string()
    .min(1, "Data Inválida")
    .optional()
    .refine(data => !data || !isNaN(Date.parse(data)), "Data inválida"),

  endDateEvent: z
    .string()
    .min(1, "Data Inválida")
    .optional()
    .refine(data => !data || !isNaN(Date.parse(data)), "Data inválida"),

  startHourEvent: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Hora Inválida")
    .optional(),

  endHourEvent: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Hora Inválida")
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

  eventCep: z
    .string()
    .min(1, "CEP obrigatório")
    .regex(/^\d+$/, "Somente números")
    .optional(),

  eventNumber: z
    .string()
    .regex(/^\d+$/, "Somente números")
    .optional(),

  eventComplement: z
    .string()
    .optional(),

  ticketType: z
    .enum(["pago", "gratis"], {
      message: "Selecione tipo de ingresso"
    }),

  ticketValue: z
    .string()
    .min(1, "Valor do ingresso obrigatório")
    .refine((val) => {
      // Aceita diferentes formatos de moeda baseados no locale
      const currencyRegex = /^[^\d]*\d+[.,]\d{2}$/;
      return currencyRegex.test(val);
    }, "Formato inválido (ex: R$ 50,00 ou $50.00)"),

  startSold: z
    .string()
    .refine((val) => val !== "", {
      message: "Data Inválida",
    })
    .optional(),

  endSold: z
    .string()
    .refine((val) => val !== "", {
      message: "Data Inválida",
    })
    .optional(),

  quantity: z
    .string()
    .min(1, "Quantidade obrigatória")
    .optional(),

  absolveTax: z
    .boolean()
    .optional(),

  ticketDescription: z
    .string()
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
    }),

  terms: z
    .boolean()
    .refine((val) => val === true, {
      message: "Você deve aceitar os termos",
    }),
}); 