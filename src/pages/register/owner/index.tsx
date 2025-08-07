import styles from "./owner.module.css";
import Form from "@/pages/components/Forms/Form_owner";
import Header from '../../components/Header'
import Logout from "../../components/Buttons/Button_logout"
import Loading from "@/pages/components/Loading";

import { useUserContext } from "@/context/userContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function OwnerPage() {

    const { data, loading } = useUserContext();
    const router = useRouter()
    
    useEffect(() => {
            if (!loading && !data) {
                router.push("/login");
            }
        }, [data, loading]);

        if (!data) return (
        <div id='page' className={styles.loading}>
            <Loading />
        </div>
    )
    
    return (
        <div id="page" className={styles.owner}>
            <Header >
                <Logout />
            </Header >
            <div className={styles.owner_content}>
                {/* Adicionei o form para dar uma olhada e nele eu mudei o input para o que tinha feito */}
               <Form/>
            </div>
        </div>
    )
}



