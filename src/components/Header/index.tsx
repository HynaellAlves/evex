// Importando módulo de estilo
import styles from './header.module.css'

// Importando Imagem componente
import Image from "@/components/Image";

export default function Header() {
    return (
        <header className={styles.header}>
            <Image href='/' class={styles.logo_main} src="/logo_main.png" width={281} height={106} />
            <div className={styles.header_icons}>
                <Image href='/Help' class={styles.header_icon} src="/accessibility_tools_icon.svg" width={46} height={46} />
                <Image href='/Acessibility' class={styles.header_icon} src="/help_icon.svg" width={46} height={46} />
            </div>
        </header>
    )
}