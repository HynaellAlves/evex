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
                    <div className={styles.information_group_row}>
                        <label id={styles.location} className={styles.information_group}>
                            <img id={styles.icon_image} src="/location_icon.svg" /><p className={styles.text}>{event?.local}</p>
                        </label>
                        <label id={styles.calendar_start} className={styles.information_group}>
                            <img id={styles.icon_image} src="/calendar_icon.svg" /><p className={styles.text}>Início: &nbsp;
                                {new Date(event?.startDateEvent ? event.startDateEvent : "").toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                })}
                            </p>
                        </label>
                    </div>

                    <div className={styles.information_group_row}>
                        <label id={styles.category} className={styles.information_group}>
                            <img id={styles.icon_image} src="/book_icon.svg" /><p className={styles.text}>{event?.category}</p>
                        </label>
                        <label id={styles.calendar_end} className={styles.information_group}>
                            <img id={styles.icon_image} src="/book_icon.svg" /><p className={styles.text}>Término: &nbsp;

                                {new Date(event?.endDateEvent ? event.startDateEvent : "").toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                })}
                            </p>
                        </label>
                    </div>

                    <div className={styles.information_group_row}>
                        <label id={styles.attractions} className={styles.information_group}>
                            <img id={styles.icon_image} src="/swing_icon.svg" /><p className={styles.text}>{event?.attractions}</p>
                        </label>
                    </div>

                    <div id={styles.information_description} className={styles.information_group_row}>
                        <p id={styles.description}>{event?.description}</p>
                    </div>

                    <div id={styles.tickets_content} className={styles.information_group_row}>
                        {event?.ticketsBatches && event.ticketsBatches.map((e, i) => (
                            <div key={i} className={styles.ticket_card}>
                                <p>{e.type == 1 ? "Inteira" : e.type == 2 ? "Meia" : e.type == 0 ? "Casadinha" : ""}</p>
                                <p>{Number(e.price).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}