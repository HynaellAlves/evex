import styles from "./logout.module.css"
import { useRouter } from "next/router";

import { reset } from "@/functions/requests"

interface logoutProps {
    class?: string
    router?: ReturnType<typeof useRouter>;
}

export default function logout(props: logoutProps) {

    return (
        <button onClick={() => reset()} className={`${styles.logout_button} ${props.class}`}> <img className={styles.logout_icon} src="/logout_icon.png" /></button >
    )
}