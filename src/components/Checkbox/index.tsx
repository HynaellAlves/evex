{/* Checkbox eu acho que vai ter que consumir uma api, pois temos que guarda o estado  */}

import { useState } from "react";

export default function Checkbox() {
  const [checked, setChecked] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const marcado = e.target.checked;
    setChecked(marcado);

    try {
      //  Chamada API simulada. so para fim de exemplo/estudo
      const response = await fetch("/api/lembrar-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lembrarMe: marcado }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar preferência");
      }

      console.log("Preferência enviada com sucesso!");
    } catch (error) {
      console.error("Falha ao enviar:", error);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="lembrar-me"
        checked={checked}
        onChange={handleChange}
        className="h-5 w-5 border-2 border-purple-500 rounded focus:ring-0"
      />
      <label htmlFor="lembrar-me" className="ml-2 text-purple-900">
        Lembrar-me
      </label>
    </div>
  );
}