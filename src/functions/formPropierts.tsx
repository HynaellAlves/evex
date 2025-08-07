import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/loginSchema";
import { eventSchema } from "@/validation/eventSchema";
import { recoverySchema } from "@/validation/recoverySchema";
import { ownerSchema } from "@/validation/ownerSchema";
import type { z } from "zod";

type LoginData = z.infer<typeof loginSchema>;
type EventData = z.infer<typeof eventSchema>;
type RecoveryData = z.infer<typeof recoverySchema>;
type OwnerData = z.infer<typeof ownerSchema>;

export function useLoginForm(options?: UseFormProps<LoginData>) {
  return useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    ...options
  });
}

export function useEventForm(options?: UseFormProps<EventData>) {
  return useForm<EventData>({
    resolver: zodResolver(eventSchema),
    ...options
  });
}

export function useRecoveryForm(options?: UseFormProps<RecoveryData>) {
  return useForm<RecoveryData>({
    resolver: zodResolver(recoverySchema),
    ...options
  });
}

export function useOwnerForm(options?: UseFormProps<OwnerData>) {
  return useForm<OwnerData>({
    resolver: zodResolver(ownerSchema),
    ...options
  });
}

export function calcularIdade(dataNascimento: string): number {
  const [dia, mes, ano] = dataNascimento.split("/").map(Number);
  const hoje = new Date();
  let idade = hoje.getFullYear() - ano;
  const mesAtual = hoje.getMonth() + 1; // mês começa em 0
  const diaAtual = hoje.getDate();

  if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
    idade--;
  }

  return idade;
}
