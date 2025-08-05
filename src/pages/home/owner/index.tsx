import styles from './owner.module.css'

import { useRouter } from 'next/router'
import { useUserContext } from '@/context/userContext'
import { useEffect, useState } from 'react'

import { editOwner } from '@/functions/requests'

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

    const { data, loading, modal, setData } = useUserContext();
    const [edit, setEdit] = useState(false);
    const [bio, setBio] = useState<string>();
    const [name, setName] = useState<string>();

    const router = useRouter();

    useEffect(() => {
        if (!loading && !data) {
            router.push("/login");
        }

        if (data) {
            setBio(data.bio)
            setName(data.name)
        }
    }, [data, loading]);

    const change = (item: any) => {

        if (item.target.nodeName == "INPUT") {
            setName(item.target.value)
        } else if (item.target.nodeName == "TEXTAREA") {
            setBio(item.target.value)
        }
    }

    async function submitOwner() {

        const Session = sessionStorage.getItem("user");
        const Local = localStorage.getItem("user");

        if (Session) {

            const json = JSON.parse(Session)

            json.bio = bio;
            json.name = name;

            setData(json);

            sessionStorage.setItem("user", json);

            await editOwner(json);

        } else if (Local) {

            const json = JSON.parse(Local)

            json.bio = bio;
            json.name = name;

            setData(json);

            localStorage.setItem("user", json);

            await editOwner(json);
        }

    }

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
                    <button onClick={async () => {
                        if (edit) {
                            setEdit(false)
                            submitOwner()
                        } else {
                            setEdit(true)
                        }
                    }} className={styles.button_edit}><img className={styles.icon_edit} src={edit ? "/confirm_icon.png" : "/icon_edit.svg"} /></button>
                    <div className={styles.owner_name_content}>
                        <input className={styles.owner_name} disabled={!edit ? !edit : false} onChange={change} value={name} placeholder='Digite seu Nome' type="text" />
                    </div>
                    <div className={styles.box_text_content}>
                        <Box_text onChange={change} edit={edit ? edit : false} fontFamily='var(--font-inter)' className={`${styles.text_area} ${styles.text}`}>
                            {data.bio ? data.bio : "Digite sua descrição"}
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