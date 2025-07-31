import styles from "./owner.module.css";
import Form from "@/pages/components/Forms/Form_owner";
import Header from '../../components/Header'

export default function OwnerPage() {
    return (
        <div id="page" className={styles.owner}>
            <Header />
            <div className={styles.owner_content}>
                {/* Adicionei o form para dar uma olhada e nele eu mudei o input para o que tinha feito */}
               <Form/>
            </div>
        </div>
    )
}


