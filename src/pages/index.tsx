import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import Header from '@/pages/components/Header/Header_home';
import CampoPesquisa from '@/pages/components/Search_field/Search_field1';
import NavBar from '@/pages/components/NavBar';
import EventsSection from '@/pages/components/Events_Section';
import Carousel from '@/pages/components/Carroussels/Carousel';
import Footer from '@/pages/components/Footer';

import { prismic } from '@/functions/requests'

export default function Home() {

  const [mainText, setMainText] = useState();
  const [img1, setImg1] = useState<string>();
  const [img2, setImg2] = useState<string>();
  const [img3, setImg3] = useState<string>();
  const [img4, setImg4] = useState<string>();
  const [img5, setImg5] = useState<string>();

  const searchCategory = async () => {

    const response = await prismic();

    if (response) {

      setMainText(response.main_text)
      setImg1(response.img_1.url)
      setImg2(response.img_2.url)
      setImg3(response.img_3.url)
      setImg4(response.img_4.url)
      setImg5(response.img_5.url)

      const teste = JSON.stringify(response);

      console.log(teste)
    }
  }

  useEffect(() => {
    searchCategory()
  }, [])

  return (
    <div id="page">
      <Header />
      <CampoPesquisa />
      <div className={styles.Boxh1}>
        <h1 className={styles.h1}>ONDE ENCONTROS SE TORNAM HISTÓRIAS</h1>
      </div>
      <div className={styles.carouselWrapper}>
        <Carousel />
      </div>
      <NavBar />
      <div className={styles.Box2}>
        <h2 className={styles.h2}>EVENTOS DESTA SEMANA</h2>
      </div>
      <EventsSection />

      <section className={styles.wrapperr}>
        <div className={styles.contentt}>
          {/* Texto com destaques */}
          <h2 className={styles.heading}>
            {mainText}
          </h2>

          {/* Grid de imagens */}
          <div className={styles.grid}>
            <div className={`${styles.item} ${styles.item1}`}>
              <img src={img1} alt="perfil 1" />
            </div>
            <div className={`${styles.item} ${styles.item2}`}>
              <img src={img2} alt="perfil 2" />
            </div>
            <div className={`${styles.item} ${styles.item4}`}>
              <img src={img3} alt="perfil 3" />
            </div>
            <div className={`${styles.item} ${styles.item3}`}>
              <img src={img4} alt="perfil 4" />
            </div>
            <div className={`${styles.item} ${styles.item5}`}>
              <img src={img5} alt="perfil 5" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.imageBox}>
            <img src="/Bol_Events.png" alt="círculo decorativo" />
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <h3>+10</h3>
              <p>Anos de experiência</p>
            </div>
            <div className={styles.statItem}>
              <h3>+200K</h3>
              <p>Ingressos vendidos</p>
            </div>
            <div className={styles.statItem}>
              <h3>+1K</h3>
              <p>Eventos</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

