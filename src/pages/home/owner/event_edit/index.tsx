import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { eventsObj } from '@/propierts/types'
import { useUserContext } from '@/context/userContext'

import Header from '@/pages/components/Header'
import styles from './event_edit.module.css'
import Title from '@/pages/components/Title'
import Form from '@/pages/components/Forms/Form_event_edit'
import Loading from '@/pages/components/Loading';

export default function event_edit_page() {

    const { data, loading } = useUserContext();
    const [event, setEvent] = useState<eventsObj | undefined>(undefined);

    const router = useRouter();

    useEffect(() => {

        const event = sessionStorage.getItem("eventEdit")

        if (event) setEvent(JSON.parse(event))

        if (!loading && !data) {
            router.push("/login");
        } else if (data) {
            if (data.permissions.length > 0) {
                console.log(data)
                router.push("/home/admin");
            }
        }

        if (!event) {
            router.push("/home/owner");
        }

    }, [data, loading]);

    if (!event) {
        return (
            <div id="page" className={styles.loading}>
                <Loading />
            </div>
        )
    }

    return (
        <div id='page' className={styles.event_edit}>
            <Header />
            <div className={styles.event_content}>
                <Title uppercase class={styles.owner_title} title={'Edição de Evento'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
                <div className={styles.event_form_content}>
                    <Form event={event} />
                </div>
            </div>
        </div>
    )
}