import { useUserContext } from "@/context/userContext";
import styles from "./admin.module.css"
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "@/pages/components/Loading";

export default function admin_page() {

    const { data, loading } = useUserContext();

    const router = useRouter();

    useEffect(() => {
        if (!loading && !data) {
            router.push("/login");
        } else if (data) {
            if (data.permissions.length <= 0) {
                console.log(data)
                router.push("/home/owner");
            }
        }
    }, [data, loading]);

    if (!data) return (
        <div id='page' className={styles.loading}>
            <Loading />
        </div>
    )

    return (
        <div id="page">
            <p>Página do Admin</p>
        </div>
    )
}