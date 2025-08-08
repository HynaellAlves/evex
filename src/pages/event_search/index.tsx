import styles from './event_search.module.css'
import Header from '../components/Header/Header_home'
import Footer from '../components/Footer';
import Loading from '../components/Loading';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { redirect } from '@/functions/requests';
import { useUserContext } from '@/context/userContext';

export default function Login() {

    const { data, loading } = useUserContext();

    const router = useRouter();

    useEffect(() => {
        if (!loading && data) {
            redirect(data.permissions, router)
        }

    }, [data, loading]);

    return (
        <>
            {data && (
                <div id='page' className={styles.loading}>
                    <Loading />
                </div>
            )}

            {!data && (
                    <div id='page' className={styles.login}>
                        
                    </div>
            )
            }
        </>
    )
}


