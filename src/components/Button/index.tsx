// Você passa “informações” (props) pra ele e ele retorna algo baseado nelas.
//  Desta forma que podemos reutilizar o componente
import styles from "./button.module.css"
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
}
// a ideia e que esse botão seja reutilizado ao logo do projetoo
export default function Button({
  text,
  type,
  onClick, // pronto para receber sua função de redirecionamento mais tarde
  className, // podemos estilizar com Tailwind ou colocar css aparte 
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.button_custom}>
      {text}
    </button>
  );
}