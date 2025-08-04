import styles from './button_owner.module.css'

type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    radius?: string;
}

export default function button(props: buttonProps) {
    return (
        <button {...props} style={{ borderRadius: props.radius }} className={`${styles.button_owner}`}>{props.children}</button>
    )
}