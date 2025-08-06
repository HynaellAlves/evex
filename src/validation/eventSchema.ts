import * as z from "zod";

export const eventSchema = z.object({
  eventName: z
    .string()
    .min(4, "Nome Obrigatório (Mínimo de 4 caractéres)")
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
    .string("Somente textos e números")
    .max(2000, "Máximo de 2000 caracteres")
    .optional(),

  eventAttractions: z
    .string("Somente Texto")
    .min(1, "Ao menos uma atração"),

  local: z
    .string()
    .min(1, "Nome do local obrigatório")
    .optional(),

  completeAdress: z
    .string()
    .min(10, "Campo Obrigatório")
    .optional(),

  eventCep: z
    .string()
    .min(8, "CEP Obrigatório (8 dígitos)")
    .regex(/^\d+$/, "Somente números")
    .optional(),

  eventNumber: z
    .string()
    .regex(/^\s*\d*\s*$/, "Somente números")
    .optional(),

  eventComplement: z
    .string()
    .optional(),

  ticketWhole: z
    .string()
    .refine((val) => {
      // Aceita diferentes formatos de moeda baseados no locale
      const currencyRegex = /^([Rr]\$)?\s*\d{1,3}(\.\d{3})*(,|\.)\d{2}\s*$/;
      return currencyRegex.test(val);
    }, "Formato inválido (ex: R$ 50,00 ou $50.00)"),

  ticketWholeQuantity: z
    .string()
    .regex(/^\d*$/, "Somente números")
    .min(1, "Quantidade Obrigatória"),

  ticketHalf: z
    .string()
    .refine((val) => {
      // Aceita diferentes formatos de moeda baseados no locale
      const currencyRegex = /^([Rr]\$)?\s*\d{1,3}(\.\d{3})*(,|\.)\d{2}\s*$/;
      return currencyRegex.test(val);
    }, "Formato inválido (ex: R$ 50,00 ou $50.00)"),

  ticketHalfQuantity: z
    .string()
    .regex(/^\d*$/, "Somente números")
    .min(1, "Quantidade Obrigatória"),

  ticketPair: z
    .string()
    .refine((val) => {
      // Aceita diferentes formatos de moeda baseados no locale
      const currencyRegex = /^([Rr]\$)?\s*\d{1,3}(\.\d{3})*(,|\.)\d{2}\s*$/;
      return currencyRegex.test(val);
    }, "Formato inválido (ex: R$ 50,00 ou $50.00)"),

  ticketPairQuantity: z
    .string("Teste")
    .regex(/^\d*$/, "Somente números")
    .min(1, "Quantidade Obrigatória"),

  ticketDescription: z
    .string()
    .optional(),

  terms: z
    .boolean()
    .refine((val) => val === true, {
      message: "Você deve aceitar os termos",
    }),
}).superRefine((data, ctx) => {

  if (data.startDateEvent && data.endDateEvent && data.startHourEvent && data.endHourEvent) {

    const startDate = Date.parse(data.startDateEvent)
    const endDate = Date.parse(data.endDateEvent)
    const [startHour, startMinutes] = data.startHourEvent.split(":").map(Number);
    const [endHour, endMinutes] = data.endHourEvent.split(":").map(Number);

    if (startDate > endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Data de início maior",
        path: ["startDateEvent"],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Data de término menor",
        path: ["endDateEvent"],
      });
    } else if (startDate == endDate) {

      const start = startHour * 60 + startMinutes
      const end = endHour * 60 + endMinutes

      if (start >= end) {

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hora de início maior ou igual",
          path: ["startHourEvent"],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hora de término menor ou igual",
          path: ["endHourEvent"],
        });
      }
    }
  }

  // Validando se o valor está zerado, se estiver a quantidade não é obrigatória

  if (data.ticketWhole && data.ticketWholeQuantity) {

    // Esse caracter de espaçamento estranho precisou ser mantido para conseguir validar
    if (data.ticketWhole !== "R$ 0,00" && data.ticketWholeQuantity == "0" || undefined) {
      console.log(data.ticketWhole)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A quantidade é obrigatória",
        path: ["ticketWholeQuantity"],
      });
    }
  }

  if (data.ticketHalf && data.ticketHalfQuantity) {

    if (data.ticketHalf !== "R$ 0,00" && data.ticketHalfQuantity == "0" || undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A quantidade é obrigatória",
        path: ["ticketHalfQuantity"],
      });
    }
  }

  if (data.ticketPair && data.ticketPairQuantity) {

    if (data.ticketPair !== "R$ 0,00" && data.ticketPairQuantity == "0" || undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A quantidade é obrigatória",
        path: ["ticketPairQuantity"],
      });
    }
  }

  if (data.ticketPairQuantity && data.ticketHalfQuantity && data.ticketWholeQuantity) {

    if (Number(data.ticketPairQuantity) == 0 && Number(data.ticketHalfQuantity) == 0 && Number(data.ticketWholeQuantity) == 0) {

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Quantidade mínima de um tipo",
        path: ["ticketPairQuantity"],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Quantidade mínima de um tipo",
        path: ["ticketHalfQuantity"],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Quantidade mínima de um tipo",
        path: ["ticketWholeQuantity"],
      });
    }
  }
})