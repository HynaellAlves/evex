import { prismic } from '@/functions/requests'
import { asText, asHTML } from '@prismicio/client';
import HeaderHome from '../components/Header/Header_home/index';
import Footer from '@/pages/components/Footer'
import styles from './about-us.module.css';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';



export default function AboutUs() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function loadData() {
            const res = await prismic();
            setData(res);
            console.log(res)
        }
        loadData();
    }, []);

    if (!data){
        return <div id='page' className={styles.loading}> <Loading /> </div>;
    } 
        

    return (
        <>
            <HeaderHome />
            <div className={styles.aboutus}>
                <h1>{data.aboutus_1[0]?.page_title}</h1>
                <div className={styles.main}>
                        <img className={styles.about} src={data.aboutus_1[0]?.section_img.url}/>
                    <div className={styles.main_text}>
                        <h1>{data.aboutus_1[0]?.section_title}</h1>
                        <p>{data.aboutus_1[0]?.section_text}</p>
                    </div>
                </div>

                <div className={styles.content_frame}>
                    <div className={styles.frame}>
                                <img id={styles.frame_1} className={styles.frame_img} src={data.aboutus_2[0]?.section_img.url} />
                                <div className={styles.box}>
                        <div className={styles.frame_text}>
                            <h1>{data.aboutus_2[0]?.section_title}</h1>
                            <p>{data.aboutus_2[0]?.section_text}</p>
                                </div>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h1 id={styles.title_section}>TODAS AS FERRAMENTAS QUE VOCÊ PRECISA PARA REALIZAR UM EVENTO</h1>
                    <div className={styles.section_content}>
                        <div className={styles.card}>
                            <img id={styles.ticket} className={styles.img_section} src='/ticket.png'/>
                            <h4>VENDA DE INGRESSOS</h4>
                            <p>Tudo o que você precisa para vender ingressos para eventos presenciais ou online</p>
                        </div>
                        <div className={styles.card}>
                            <img id={styles.star} className={styles.img_section} src='/star.png'/>
                            <h4>ANÚNCIOS NO EVEX</h4>
                            <p>Crie anúncios sem complicação para promover seu evento no Evex</p>
                        </div>
                        <div className={styles.card}>
                            <img id={styles.key} className={styles.img_section} src='/key.png'/>
                            <h4>FERRAMENTAS DE CADASTRO</h4>
                            <p>Todas as ferramentas de cadastro para eventos em um só lugar</p>
                        </div>
                        <div className={styles.card}>
                            <img id={styles.dolar} className={styles.img_section} src='/dolar.png'/>
                            <h4>PAGAMENTOS</h4>
                            <p>Receba e simplifique os pagamentos do seu evento com facilidade</p>
                        </div>
                    </div>
                </div>

                 <div className={styles.content_frame}>
                    <div className={styles.frame}>
                        <img id={styles.frame_1} className={styles.frame_img} src={data.aboutus_3[0]?.section_img.url} />
                        <div className={styles.box}>
                            <div className={styles.frame_text}>
                                <h1>{data.aboutus_3[0]?.section_title}</h1>
                                <p>{data.aboutus_3[0]?.section_text}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.second_section}>
                    <h1>EVEX EM NÚMEROS</h1>
                    <div className={styles.second_section_content}>
                        <div className={styles.second_section_content_numbers}>
                            <div>
                                <h1>+400.000</h1>
                                <p>eventos realizados</p>
                            </div>
                            <div>
                                <h1>+125.000</h1>
                                <p>eventos online</p>
                            </div>
                            <div>
                                <h1>+3.200</h1>
                                <p>conteúdos digitais</p>
                            </div>
                            <div>
                                <h1>+10.000.000</h1>
                                <p>ingressos vendidos</p>
                            </div>
                        </div>
                        <div className={styles.second_section_content_numbers}>
                            <div>
                                <h1>+1.500</h1>
                                <p>cidades no Brasil</p>
                            </div>
                            <div>
                                <h1>+50.000</h1>
                                <p>produtores</p>
                            </div>
                            <div>
                                <h1>+5.000.000</h1>
                                <p>visitas por mês</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) 
}