import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import styles from './search_input.module.css';

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
      <div className={styles.search_container}>
        <MagnifyingGlass className={styles.icon} />
        <input
          type="text"
          className={styles.input}
          placeholder="Pesquisar evento, show, teatro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
  );
}
