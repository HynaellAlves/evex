import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useRouter } from 'next/router';

import 'swiper/css';

import styles from './recovery.module.css'
import Form from '@/pages/components/Forms/Form_recovery';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

export default function Recovery() {

    const [param, setParam] = useState<string>();

    const router = useRouter();
    const { token } = router.query;
    const tokenQuery = Array.isArray(token) ? token[0] : token || undefined;

    useEffect(() => {
        setParam(tokenQuery);

    }, [router.query.token]);

    return (
        <div id='page' className={styles.recovery}>
            <Header />
            <div className={styles.recovery_content}>
                <div className={styles.recovery_frame}>
                    <Swiper className={styles.swiper} loop={true} modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} slidesPerView={1}>
                        <SwiperSlide><div className={styles.slides}><img src="/slide_1.png" alt="Slide 1" /></div></SwiperSlide>
                        <SwiperSlide><div className={styles.slides}><img src="/slide_2.png" alt="Slide 2" /></div></SwiperSlide>
                        <SwiperSlide><div className={styles.slides}><img src="/slide_3.png" alt="Slide 3" /></div></SwiperSlide>
                    </Swiper>
                </div>
                <div className={styles.recovery_form}>
                    <Form token={token} />
                </div>
            </div>
        </div >
    )
}