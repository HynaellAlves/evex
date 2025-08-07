import { useEffect, useState } from 'react';
import { useUserContext } from '@/context/userContext';
import { eventsObj } from '@/propierts/types';

import styles from './modal_view.module.css'
import Title from '../../Title';

type Modal_view_props = React.HTMLAttributes<HTMLDivElement>

export default function Modal_view(props: Modal_view_props) {

    const [event, setEvent] = useState<eventsObj | undefined>(undefined);

    useEffect(() => {
        const event = sessionStorage.getItem("eventClick");
        if (event) setEvent(JSON.parse(event));

    }, []);

    const { setModal } = useUserContext();

    return (
        <div {...props} className={styles.modal_view}>
            <div className={styles.modal_view_navegation}>
                <button onClick={() => { setModal(false) }} className={styles.close_modal}><img className={styles.icon_close_button} src="/close_icon.png" /> </button>
            </div>
            <Title class={styles.modal_view_title} uppercase title={event?.name || ""} fontSize='36px' fontFamily='var(--font-poppins)' fontWeight={700} />
            <div className={styles.modal_view_content}>
            <div className={styles.img_slug}>
                    <img src={event?.coverImageUrl} />
                    <button id={styles.button_custom}>remover</button>
                </div>
                <div className={styles.modal_view_informations}>
                    <label id={styles.location} className={styles.information_group}>
                        <img id={styles.icon_image} src="/location_icon.svg" /><p className={styles.text}>{event?.local}</p>
                    </label>
                    <label id={styles.calendar_start} className={styles.information_group}>
                        <img id={styles.icon_image} src="/calendar_icon.svg" /><p className={styles.text}>{event?.startDateEvent}</p>
                    </label>
                    <label id={styles.category} className={styles.information_group}>
                        <img id={styles.icon_image} src="/book_icon.svg" /><p className={styles.text}>{event?.category}</p>
                    </label>
                    <label id={styles.calendar_end} className={styles.information_group}>
                        <img id={styles.icon_image} src="/book_icon.svg" /><p className={styles.text}>{event?.endDateEvent}</p>
                    </label>
                    <label id={styles.attractions}><img id={styles.icon_image} src="/swing_icon.svg"/>{event?.attractions}</label>
                    <textarea disabled name="" id={styles.description}></textarea>
                </div>
            </div>
        </div>
    )
}