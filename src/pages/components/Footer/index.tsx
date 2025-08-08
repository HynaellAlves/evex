import styles from './footer.module.css';
import Img from '@/pages/components/Image';
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

interface footerProps {
    children?: React.ReactNode
}

export default function Footer(props: footerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); 
    }, []);

    const isMobile = useMediaQuery({ maxWidth: 1024 });

    const logoWidth = mounted && isMobile ? 317 : 495;
    const logoHeight = mounted && isMobile ? 120 : 187;

    return (
        <>
            <div id='footer' className={styles.footer}>
                <div className={styles.footer_contact}>
                    <Img
                        id={styles.logo_main}
                        class={styles.logo_main}
                        src="/logo_main.png"
                        width={logoWidth}
                        height={logoHeight}
                    />
                    {(!mounted || !isMobile) && (
                        <div className={styles.first_line}>
                            <Img class={styles.first_line} src="/line.png" width={4} height={240} />
                        </div>
                    )}
                    <div>
                        <div className={styles.title}>
                            <h1>CONTATO</h1>
                        </div>
                        <div className={styles.contacts}>
                            <h1>(71) 9 9999-9999</h1>
                            <img className={styles.line} src="/line.png" />
                            <h1>CONTATO@EVEX.COM</h1>
                            <img className={styles.line} src="/line.png" />
                            <div>
                                <h1>CEP: 4100000</h1>
                                <p>RUA EVEX, 95, SALVADOR - BA</p>
                            </div>
                        </div>
                        <div className={styles.midia}>
                            <div>
                                <img className={styles.logo} src="/logo_face.png" width={16} height={22} />
                            </div>
                            <div>
                                <img className={styles.logo} src="/logo_insta.png" width={20} height={22} />
                            </div>
                            <div>
                                <img className={styles.logo} src="/logo_twitter.png" width={20} height={22} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer_copy}>
                <h1>BY EVEX | copyright 2025</h1>
            </div>
        </>
    );
}
