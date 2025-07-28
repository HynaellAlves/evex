import Frame from '@/pages/components/Frame'
import styles from './login.module.css'
import Form from '@/pages/components/Forms/Form_login'
import Header from '../components/Header'
import Loading from '../components/Loading';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Redirect } from '@/functions/requests';
import { useUserContext } from '@/context/userContext';

export default function Login() {

    const { data, loading } = useUserContext();

    const router = useRouter();

    useEffect(() => {
        if (!loading && data) {
            Redirect(data.permissions, router)
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
                    <Header />
                    <div className={styles.login_content}>
                        <Frame />
                        <div className={styles.form_content}>
                            <Form />
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}