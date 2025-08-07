'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './campoPesquisa.module.css';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      router.push(`/events?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <MagnifyingGlass size={24} className={styles.icon} />
        <input
          type="text"
          className={styles.input}
          placeholder="Pesquisar evento, show, teatro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </section>
  );
}

