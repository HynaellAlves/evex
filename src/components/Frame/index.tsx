import styles from './frame.module.css'

import Img from '@/components/Image'

export default function Frame() {
    return (
        <div className={styles.frame}>
            <Img class={styles.pictures} src='/img_empty.png' width={268} height={101} />
        </div>
    )
}