import styles from "./owner.module.css";
import Title from "../../components/Title"
import Img from '@/pages/components/Image'
import Form from "@/pages/components/Forms/Form_register";

export default function OwnerPage() {
    return (
        <div id="page" className={styles.owner}>
            <div className={styles.owner_content}>
                {/* Adicionei o form para dar uma olhada e nele eu mudei o input para o que tinha feito */}
               <Form></Form>
            </div>
        </div>
    )
}