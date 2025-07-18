import styles from './form.module.css'

interface formProps {
    children?: React.ReactNode;
}

export default function Form(props: formProps) {
    return (
        <div className={styles.form}>
            {props.children}
        </div>
    )
}