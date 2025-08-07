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
                    <Image href='/' class={styles.logo_main} src="/logo_main.png" width={273} height={103} />
                    <div className={styles.header_navigation}>
                        <Link href="/events" className={`${styles.link} ${path === '/events' ? styles.active : ''}`}>EVENTOS</Link>
                        <Link href="/about-us" className={`${styles.link} ${path === '/about-us' ? styles.active : ''}`}>SOBRE NÓS</Link>
                        <Link href='/' className={styles.link}>CONTATO</Link>
                    </div>
                    <div className={styles.header_icons}>
                        <div className={styles.content_icons}>
                            <Image href='/home/cart' class={styles.header_icon} src="/cart_icon.svg" width={40} height={40} />
                            <Image href='/help' class={styles.header_icon} src="/help_icon.svg" width={46} height={46} />
                        </div>
                        <div className={styles.content_login}>
                            <a style={{ textDecoration: "none" }} href='/login'>LOGIN</a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}