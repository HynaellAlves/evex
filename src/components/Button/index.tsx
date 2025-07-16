// Você passa “informações” (props) pra ele e ele retorna algo baseado nelas.
//  Desta forma que podemos reutilizar o componente
import styles from "./button.module.css"
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
      className={styles.button_custom}>
      {texto}
    </button>
  );
}