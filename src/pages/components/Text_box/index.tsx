import styles from "./text_box.module.css"

type boxProps = React.HTMLAttributes<HTMLTextAreaElement> & {
    edit?: boolean,
    fontFamily?: string,
    fontSize?: string,
    children?: React.ReactNode
}

export default function box_text(props: boxProps) {

    return (
        <div id={styles.box_text}>
            <textarea {...props} disabled={!props.edit ? !props.edit : false} style={{ fontFamily: props.fontFamily ? props.fontFamily : "var(--font-inter)", fontSize: props.fontSize }} name="" id="">
                {props.children}
            </textarea>
        </div>
    )
}