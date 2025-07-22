import Frame from '@/pages/components/Frame'
import styles from './login.module.css'
import Form from '@/pages/components/Forms/Form_login'
import Header from '../components/Header'

export default function Login() {
    return (
        <div id='page' className={styles.login}>
            <Header />
            <div className={styles.login_content}>
                <Frame />
                <div className={styles.form_content}>
                    <Form />
                </div>
            </div>
        </div>
    )
}