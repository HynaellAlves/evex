import Title from '@/pages/components/Title'
import styles from "./event.module.css";
import Form from "@/pages/components/Forms/Form_event";
import Header from "@/pages/components/Header";
import { useEffect } from 'react';
import { useUserContext } from '@/context/userContext';
import { useRouter } from 'next/router';
import Loading from '@/pages/components/Loading';


export default function EventRegister() {

  const { data, loading } = useUserContext();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !data) {
      router.push("/login");
    } else if (data) {
      if (data.permissions.length > 0) {
        console.log(data)
        router.push("/home/admin");
      }
    }
  }, [data, loading]);

  if (!data) return (
    <div id='page' className={styles.loading}>
      <Loading />
    </div>
  )

  return (
    <div id='page'>
      <Header />
      <div className={styles.event_content}>
        <Title uppercase class={styles.owner_title} title={'CADASTRO DE EVENTO'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
        <div className={styles.event_form_content}>
          <Form />
        </div>
      </div>
    </div>
  );
}




