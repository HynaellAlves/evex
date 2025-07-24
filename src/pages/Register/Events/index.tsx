import Title from '@/pages/components/Title'
import styles from "./event.module.css";
import Form from "@/pages/components/Forms/Form_event";
import Header from "@/pages/components/Header";


export default function EventRegister() {
  return (
    <div id='page'>
      <Header />
      <div className={styles.event_content}>
          <Title fontSize="32px" class={styles.owner_title} title={'cadastro de evento'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
        <Form />
      </div>
    </div>
  );
}
