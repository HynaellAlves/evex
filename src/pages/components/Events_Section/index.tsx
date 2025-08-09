import { eventsObj } from '@/propierts/types';
import styles from './eventSec.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Event = {

  events: eventsObj[];
};

export default function EventsSection(props: Event) {

  const router = useRouter();

  const hoje = new Date();
  const primeiroDiaSemana = new Date(hoje);
  primeiroDiaSemana.setDate(hoje.getDate() - hoje.getDay() + 1);

  const ultimoDiaSemana = new Date(primeiroDiaSemana);
  ultimoDiaSemana.setDate(primeiroDiaSemana.getDate() + 6);

  const events_weekly = props.events?.filter(event => {
    const event_date = new Date(event.endDateEvent);
    return event_date >= primeiroDiaSemana && event_date <= ultimoDiaSemana;
  });

  return (
    <section className={styles.wrapper}>
      <div id={styles.paragraph_events} className={styles.paragraph_content}>
        <h1 id={styles.title_events}>EVENTOS DESTA SEMANA</h1>
      </div>
      <div className={styles.container}>
        {events_weekly?.map((ev: eventsObj) => (
          <div key={ev.id} className={styles.card} onClick={ () => router.push("/events")}>
            <div className={styles.imageBox}>
              <img src={ev.coverImageUrl} alt={ev.slug} className={styles.image} />
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>{ev.name}</h3>
              <p className={styles.location}>{ev.address}</p>
              <p className={styles.date}>
                {new Date(ev.startDateEvent)
                  .toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.vermais}>
        <Link href="/events">
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
