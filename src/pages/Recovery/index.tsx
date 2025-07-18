'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import styles from './recovery.module.css'
import Form from '@/components/Forms/Form_recovery';

export default function Recovery() {
    return (
        <div id='page' className={styles.recovery}>
            <div className={styles.recovery_content}>
                <div className={styles.recovery_frame}>
                    <Swiper className={styles.swiper} loop={true} modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} slidesPerView={1}>
                        <SwiperSlide><div className={styles.slides}><img src="/slide_1.png" alt="Slide 1" /></div></SwiperSlide>
                        <SwiperSlide><div className={styles.slides}><img src="/slide_2.png" alt="Slide 2" /></div></SwiperSlide>
                        <SwiperSlide><div className={styles.slides}><img src="/slide_3.png" alt="Slide 3" /></div></SwiperSlide>
                    </Swiper>
                </div>
                <div className={styles.recovery_form}>
                    <Form />
                </div>
            </div>
        </div >
    )
}