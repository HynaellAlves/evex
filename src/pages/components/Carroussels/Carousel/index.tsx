'use client';

import { useRef, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import type { NavigationOptions } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Carousel.module.css';

const slideImages = [
  {
    src: '/clube.png',
    description: 'Electronic music - Night Club',
    date: 'Sexta, 18 de Agosto - 2025',
    location: 'Salvador - BA',
  },
  {
    src: '/MusicEvent.jpg',
    description: 'Music Events',
    date: 'Sábado, 15 de Novembro - 2025',
    location: 'Salvador - BA',
  },
  {
    src: '/Carrosel.png',
    description: 'Parque de Diversões',
    date: 'Domingo, 22 de dezembro - 2025',
    location: 'Parque da Cidade - Salvador - BA',
  },
];

export default function Swiper3DCoverflow() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <div className={styles.container}>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides={true}
        loop
        slidesPerView="auto"
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
        navigation={false}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={styles.swiperContainer}
        onBeforeInit={(swiper: SwiperClass) => {
          if (
            !swiper.params.navigation ||
            typeof swiper.params.navigation === 'boolean'
          ) {
            swiper.params.navigation = {} as NavigationOptions;
          }

          const nav = swiper.params.navigation as NavigationOptions;
          nav.prevEl = prevRef.current!;
          nav.nextEl = nextRef.current!;
        }}
        onSlideChange={handleSlideChange}
      >
        {slideImages.map((slide, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            <img src={slide.src} className={styles.slideImage} alt={`Slide ${i}`} />
          </SwiperSlide>
        ))}

        <div ref={prevRef} className={styles.sliderArrow}>
          <IoArrowBackOutline className={styles.arrowIcon} />
        </div>
        <div ref={nextRef} className={styles.sliderArrowR}>
          <IoArrowForwardOutline className={styles.arrowIcon} />
        </div>
      </Swiper>

      <div className={styles.description}>
        <h2>{slideImages[currentSlide].description}</h2>
        <div className={styles.formato}>
          <img id="data-icon" src="/Calendario.png" alt="Data" width="28" height="28" />
          <p>{slideImages[currentSlide].date}</p>
          <img src="/Local.png" alt="Local" width="28" height="28" />
          <p>{slideImages[currentSlide].location}</p>
        </div>
      </div>
    </div>
  );
}
