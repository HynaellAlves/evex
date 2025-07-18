'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import styles from './recovery.module.css'
import Form from '@/components/Form_B';
import Title from '@/components/Title';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function Recovery() {
    return (
        <div className={`page ${styles.recovery}`}>
            <div className={styles.recovery_content}>
                <div className={styles.recovery_frame}>
                    <Swiper className={styles.swiper} loop={true} modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} slidesPerView={1}>
                        <SwiperSlide><div className={styles.slides}><img src="/slide_1.png" alt="Slide 1" /></div></SwiperSlide>
                        <SwiperSlide><div className={styles.slides}><img src="/slide_2.png" alt="Slide 2" /></div></SwiperSlide>
                        <SwiperSlide><div className={styles.slides}><img src="/slide_3.png" alt="Slide 3" /></div></SwiperSlide>
                    </Swiper>
                </div>
                <div className={styles.recovery_form}>
                    <Form>
                        <div className={styles.formProgess_content}>
                            <div className={`${styles.circles} ${styles.progess_on}`}><p>1</p></div>
                            <div className={`${styles.progess_bar} ${styles.progess_on}`}></div>
                            <div className={`${styles.circles} ${styles.progess_off}`}><p>2</p></div>
                        </div>
                        <div className={styles.title_content}>
                            <Title class={styles.title} title={'Recuperar Acesso'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
                        </div>
                        <div className={styles.inputs_content}>
                            <Input className={styles.input} />
                            <Input className={styles.input} />
                        </div>
                        <div className={styles.button_content}>
                            <Button text='avançar' />
                        </div>
                    </Form>
                </div>
            </div>
        </div >
    )
}