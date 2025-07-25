import Title from '@/pages/components/Title'
import styles from "./event.module.css";
import Form from "@/pages/components/Forms/Form_event";
import Header from "@/pages/components/Header";


export default function EventRegister() {
  return (
    <div id='page'>
      <Header />
      <div className={styles.event_content}>
          <Title fontSize="32px" class={styles.owner_title} title={'CADASTRO DE EVENTO'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
        <Form />
      </div>
      <div className={styles.bol_events_image_container}>
        <img className={styles.bol_events_image} src="/Bol_Events.png" alt="Bol Events" />
      </div>
    </div>
  );
}
