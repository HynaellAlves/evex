import styles from './owner.module.css'

import Title from '@/pages/components/Title'
import Box_text from '@/pages/components/Text_box'
import Carroussel from '@/pages/components/Carroussel'
import Header from '@/pages/components/Header'

export default function home_owner() {
    return (
        <div id='page' className={styles.home_owner}>
            <Header/>
            <Title fontSize="32px" class={styles.owner_title} title={'Página Inicial'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
            <div className={styles.owner_hero_content}>
                <div className={styles.owner_profile}>

                </div>
                <div className={styles.owner_text}>
                    <button className={styles.button_edit}><img className={styles.icon_edit} src="/icon_edit.svg"/></button>
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
            <div className={styles.carroussel_content}>
                <Carroussel title='Próximos Eventos'/>
                <Carroussel title='Eventos Encerrados'/>
            </div>
        </div>
    )
}