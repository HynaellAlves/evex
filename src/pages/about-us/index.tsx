import HeaderHome from '../components/Header/Header_home/index';
import styles from './about-us.module.css';
import Img from '@/pages/components/Image'
import Footer from '@/pages/components/Footer'

export default function AboutUs() {
    return (
        <>
            <HeaderHome />
            <div className={styles.aboutus}>
                <h1>ONDE ENCONTROS SE TORNAM HISTÓRIAS</h1>
                <div className={styles.main}>
                        <img className={styles.about} src='/about_1.png' />
                    <div className={styles.main_text}>
                        <h1>UM ÚNICO SITE <br />MÚLTIPLAS EXPERIÊNCIAS</h1>
                        <p>
                            A EVEX é a líder absoluta no mercado brasileiro e ocupa a segunda posição mundial em vendas de ingressos. Com sede na Alemanha, a EVEX está presente em 26 países e conecta milhões de pessoas à emoção de mais de 180.000 eventos todos os anos. São mais de 100 milhões de ingressos comercializados anualmente por meio de uma plataforma inteligente e inovadora, desenvolvida pelo Grupo EVEX, referência global em tecnologia para o entretenimento ao vivo.
                        </p>
                    </div>
                </div>

                <div className={styles.content_frame}>
                    <div className={styles.frame}>
                                <img id={styles.frame_1} className={styles.frame_img} src='/image_aboutus.svg' />
                                <div className={styles.box}>
                        <div className={styles.frame_text}>
                            <h1>EVEX PARA PRODUTORES</h1>
                            <p> Somos aliados de organizadores de eventos e empreendedores digitais que valorizam praticidade e controle em todas as etapas de suas produções. Com a nossa plataforma, é possível publicar, gerenciar, vender e entregar eventos com facilidade. Atendemos a diferentes formatos: presenciais, online e híbridos, oferecendo flexibilidade para cada necessidade.</p>
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
                        <img id={styles.frame_1} className={styles.frame_img} src='/image_aboutus2.svg' />
                        <div className={styles.box}>
                            <div className={styles.frame_text}>
                                <h1>EVEX PARA O PÚBLICO</h1>
                                <p> No nosso site e app, você encontra uma variedade de experiências: de passeios e festas a shows, eventos corporativos, gastronômicos e esportivos. Compre seus ingressos de forma prática, digital e sem enfrentar filas. É EVEX: simples assim!</p>
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