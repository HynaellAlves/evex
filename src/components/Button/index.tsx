// Você passa “informações” (props) pra ele e ele retorna algo baseado nelas.
//  Desta forma que podemos reutilizar o componente
interface BotaoAvancarProps {
  texto?: string;
  onClick?: () => void;
  className?: string;
}
// a ideia e que esse botão seja reutilizado ao logo do projetoo
export default function BotaoAvancar({
  texto = "AVANÇAR",
  onClick, // pronto para receber sua função de redirecionamento mais tarde
  className = "", // podemos estilizar com Tailwind ou colocar css aparte 
}: BotaoAvancarProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-[346px] left-[898px] w-[168px] h-[62px] rounded-[20px] bg-yellow-400 text-black shadow-md opacity-100 hover:bg-yellow-500 transition-colors duration-300 font-semibold ${className}`}>
      {texto}
    </button>
  );
}