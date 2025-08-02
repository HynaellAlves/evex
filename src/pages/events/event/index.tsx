import { useEffect, useState } from "react";
import { eventsObj } from "@/propierts/types";

import styles from "./event.module.css"
import Loading from "@/pages/components/Loading"

export default function event_page() {

    const [event, setEvent] = useState<eventsObj | undefined>(undefined);

    useEffect(() => {
        const event = sessionStorage.getItem("eventClick");
        if (event) setEvent(JSON.parse(event));

    }, []);

    if (!event) {
        return (
            <div id="page" className={styles.loading}>
                <Loading />
            </div>
        )
    }

    return (
        <div id="page">
            <p>{event.id}</p>
            <p>{event.category}</p>
        </div>
    )
}