import Frame from '@/components/Frame'
import styles from './login.module.css'
import Form from '@/components/Form'

export default function Login() {
    return (
        <div className={`page ${styles.login}`}>
            <div className={styles.login_content}>
                <Frame />
                <div className={styles.form_content}>
                    <Form />
                </div>
            </div>
        </div>
    )
}