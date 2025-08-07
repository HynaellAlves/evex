// Importando módulo de estilo
import styles from './header.module.css'

// Importando Imagem componente
import Image from "@/pages/components/Image";

interface headerProps {
    children?: React.ReactNode
}

export default function Header(props: headerProps) {
    return (
        <header className={styles.header}>
            <div className={styles.header_content}>
                <Image href='/' class={styles.logo_main} src="/logo_main.png" width={281} height={106} />
                <div className={styles.header_icons}>
                    <Image href='/Help' class={styles.header_icon} src="/help_icon.svg" width={46} height={46} />
                </div>
            </div>
            {props.children}
        </header>
    )
}