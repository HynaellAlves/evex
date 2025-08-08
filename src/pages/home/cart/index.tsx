import HeaderHome from "@/pages/components/Header/Header_home"
import styles from "./cart.module.css"
import Footer from "@/pages/components/Footer"
import Input from "@/pages/components/Input/Input_example_other"
import Button from "@/pages/components/Buttons/Button_default"


export default function cart_page() {
    return (
        <div id="page" className={styles.cart_page}>
            <HeaderHome />
            <div className={styles.cart}>
                <div className={styles.frame}>
                    <h1>1. COMPRA DO INGRESSO</h1>
                </div>
                <div className={styles.frame}>
                    2. RECEBIMENTO DO INGRESSO

                    <form className={styles.content_form}>
                        <Input 
                          
                        />
                        <Input 
                        
                        />
                        <Input

                        />

                        <Button />
                    </form>
                </div>
                <div className={styles.frame}>
                </div>
                <div className={styles.frame}></div>
            <p>Carrinho Não encontrado</p>
            </div>
            <Footer />
        </div>
    )
}