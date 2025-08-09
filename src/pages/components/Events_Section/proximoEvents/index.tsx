import { useUserContext } from '@/context/userContext';
import styles from './eventSec.module.css';
import { eventsObj } from '@/propierts/types';

export default function EventsSection() {

  const { eventsArray } = useUserContext();

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {eventsArray.map((ev: eventsObj) => (
          <div key={ev.id} className={styles.card}>
            <div className={styles.imageBox}>
              <img src={ev.coverImageUrl} alt={ev.slug} className={styles.image} />
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>{ev.name}</h3>
              <p className={styles.location}>{ev.address}</p>
              <p className={styles.date}>
                {new Date(ev.endDateEvent)
                  .toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
