import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './carroussel.module.css'
import Title from '../../Title';

import { useEffect, useId, useState } from 'react';
import { eventsObj } from '@/propierts/types';
import { useUserContext } from '@/context/userContext';

type carroussel = React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    events: eventsObj[];
}

export default function carroussel(props: carroussel) {

    const [events, setEvents] = useState(props.events);
    const { setModal } = useUserContext();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    async function filter_events() {

        const incoming = events.filter((e) => {

            if (e.endDateEvent) {
                const eventDate = new Date(e.endDateEvent)
                eventDate.setHours(0, 0, 0, 0);
                return eventDate <= today
            }

        });
        setEvents(incoming);
    }

    useEffect(() => {

        filter_events()

    }, [])

    async function onSubmit(data: any) {

        setModal(true)
        sessionStorage.setItem("eventClick", JSON.stringify(data))

    }

    // Gera um ID único por componente assim cada instância do carrossel movimenta só ela mesma
    const uniqueId = useId();

    const button_next = `button-next-${uniqueId}`;
    const button_prev = `button-prev-${uniqueId}`;

    return (
        <div className={styles.carroussel}>
            <div className={styles.controlPanel}>
                <Title title={props.title} fontSize='20px' fontFamily={'var(--font-inter)'} fontWeight={500} />
                <div className={styles.controls}>
                    <button className={`${button_prev} ${styles.buttons}`}>←</button>
                    <button className={`${button_next} ${styles.buttons}`}>→</button>
                </div>
            </div>
            <Swiper className={styles.swiper} modules={[Navigation]} navigation={{
                nextEl: `.${button_next}`,
                prevEl: `.${button_prev}`,
            }}
                breakpoints={{

                    /* Passando os tamanhos de tela para o swiper */
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 8,
                    },
                    1070: {
                        slidesPerView: 3,
                        spaceBetween: 8,
                    },
                    1440: {
                        slidesPerView: 4,
                        spaceBetween: 8,
                    }
                }}>
                {/* {events && events.map((e) => (<SwiperSlide style={{ cursor: "pointer" }} onClick={() => { onSubmit(e) }} className={styles.swiperSlide}>{e.imagesUrls?.map((e) => (
                    <img className={styles.carroussel_img} src={e} />
                ))}</SwiperSlide>))} */}
                {events && events.map((e) => (<SwiperSlide style={{ cursor: "pointer" }} onClick={() => { onSubmit(e) }} className={styles.swiperSlide}><img className={styles.carroussel_img} src={e.coverImageUrl} /></SwiperSlide>))}
                {events && events.length <= 0 && (<SwiperSlide className={styles.swiperSlide}><div className={styles.empty_events}>
                    <p>Sem eventos para exibir</p></div></SwiperSlide>)}
            </Swiper>
        </div>
    )
}