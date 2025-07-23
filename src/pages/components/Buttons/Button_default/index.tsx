import styles from "./button.module.css"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  disabled?: true | false;
}

export default function Button({
  text,
  type,
  disabled,
  className, // podemos estilizar com Tailwind ou colocar css aparte 
  onClick, // pronto para receber sua função de redirecionamento mais tarde
}: ButtonProps) {

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button_custom} ${className}`}>
      {text}
    </button>
  );
}