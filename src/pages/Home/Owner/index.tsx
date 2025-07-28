import styles from './owner.module.css'

import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import { useEffect } from 'react'

import Title from '@/pages/components/Title'
import Box_text from '@/pages/components/Text_box'
import Carroussel from '@/pages/components/Carroussels/Carroussel_event_coming'
import Header from '@/pages/components/Header'
import Button_owner from '@/pages/components/Buttons/Button_owner'
import Loading from '@/pages/components/Loading'
import Logout from "@/pages/components/Buttons/Button_logout"

export default function home_owner() {

    const { data, loading } = useUserContext();

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

    const events = data.events;

    console.log(data.Events)

    return (

        <div id='page' className={styles.home_owner}>
            <Header>
                <Logout />
            </Header>
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
                <Button_owner className={styles.button_event} radius='40px'><img className={styles.add_icon} src="/add_icon.svg" />cadastrar evento</Button_owner>
            </div>
            <div className={styles.carroussel_content}>
                <Carroussel title='Próximos Eventos' events={events} />
            </div>

            <div className={styles.carroussel_content}>
                <Carroussel title='Eventos Encerrados' events={events} />
            </div>
            <div className={styles.teste}>

            </div>
        </div>
    )
}