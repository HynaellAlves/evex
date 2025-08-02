import styles from './owner.module.css'

import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import { useEffect } from 'react'

import Title from '@/pages/components/Title'
import Box_text from '@/pages/components/Text_box'
import Header from '@/pages/components/Header'
import Button_owner from '@/pages/components/Buttons/Button_owner'
import Loading from '@/pages/components/Loading'
import Logout from "@/pages/components/Buttons/Button_logout"
import Modal_view from '@/pages/components/Modals/Modal_view'
import Carroussel_incoming from '@/pages/components/Carroussels/Carroussel_event_coming'
import Carroussel_lasted from '@/pages/components/Carroussels/Carroussel_event_lasted'

export default function home_owner() {

    const { data, loading, modal } = useUserContext();

    const router = useRouter();

    useEffect(() => {
        if (!loading && !data) {
            router.push("/login");
        }
    }, [data, loading]);

    if (!data) return (
        <div id='page' className={styles.loading}>
            <Loading />
        </div>
    )

    // Atribuindo o array de eventos a constante para enviar ao componente de carrossel
    const events = data.events;

    const addEvent = () => {
        router.push("/register/events")
    }

    return (

        <div id='page' className={styles.home_owner}>
            <Header>
                <Logout />
            </Header>
            {modal && <Modal_view />}
            <Title fontSize="32px" class={styles.owner_title} title={'Página Inicial'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
            <div className={styles.owner_hero_content}>
                <div className={styles.owner_profile}>
                    <img className={styles.profile} src="/profile_owner.jpg" alt='Profile Image'></img>
                </div>
                <div className={styles.owner_text}>
                    <button className={styles.button_edit}><img className={styles.icon_edit} src="/icon_edit.svg" /></button>
                    <div className={styles.owner_name_content}>
                        <Title class={styles.owner_name} title={data.name ? JSON.stringify(data.name) : "Nome"} fontFamily={'var(--font-poppins)'} fontWeight={600} />
                    </div>
                    <div className={styles.box_text_content}>
                        <Box_text fontFamily='var(--font-inter)' class={styles.text}>
                            {data.bio ? JSON.stringify(data.bio) : "Digite aqui sua biografia..."}
                        </Box_text>
                    </div>
                </div>
            </div>
            <div className={styles.button_content_event}>
                <Button_owner onClick={addEvent} className={styles.button_event} radius='40px'><img className={styles.add_icon} src="/add_icon.svg" />cadastrar evento</Button_owner>
            </div>
            {/* Passando para os componentes o array de eventos via props */}
            <div className={styles.carroussel_content}>
                <Carroussel_incoming title='Próximos Eventos' events={events} />
            </div>

            <div className={styles.carroussel_content}>
                <Carroussel_lasted title='Eventos Encerrados' events={events} />
            </div>
        </div>
    )
}