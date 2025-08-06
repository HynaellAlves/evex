import { uppercase } from 'zod';
import HeaderHome from '../components/Header/Header_home/index';
import styles from './about-us.module.css';
import Img from '@/pages/components/Image'

export default function AboutUs() {
    return (
        <>
            <HeaderHome />
            <div className={styles.aboutus}>
                <h1>ONDE ENCONTROS SE TORNAM HISTÓRIAS</h1>
                <div className={styles.main}>
                    <div>
                        <Img id={styles.about_1} class={styles.about} src='/about_1.png' width={600} height={600} />
                    </div>
                    <div className={styles.main_text}>
                        <h1>UM ÚNICO SITE <br />MÚLTIPLAS EXPERIÊNCIAS</h1>
                        <p>
                            A EVEX é a líder absoluta no mercado brasileiro e ocupa a segunda posição mundial em vendas de ingressos. Com sede na Alemanha, a EVEX está presente em 26 países e conecta milhões de pessoas à emoção de mais de 180.000 eventos todos os anos. São mais de 100 milhões de ingressos comercializados anualmente por meio de uma plataforma inteligente e inovadora, desenvolvida pelo Grupo EVEX, referência global em tecnologia para o entretenimento ao vivo.
                        </p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>todas as ferramentas que você <br />precisa para realizar um evento</h1>
                    <div className={styles.section_content}>
                        <div className={styles.card}>
                            <img src="" alt="" />
                            <h4>Venda de Ingressos para Eventos</h4>
                            <p>Tudo o que você precisa para vender ingressos para eventos presenciais ou online</p>
                        </div>
                        <div className={styles.card}>
                            <img src="" alt="" />
                            <h4>Anúncios no evex</h4>
                            <p>Crie anúncios sem complicação para promover seu evento no Evex</p>
                        </div>
                        <div className={styles.card}>
                            <img src="" alt="" />
                            <h4>Ferramentas de cadastro</h4>
                            <p>Todas as ferramentas de cadastro para eventos em um só lugar</p>
                        </div>
                        <div className={styles.card}>
                            <img src="" alt="" />
                            <h4>Pagamentos</h4>
                            <p>Receba e simplifique os pagamentos do seu evento com facilidade</p>
                        </div>
                    </div>
                </div>

                <div className={styles.second_section}>
                    <h1>Evex em números</h1>
                    <div className={styles.second_section_content}>
                        <div className={styles.second_section_content_numbers}>
                            <div>
                                <h1>+400.000</h1>
                                <p>eventos realizados</p>
                            </div>
                            <div>
                                <h1>=125.000</h1>
                                <p>eventos online</p>
                            </div>
                            <div>
                                <h1>+3.200</h1>
                                <p>conteúdos digitais</p>
                            </div>
                            <div>
                                <h1>=10.000.000</h1>
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
        </>
    ) 
}