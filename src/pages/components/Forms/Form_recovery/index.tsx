
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
import router from "next/router";

export default function Form() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");

    const [emailView, setEmailView] = useState<boolean>(true);
    const [passwordView, setPasswordView] = useState<boolean>(false);
    const [confirmView, setConfirmView] = useState<boolean>(false);

    const [reset, setReset] = useState<boolean>(false);

    const invalido = !email || !password || !confirm;

    /* Extraindo as funções do Useform React para aplicar no form */
    const {
        /* Função que registra os campos para que o React identifique cada um */
        register,

        /* Função que executa a função quando está tudo correto */
        handleSubmit,

        /* Objeto de erro quando um campo está incorreto */
        formState: { errors },
    } = useLoginForm({ mode: "onChange" });

    const login = (email: string, password: string, confirm: string) => {
        if (email != "") {
            const resetData = {
                email: email,
                senha: password === confirm ? password : undefined
            };
            return resetData
        }
        return false
    }

    /* Aqui vai a função que será executada quando tudo estiver correto */
    const onSubmit = async (data: any) => {

        if (data.confirm && data.password) {
            setPassword(data.password);
            setConfirm(data.confirm);

        } else if (data.email) {

            setEmail(data.email)
        }

        login(email, password, confirm)
        console.log(email, password, confirm)
    }

    {/*
        Essa função redireciona para a página de login mudando 
        o estado da constante que o user effect está observando 
        */ }
    const redirect = () => {
        setReset(true);
    }

    useEffect(() => {
        if (emailView === true) {
            setEmailView(false);
            if (passwordView === false && confirmView === false) {
                setPasswordView(true);
                setConfirmView(true);
            }
        }
    }, [email, password, confirm]);

    useEffect(() => {
        if (reset) {
            setTimeout(() => {
                router.push("/Login");
            }, 1000);
        }
    }, [reset]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            {invalido && (
                /* Esse é o content do efeito visual de progresso no topo do form com numeração */
                < div className={styles.formProgess_content}>
                    <div className={`${styles.circles} ${styles.progess_on}`}><p>1</p></div>
                    <div className={`${styles.progess_bar} ${styles.progess_off}`}></div>
                    <div className={`${styles.circles} ${styles.progess_off}`}><p>2</p></div>
                </div>
            )
            }

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
                {email == "" && password == "" && confirm == "" && (
                    <label className={styles.label_inputs}>{errors.email ? errors.email.message : ""}</label>
                )}
                {email == "" && password == "" && confirm == "" && (
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

                {password == "" && email !== "" && confirm == "" && (
                    <label className={styles.label_inputs}>{errors.password ? errors.password.message : ""}</label>
                )}
                {password == "" && email !== "" && confirm == "" && (
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

                {password == "" && email !== "" && confirm == "" && (
                    <label className={styles.label_inputs}>{errors.confirm ? errors.confirm.message : ""}</label>
                )}
                {password == "" && email !== "" && confirm == "" && (
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
                email != "" && password != "" && confirm != "" && (
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

            {email && password && confirm && (
                <div className={styles.button_content}>
                    <Button type="submit" text="login" onClick={redirect} />
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