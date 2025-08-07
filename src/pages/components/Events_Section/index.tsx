import styles from './eventSec.module.css';
import Link from 'next/link';

type Event = {
  id: string;
  title: string;
  location: string;
  date: string;
  imageSrc: string;
};

const events: Event[] = [
  {
    id: '1',
    title: 'NIGHT PARTY',
    location: 'Chácara Baluarte – Salvador',
    date: '20 de Novembro',
    imageSrc: '/event_3.jpg',
  },
  {
    id: '2',
    title: 'VISITA A CASA DAS HISTÓRIAS',
    location: 'Rua Bélgica, Comércio – Salvador',
    date: '24 a 30 de Julho',
    imageSrc: '/R_Comercio.jpg',
  },
  {
    id: '3',
    title: 'SEMANA DO MEIO AMBIENTE',
    location: 'Centro de Convenções – Salvador',
    date: '05 a 09 de Junho',
    imageSrc: '/meioAmbiente.png',
  },
  {
    id: '4',
    title: 'SESSÃO DE STAND‑UP COMEDY',
    location: 'Teatro Módulo – Salvador, BA',
    date: '08 e 09 de Agosto',
    imageSrc: "/event_1.jpg",
  },
  {
    id: '5',
    title: 'PASSEIO DE BARCO',
    location: 'Chácara Baluarte - Salvador',
    date: '20 de Novembro',
    imageSrc:"/barco.png",
  },
  {
    id: '6',
    title: 'visita a CASA DAS HISTÓRIAS',
    location: 'Rua Bélgica, Comércio - Salvador',
    date: '24 a 30 de Julho',
    imageSrc:"/R_comercio.jpg",
  },
  {
    id: '7',
    title: 'HIPISMO AMADOR',
    location: 'Centro de Convenções - Salvador',
    date: '05 a 09 de Junho',
    imageSrc:"/cavalo.png",
  },
    {
    id: '8',
    title: 'VISITA A IGREJA DE NOSSA Sª',
    location: 'Carmo - Salvador, BA',
    date: '08 e 09 de Agosto',
    imageSrc:"/igreja.png",
  },
];

export default function EventsSection() {
  return (
      <section className={styles.wrapper}>
        <div className={styles.container}>
          {events.map((ev) => (
            <div key={ev.id} className={styles.card}>
              <div className={styles.imageBox}>
                <img src={ev.imageSrc} alt={ev.title} className={styles.image} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>{ev.title}</h3>
                <p className={styles.location}>{ev.location}</p>
                <p className={styles.date}>{ev.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.vermais}>
          <Link href="/eventos">
            <div className={styles.btn}>
              <span className={styles.label}>VER MAIS</span>
              <img
                className={styles.arrow}
                src="/arrow-forward-outline.svg"
                alt="Seta"
              />
            </div>
          </Link>
        </div>
      </section>
  );
}
