import styles from "./input.module.css"

type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    className: string;
};

export default function Input({ type, className, id }: inputProps) {
    return (
        <input id={id} className={`${styles.input} ${className}`} type={type} />
    )
}