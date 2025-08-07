import CampoPesquisa from '@/pages/components/Search_field';
import next from './netx.module.css';
import Header from '@/pages/components/Header/Header_home';
import Footer from '@/pages/components/Footer';
import NetxEvents from '@/pages/components/Events_Section/proximoEvents';
import { FiFilter, FiCalendar } from 'react-icons/fi';

export default function NetxEvent() {
    return (

        <div id="page">
            <Header/>
            <CampoPesquisa/>
            <div className={next.filters}>
                <button className={next.filterBtn}>
                    <FiFilter className={next.filterIcon} />
                    <span>Categoria</span>
                </button>
                <button className={next.filterBtn}>
                    <FiCalendar className={next.filterIcon} />
                    <span>Data</span>
                </button>
            </div>
            <h1 className={next.h1}>
                    CONHEÇA OS PRÓXIMOS EVENTOS
            </h1>
            <NetxEvents/>
            <Footer/>
        </div>
    );
}