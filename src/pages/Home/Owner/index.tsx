import styles from './owner.module.css'

import Title from '@/pages/components/Title'
import Box_text from '@/pages/components/Text_box'
import Carroussel from '@/pages/components/Carroussels/Carroussel_event_coming'
import Header from '@/pages/components/Header'
import Button_owner from '@/pages/components/Buttons/Button_owner'

export default function home_owner() {

    const eventsTeste = [
        {
            name: "revoada",
            capacity: 30,
            url: "/event_1.jpg"
        },
        {
            name: "revoada_2",
            capacity: 20,
            url: "/event_2.jpg"
        },
        {
            name: "revoada_3",
            capacity: 15,
            url: "/event_3.jpg"
        },
        {
            name: "revoada_4",
            capacity: 45,
            url: "/event_4.jpg"
        },
        {
            name: "revoada_5",
            capacity: 18,
            url: "/event_5.jpg"
        },

    ]

    const eventsTeste_2 = [
        {
            name: "revoada",
            capacity: 30,
            url: "/event_4.jpg"
        },
        {
            name: "revoada_2",
            capacity: 20,
            url: "/event_3.jpg"
        },

    ]

    return (
        <div id='page' className={styles.home_owner}>
            <Header />
            <Title fontSize="32px" class={styles.owner_title} title={'Página Inicial'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
            <div className={styles.owner_hero_content}>
                <div className={styles.owner_profile}>
                    <img className={styles.profile} src="/profile_owner.jpg" alt='Profile Image'></img>
                </div>
                <div className={styles.owner_text}>
                    <button className={styles.button_edit}><img className={styles.icon_edit} src="/icon_edit.svg" /></button>
                    <div className={styles.owner_name_content}>
                        <Title class={styles.owner_name} title={'The hub'} fontFamily={'var(--font-poppins)'} fontWeight={600} />
                    </div>
                    <div className={styles.box_text_content}>
                        <Box_text fontFamily='var(--font-inter)' class={styles.text}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Box_text>
                    </div>

                </div>
            </div>
            <div className={styles.button_content_event}>
                <Button_owner className={styles.button_event} radius='40px'><img className={styles.add_icon} src="/add_icon.png" />cadastrar evento</Button_owner>
            </div>
            <div className={styles.carroussel_content}>
                <Carroussel title='Próximos Eventos' events={eventsTeste} />
            </div>

            <div className={styles.carroussel_content}>
                <Carroussel title='Eventos Encerrados' events={eventsTeste_2} />
            </div>
            <div className={styles.teste}>

            </div>
        </div>
    )
}