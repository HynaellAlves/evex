import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/validation";
import type { z } from "zod";

type LoginData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  return useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
}
