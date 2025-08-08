import styles from './header_home.module.css';
import { useRouter } from 'next/router';
import Image from "@/pages/components/Image";
import Link from 'next/link';
import { useState } from 'react';

const items = [
  { label: 'EVENTOS', href: '/events' },
  { label: 'SOBRE NÓS', href: '/about-us' },
  { label: 'CONTATO', href: '/contact' },
];

export default function HeaderHome() {
  const router = useRouter();
  const path = router.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  function handleToggle() {
    setMenuOpen((s) => !s);
  }

  function handleOpen() {
    setMenuOpen(true);
  }

  function handleClose() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_content}>
          <Image href='/' class={styles.logo_main} src="/logo_main.png" width={273} height={103} />

          <button
            className={styles.menuButton}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={handleToggle}
          >
          </button>


          <nav className={styles.header_navigation} aria-label="Navegação principal">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={`${styles.link} ${path === it.href ? styles.active : ''}`}
              >
                {it.label}
              </Link>
            ))}
          </nav>



          <div className={styles.header_icons}>
            <div className={styles.content_icons}>
              <Image href='/home/cart' class={styles.header_icon} src="/cart_icon.svg" width={40} height={40} />
              <Image href='/help' class={styles.header_icon} src="/help_icon.svg" width={46} height={46} />
              <div onClick={handleOpen} style={{ cursor: 'pointer', display: 'inline-block' }}>
                <Image
                  class={styles.header_iconTracinho}
                  src="/tracinho.png"
                  width={46}
                  height={46}
                />
              </div>
            </div>



            <div className={styles.content_login}>
              <a href='/login' style={{ textDecoration: 'none' }}>LOGIN</a>
            </div>
          </div>
        </div>

        
        {menuOpen && (
          <>
            <div className={styles.mobileOverlay} onClick={handleClose} />
            <div className={styles.mobileMenuWrapper} role="dialog" aria-modal="true" aria-label="Menu mobile">
              <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={handleClose} aria-label="Fechar menu">✕</button>
                <ul className={styles.mobileList}>
                  {items.map((it, idx) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className={`${styles.mobileItem} ${idx === 0 ? styles.mobileTopItem : ''} ${path === it.href ? styles.active : ''}`}
                        onClick={handleClose}
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}