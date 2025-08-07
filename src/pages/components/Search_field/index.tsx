// components/FilterableEventsSection.tsx
import React, { useState } from 'react';
import styles from './campoPesquisa.module.css';
import { MagnifyingGlass } from '@phosphor-icons/react';

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  imageSrc: string;
}

const allEvents: Event[] = [
  { id: '1',  title: 'NIGHT PARTY',                       location: 'Chácara Baluarte – Salvador',          date: '20 de Novembro',      imageSrc: '/event_3.jpg'      },
  { id: '2',  title: 'VISITA A CASA DAS HISTÓRIAS',         location: 'Rua Bélgica, Comércio – Salvador',     date: '24 a 30 de Julho',    imageSrc: '/R_Comercio.jpg'   },
  { id: '3',  title: 'SEMANA DO MEIO AMBIENTE',             location: 'Centro de Convenções – Salvador',      date: '05 a 09 de Junho',    imageSrc: '/meioAmbiente.png' },
  { id: '4',  title: 'SESSÃO DE STAND-UP COMEDY',           location: 'Teatro Módulo – Salvador, BA',         date: '08 e 09 de Agosto',   imageSrc: '/event_1.jpg'      },
  { id: '5',  title: 'O QUEBRA-NOZES',                     location: 'SESC Vila Mariana - São Paulo',        date: '20 de Agosto',        imageSrc: '/nozes.jpg'        },
  { id: '6',  title: 'CHAVES : A EXPOSIÇÃO',               location: 'Salvador Shopping - Salvador',         date: '02 a 26 de Julho',    imageSrc: '/exposição.jpg'    },
  { id: '7',  title: 'CAPITAL INICIAL 25 ANOS',            location: 'Armazém Convertion, Lauro de Freitas', date: '03 de Outubro',       imageSrc: '/festa.jpg'        },
  { id: '8',  title: 'KARAOKÊ',                             location: 'Bar Ponto Alto - Belo Horizonte',      date: '13 de Setembro',      imageSrc: '/karaoke.jpg'      },
  { id: '9',  title: 'FESTA ANOS 2000',                    location: 'Vila Mariana, São Paulo',              date: '17 de Agosto',        imageSrc: '/festa2000.png'    },
  { id: '10', title: 'FESTIVAL DA CULTURA JAPONESA',        location: 'Parque de Exposições - Salvador',      date: '05 a 07 de Setembro',  imageSrc: '/china.jpg'        },
  { id: '11', title: 'SHOW ACÚSTICO',                      location: 'SESC Vila Mariana - São Paulo',        date: '20 de Agosto',        imageSrc: '/showMPB.png'      },
  { id: '12', title: 'PEÇA DE TEATRO',                     location: 'Teatro Jorge Amado, Salvador',         date: '02 de Novembro',      imageSrc: '/Teatro.jpg'       },
  { id: '13', title: 'PASSEIO DE BARCO',                   location: 'Chácara Baluarte - Salvador',          date: '20 de Novembro',      imageSrc: '/barco.png'        },
  { id: '15', title: 'HIPISMO AMADOR',                     location: 'Centro de Convenções - Salvador',      date: '05 a 09 de Junho',    imageSrc: '/cavalo.png'       },
];

const FilterableEventsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Só filtra se houver termos, senão array vazio
  const filteredEvents = searchTerm.trim()
    ? allEvents.filter(ev => {
        const term = searchTerm.toLowerCase();
        return (
          ev.title.toLowerCase().includes(term) ||
          ev.location.toLowerCase().includes(term) ||
          ev.date.toLowerCase().includes(term)
        );
      })
    : [];

  return (
    <section className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <MagnifyingGlass size={24} className={styles.icon} />
        <input
          type="text"
          className={styles.input}
          placeholder="Pesquisar evento, show, teatro..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm.trim() && (
        <div className={styles.container}>
          {filteredEvents.map(ev => (
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
          {filteredEvents.length === 0 && (
            <p className={styles.noResults}>Nenhum evento encontrado.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default FilterableEventsSection;

