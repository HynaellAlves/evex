import styles from "./loading.module.css"

export default function loading() {
    return (
        <div className={styles.loading_container}>
            <p>Carregando</p>
            <img src="/loading_icon.png" className={styles.loading_icon} />
        </div>
    )
}