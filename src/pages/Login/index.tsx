import Frame from '@/components/Frame'
import styles from './login.module.css'
import Form from '@/components/Form'

export default function Login() {
    return (
        <div className={`page ${styles.login}`}>
            <div className={styles.login_content}>
                <Frame />
                <Form/>
            </div>
            {/*<img className={styles.abstract_image} src='/circle_background_abstract.png'/>*/}
        </div>
    )
}