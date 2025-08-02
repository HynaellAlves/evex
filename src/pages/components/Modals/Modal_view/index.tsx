import { useUserContext } from '@/context/userContext';
import styles from './modal_view.module.css'
import Title from '../../Title';
import { useEffect, useState } from 'react';
import { eventsObj } from '@/propierts/types';

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
                <button onClick={() => { setModal(false) }} className={styles.close_modal}>X</button>
            </div>
            <div className={styles.modal_view_content}>
                <Title class={styles.modal_view_title} uppercase title='Visualização do Evento' fontSize='24px' fontFamily='var(--font-poppins)' fontWeight={700} />
                <div className={styles.modal_view_informations}>
                    <p>Nome do Evento: {event?.name || ""}</p>
                    <p>Descrição do evento: {event?.description || ""}</p>
                    <p>Categoria do evento: {event?.category || ""}</p>
                    <p>O evento se encerra em: {event?.endDateEvent || ""}</p>
                    {event?.ticketsBatches.map((e) => (
                        <>
                            <p>Preço do ingresso: {e.price}</p>
                            <p>Quantidade total: {e.totalQty}</p>
                            <p>Tipo do ingresso: {e.type}</p>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}