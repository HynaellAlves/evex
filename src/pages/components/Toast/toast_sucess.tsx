import styles from './toast.module.css'

interface toastProps {
    message?: string
}

export default function toast_base(props: toastProps) {

    return (
        <div className={`${styles.toast} ${styles.toast_content_sucess}`}>
            <div className={styles.toast_sucess}>
                <p>{props.message}</p>
            </div>
        </div>
    )
}