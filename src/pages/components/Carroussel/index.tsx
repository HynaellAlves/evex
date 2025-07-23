import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './carroussel.module.css'
import Title from '../Title';
import { useId } from 'react';

interface carroussel {
    title: string;
}

export default function carroussel(props: carroussel) {

    const uniqueId = useId(); // Gera um ID único por componente

    const button_next = `button-next-${uniqueId}`;
    const button_prev = `button-prev-${uniqueId}`;

    return (
        <div className={styles.carroussel}>
            <div className={styles.controlPanel}>
                <Title title={props.title} fontSize='20px' fontFamily={'var(--font-inter)'} fontWeight={500} />
                <div className={styles.controls}>
                    <button className={`${button_next} ${styles.buttons}`}>←</button>
                    <button className={`${button_prev} ${styles.buttons}`}>→</button>
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
                    }
                }}>
                <SwiperSlide className={styles.swiperSlide}><img className={styles.image_event} src="/event_1.jpg" /></SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}><img className={styles.image_event} src="/event_2.jpg" /></SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}><img className={styles.image_event} src="/event_3.jpg" /></SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>Slide 1</SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>Slide 2</SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide>
            </Swiper>
        </div>
    )
}