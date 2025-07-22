import styles from "./text_box.module.css"

interface boxProps {
    class?: string,
    fontFamily?: string,
    fontSize?: string,
    children?: React.ReactNode
}

export default function box_text(props: boxProps) {
    return (
        <div id={styles.box_text} className={props.class}>
            <p style={{ fontFamily: props.fontFamily ? props.fontFamily : "var(--font-inter)", fontSize: props.fontSize }}>
                {props.children}
            </p>
        </div>
    )
}