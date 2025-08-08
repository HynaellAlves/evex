import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import Header from '@/pages/components/Header/Header_home';
import Input_search from '@/pages/components/Search_field';
import NavBar from '@/pages/components/NavBar';

import EventsSection from './components/Events_Section';
import Carousel from '@/pages/components/Carroussels/Carroussel';
import Footer from '@/pages/components/Footer';

import { prismic } from '@/functions/requests'
import { useUserContext } from '@/context/userContext';

export default function Home() {

  const { eventsArray } = useUserContext();

  const [mainText, setMainText] = useState();
  const [img_hero, setImg] = useState<string>();

  const searchCategory = async () => {

    const response = await prismic();

    console.log(response)

    if (response) {

      setMainText(response.main_text)
      setImg(response.img_hero.url)
    }
  }

  useEffect(() => {
    searchCategory()
  }, [])

  return (
    <div id="page" className={styles.home}>
      <Header />
      <div className={styles.search_content}>
        <Input_search />
      </div>
      <div className={styles.paragraph_content}>
        <h1>ONDE ENCONTROS SE TORNAM HISTÓRIAS</h1>
      </div>
      <div className={styles.carroussel_content}>
        <div className={styles.carroussel}>
          <Carousel />
        </div>
      </div>
      <NavBar />
      <EventsSection events={eventsArray} />

      <div className={styles.hero_content}>
        <div className={styles.hero_container}>
          <div className={styles.hero_text}>
            <h2>
              {mainText}
            </h2>
          </div>

          {/* Grid de imagens */}
          <div className={styles.grid}>
            <img src={img_hero} />
          </div>
        </div>
      </div>

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

