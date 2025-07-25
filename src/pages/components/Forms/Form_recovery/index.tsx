
// Importando a biblioteca do react para funcionar o form
import React, { useEffect, useState } from "react";

// Importando o módulo CSS
import styles from './form.module.css'

// Importando os componentes da página
import Title from '@/pages/components/Title';
import Button from '@/pages/components/Buttons/Button_default';
import Img from '@/pages/components/Image'

// Novo input criado como uma melhora do antigo
import Input_example from '@/pages/components/Input/Input_example_other';

// Importando o Useform do react já com o Schema moldado no background
import { useLoginForm } from "@/functions/formPropierts";
import { Recovery } from "@/functions/requests";
import { useRouter } from "next/router";

interface formPropsRecovery {
    token?: any;
}

export default function Form(props: formPropsRecovery) {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [token, setToken] = useState<string>(props.token);
    const [step, setStep] = useState<number>(0);

    const router = useRouter();

    useEffect(() => {
        setToken(props.token)
    }, [router]);

    const invalido = step <= 1 || step === 2

    /* Extraindo as funções do Useform React para aplicar no form */
    const {
        /* Função que registra os campos para que o React identifique cada um */
        register,

        /* Função que executa a função quando está tudo correto */
        handleSubmit,

        /* Objeto de erro quando um campo está incorreto */
        formState: { errors },

    } = useLoginForm({ mode: "onChange" });

    useEffect(() => {
        if (token) {
            setStep(2)
        } else {
            setStep(1)
        }
    }, [token]);

    /* Aqui vai a função que será executada quando tudo estiver correto */
    const onSubmit = async (data: any) => {

        console.log(data)

        if (token) {
            if (token && data.confirm && data.password) {
                setPassword(data.password);
                setConfirm(data.confirm);

                const resetData = {
                    token: token,
                    password: data.password
                }

                const response = await Recovery(resetData);

                if (response) {
                    alert(response.data)
                }

            }
        } else {
            if (data.email) {

                setEmail(data.email);

                const resetData = {
                    email: data.email,
                }

                const response = await Recovery(resetData);

                if (response) {
                    alert(response.data)
                }
            }
        }
    }

    useEffect(() => {
        if (!email && !password && !confirm) {
            setStep(1)
        } else if (token && (!password || !confirm)) {
            setStep(2);
        } else if (token && password && confirm) {
            setStep(3);
        }
    }, [email, password, confirm]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            {step <= 2 && (
                /* Esse é o content do efeito visual de progresso no topo do form com numeração */
                <div className={styles.formProgess_content}>
                    <div className={`${styles.circles} ${step >= 1 ? styles.progess_on : styles.progess_off}`}><p>1</p></div>
                    <div className={`${styles.progess_bar} ${step >= 2 ? styles.progess_on : styles.progess_off}`}></div>
                    <div className={`${styles.circles} ${step >= 2 ? styles.progess_on : styles.progess_off}`}><p>2</p></div>
                </div>
            )}

            {invalido && (

                /*Content do título */
                < div className={styles.title_content}>
                    <Title class={styles.title} title={'Recuperar Acesso'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
                </div>
            )
            }

            {/* Content que agrupa os inputs do form */}
            <div className={styles.inputs_content}>

                {/* Cada Input precisa ser registrado com o "register e name iguais e únicos" e garantir que esse tipo esteja definido no schema
                O type define o tipo do campo como um input comum HTML
                O classname possui a lógica para mudar o visual do component se ele estiver com os critérios satisfeitos ou não "input_ok ou input_error"
                */}
                {step <= 1 && (
                    <label className={styles.label_inputs}>{errors.email ? errors.email.message : ""}</label>
                )}
                {step <= 1 && (
                    <Input_example
                        {...register("email")}
                        id={styles.input_email}
                        type="email"
                        placeholder={"E-mail"}
                        className={`${styles.input_recovery} ${errors.email ? styles.input_error : styles.input_ok}`}
                        name="email"
                        autoComplete="username"
                    />
                )}

                {step == 2 && (
                    <label className={styles.label_inputs}>{errors.password ? errors.password.message : ""}</label>
                )}
                {step == 2 && (
                    <Input_example
                        {...register("password")}
                        id={styles.input_senha}
                        type="password"
                        placeholder={"Senha"}
                        className={`${styles.input_recovery} ${errors.password ? styles.input_error : styles.input_ok}`}
                        name="password"
                        autoComplete="password"
                        maxLength={20}
                    />
                )}

                {step == 2 && (
                    <label className={styles.label_inputs}>{errors.confirm ? errors.confirm.message : ""}</label>
                )}
                {step == 2 && (
                    <Input_example
                        {...register("confirm")}
                        id={styles.input_senhaConfirm}
                        type="password"
                        placeholder={"Confirme a Senha"}
                        className={`${styles.input_recovery} ${errors.confirm ? styles.input_error : styles.input_ok}`}
                        name="confirm"
                        autoComplete="confirm-password"
                        maxLength={20}
                    />
                )}
            </div>
            {
                step == 3 && (
                    <div className={styles.finally_content}>
                        <Img src="/accept_reset.png" width={314} height={289} class={""} />
                        <p id={styles.title_finally}>Senha alterada com sucesso!</p>
                        <p id={styles.subtitle_finally}>Clique no botão abaixo para ser redirecionado.</p>
                    </div>
                )
            }
            {/* O componente do botão, ele vai precisar ser modificado de novo para garantir estabilidade
            O type dele precisa ser definido como de um botão normal e o text é a exibição do nome do botão
            */}

            {step === 3 && (
                <div className={styles.button_content}>
                    <Button type="submit" text="login" />
                    {/* <Button type="submit" text="login" onClick={} /> */}
                </div>
            )}

            {invalido && (
                <div className={styles.button_content}>
                    <Button type="submit" text="avançar" />
                </div>
            )}
        </form >
    );
}