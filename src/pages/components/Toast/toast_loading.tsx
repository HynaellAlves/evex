import styles from './toast.module.css'

interface toastProps {
    message?: string
}

export default function toast_base(props: toastProps) {

    return (
        <div className={`${styles.toast} ${styles.toast_content_loading}`}>
            <div className={styles.toast_loading}>
                <p>{props.message}</p>
            </div>
        </div>
    )
}