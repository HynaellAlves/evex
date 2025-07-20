import styles from './frame.module.css'

import Img from '@/pages/components/Image'

export default function Frame() {
    return (
        <div className={styles.frame}>
            <Img id={styles.picture_1} class={styles.pictures} src='/moldura_1.png' width={133} height={133} />
            <Img id={styles.picture_2} class={styles.pictures} src='/moldura_2.png' width={133} height={133} />
            <Img id={styles.picture_3} class={styles.pictures} src='/moldura_3.png' width={268} height={101} />
            <Img id={styles.picture_4} class={styles.pictures} src='/moldura_4.png' width={134} height={306} />
            <Img id={styles.picture_5} class={styles.pictures} src='/moldura_5.png' width={268} height={101} />
            <Img id={styles.picture_6} class={styles.pictures} src='/moldura_6.png' width={133} height={133} />
            <Img id={styles.picture_7} class={styles.pictures} src='/moldura_7.png' width={267} height={133} />
            <Img id={styles.picture_8} class={styles.pictures} src='/moldura_8.png' width={133} height={133} />
        </div>
    )
}