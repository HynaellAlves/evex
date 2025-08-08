import { useEffect, useId, useRef, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { useUserContext } from '@/context/userContext';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './carroussel.module.css';

export default function carroussel_highlights() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { eventsArray } = useUserContext();
  const [events, setEvents] = useState<{ name: string, address: string, startDateEvent: string }[]>(eventsArray);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {

    const futures = eventsArray.filter((event: any) => {
      if (event.endDateEvent) {
        const eventDate = new Date(event.endDateEvent);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      }
    });
    setEvents(futures);

    if (futures.length > 0) setCurrentSlide(0);

  }, [eventsArray])

  const handleSlideChange = (swiper: SwiperClass) => {

    setCurrentSlide(swiper.realIndex);
  };

  const uniqueId = useId();

  const button_next = `button-next-${uniqueId}`;
  const button_prev = `button-prev-${uniqueId}`;

  return (
    <>

      {
        events.length > 0 && (
          <>
            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides={true}
              centeredSlidesBounds={true}
              loop
              autoplay={{ delay: 1000 }}
              slidesPerView="auto"
              coverflowEffect={{ rotate: 0, stretch: 100, depth: 150, modifier: 2.5 }}
              navigation={{
                nextEl: `.${button_next}`,
                prevEl: `.${button_prev}`,
              }}
              modules={[EffectCoverflow, Navigation]}
              className={styles.swiper}
              onSlideChange={handleSlideChange}
            >
              {events.map((slide: any, i: any) => (
                <SwiperSlide key={i} className={styles.swiper_slide}>
                  <img src={slide.coverImageUrl} className={styles.slide_image} alt={`Slide ${i}`} />
                </SwiperSlide>
              ))}
            </Swiper >
            <div className={styles.control_panel}>
              <button className={`${button_prev} ${styles.buttons}`}>
                <IoArrowBackOutline className={styles.arrow_icon} />
              </button>
              <div className={styles.description}>
                <h2 className={styles.event_name}>{events[currentSlide]?.name}</h2>
                <div className={styles.event_information}>
                  <div className={styles.information_group}>
                    <img className={styles.icons_carroussel} src="/Local.png" alt="Local" width="28" height="28" />
                    <p>{events[currentSlide]?.address}</p>
                  </div>
                  <div className={styles.information_group}>
                    <img className={styles.icons_carroussel} id="data-icon" src="/Calendario.png" alt="Data" width="28" height="28" />
                    <p>{events[currentSlide]?.startDateEvent}</p>
                  </div>
                </div>
              </div>
              <button className={`${button_next} ${styles.buttons}`}>
                <IoArrowForwardOutline className={styles.arrow_icon} />
              </button>
            </div>
          </>
        )
      }
    </>
  );
}
