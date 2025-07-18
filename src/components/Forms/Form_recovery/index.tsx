'use client'

import React from "react";

import styles from './form.module.css'

import Title from '@/components/Title';
import Button from '@/components/Button';
import Input_example from '@/components/Input/Input_example_other';

import { useLoginForm } from "@/functions/requests";

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useLoginForm();

    const onSubmit = (data: any) => {
        alert(`Dados enviados: ${data}`);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formProgess_content}>
                <div className={`${styles.circles} ${styles.progess_on}`}><p>1</p></div>
                <div className={`${styles.progess_bar} ${styles.progess_off}`}></div>
                <div className={`${styles.circles} ${styles.progess_off}`}><p>2</p></div>
            </div>
            <div className={styles.title_content}>
                <Title class={styles.title} title={'Recuperar Acesso'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
            </div>
            <div className={styles.inputs_content}>
            <Input_example
                    {...register("email")}
                    type="email"
                    placeholder={errors.email ? "E-mail Inválido" : "E-mail"}
                    className={`${styles.input_recovery} ${errors.email ? styles.input_error : styles.input_ok}`}
                    name="email"
                    autoComplete="username"
                />
                <Input_example
                    {...register("senha")}
                    type="password"
                    placeholder={errors.senha ? "Senha Inválida" : "Senha"}
                    className={`${styles.input_recovery} ${errors.senha ? styles.input_error : styles.input_ok}`}
                    name="senha"
                    autoComplete="password"
                />
                <Input_example
                    {...register("senhaConfirm")}
                    type="password"
                    placeholder={errors.senhaConfirm ? "Confirmação Inválida" : "Confirme a Senha"}
                    className={`${styles.input_recovery} ${errors.senhaConfirm ? styles.input_error : styles.input_ok}`}
                    name="senhaConfirm"
                    autoComplete="confirm-password"
                />
            </div>
            <div className={styles.button_content}>
                <Button type="submit" text="avançar" />
            </div>
        </form>
    );
}