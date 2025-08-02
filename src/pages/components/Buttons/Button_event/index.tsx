import styles from "./button_event.module.css"

type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    radius?: string;
    class?: string;
}

export default function button_event(props: buttonProps) {
    return (
        <button {...props} style={{ borderRadius: props.radius }} className={`${styles.button_owner} ${props.class}`}>{props.children}</button>
    )
}