import styles from './header_home.module.css';
import { useRouter } from 'next/router';
import Image from "@/pages/components/Image";
import Link from 'next/link';

export default function HeaderHome() {
    const router = useRouter();
    const path = router.pathname;

    return (
        <>
        <header className={styles.header}>
            <div className={styles.header_content}>
                <Image href='' class={styles.logo_main} src="/logo_main.png" width={273} height={103} />
                <div className={styles.header_navigation}>
                    <Link href="/" className={`${styles.link} ${path === '/' ? styles.active : ''}`}>EVENTOS</Link>
                    <Link href="/about-us" className={`${styles.link} ${path === '/about-us' ? styles.active : ''}`}>SOBRE NÓS</Link>
                    <Link href='#' className={styles.link}>CONTATO</Link>
                </div>
                <div className={styles.header_icons}>
                    <div className={styles.content_icons}>
                        <Image href='/Help' class={styles.header_icon} src="/accessibility_tools_icon.svg" width={46} height={46} />
                        <Image href='/Acessibility' class={styles.header_icon} src="/help_icon.svg" width={46} height={46} />
                    </div>
                    <div className={styles.content_login}>
                        <h1>LOGIN</h1>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}