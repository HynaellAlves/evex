import styles from "./button.module.css"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  id?: string;
  text?: string;
  disabled?: true | false;
}

export default function Button({
  id,
  text,
  type,
  disabled,
  className, // podemos estilizar com Tailwind ou colocar css aparte 
  onClick, // pronto para receber sua função de redirecionamento mais tarde
}: ButtonProps) {

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button_custom} ${className}`}>
      {text}
    </button>
  );
}