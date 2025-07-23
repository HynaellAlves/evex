import React, { useState } from 'react';
import styles from "./form.module.css";
import Img from '@/pages/components/Image'

/* Troquei o input utilizado
O forwardRef é método usado pelo react agora que garante o funcionamento
Ele passa a referência dentro do elemento da forma certa
Sem ele é imprevisível se o React ta passando a referência
*/

import Input from '@/pages/components/Input/Input_example_other';
import Title from '@/pages/components/Title';
import Button from '@/pages/components/Buttons/Button_default';
import { useLoginForm } from "@/functions/formPropierts";

export default function Form() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useLoginForm();

    const [step, setStep] = useState<number>(1);

    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const onSubmit = (data: any) => {
        console.log("Dados enviados:", data);

        if (step < 3) {
            nextStep();
        } else {
            alert("Formulário finalizado com sucesso!");
        }
    };


    return (
        <form className={step >= 2 ? styles.formbackground : styles.form} onSubmit={handleSubmit(onSubmit)}>
        {(step === 1 || step === 2) && (
            <div className={styles.title_content}>
                <Title class={styles.title} title="Cadastrar Usuário" fontFamily='var(--font-poppins)' fontWeight={700} uppercase />
            </div>
            )}

            <div className={styles.formProgess_content}>
                    <div className={`${styles.circles} ${step >= 1 ? styles.progess_on : styles.progess_off}`}><p>1</p></div>
                    <div className={`${styles.progess_bar} ${step >= 2 ? styles.progess_on : styles.progess_off}`}></div>
                    <div className={`${styles.circles} ${step >= 2 ? styles.progess_on : styles.progess_off}`}><p>2</p></div>
                    <div className={`${styles.progess_bar} ${step >= 3 ? styles.progess_on : styles.progess_off}`}></div>
                    <div className={`${styles.circles} ${step >= 3 ? styles.progess_on : styles.progess_off}`}><p>3</p></div>
            </div>

        {step === 1 && (
            <div className={styles.Progess_content}>
                <div id={styles.box_1}><h2>Administrador</h2></div>
                <div id={styles.box_2}><h2>Dono do evento</h2></div>
            </div>
        )}
            
        { step === 1 && (
            <div className={styles.inputs_container}>
                <Input
                    {...register("nome")}
                    type="text"
                    placeholder={errors.nome ? "Nome inválido" : "Nome completo"}
                    className={errors.nome ? styles.input_error : styles.input_ok}
                    name="nome"
                    autoComplete="name"
                />

                <div className={styles.inputs_row}>
                <Input
                    {...register("dataNascimento")}
                    type="date"
                    placeholder={errors.dataNascimento ? "Data obrigatória" : "Data de nascimento"}
                    className={errors.dataNascimento ? styles.input_error : styles.input_ok}
                    name="dataNascimento"
                    />
                <Input
                    {...register("email")}
                    type="email"
                    placeholder={errors.email ? "E-mail inválido" : "E-mail"}
                    className={errors.email ? styles.input_error : styles.input_ok}
                    name="email"
                    autoComplete="username"
                    />
                </div>

                <div className={styles.inputs_row}>
                <Input
                    {...register("cep")}
                    type="text"
                    placeholder={errors.cep ? "CEP inválida" : "CEP"}
                    className={errors.cep ? styles.input_error : styles.input_ok}
                    name="cep"
                    maxLength={8}
                    />
                <Input
                    {...register("numero")}
                    type="text"
                    placeholder={errors.numero ? "Número inválido" : "Nº"}
                    className={errors.numero ? styles.input_error : styles.input_ok}
                    name="numero"
                    />
                </div>

                <Input
                    {...register("complemento")}
                    type="text"
                    placeholder="Complemento (opcional)"
                    className={styles.input_ok}
                    name="complemento"
                />

                <div className={styles.inputs_row}>
                <Input
                    {...register("cpfCnpj")}
                    type="text"
                    placeholder={errors.cpfCnpj ? "CPF/CNPJ inválido" : "CPF/CNPJ"}
                    className={errors.cpfCnpj ? styles.input_error : styles.input_ok}
                    name="cpfCnpj"
                    />
                <Input
                    {...register("telefone")}
                    type="tel"
                    placeholder={errors.telefone ? "Telefone inválido" : "Telefone"}
                    className={errors.telefone ? styles.input_error : styles.input_ok}
                    name="telefone"
                    autoComplete="tel"
                    />
                </div>

                <Input
                    {...register("fotoPerfil")}
                    type="url"
                    placeholder={errors.fotoPerfil ? "URL inválida" : " URL Foto de perfil (opcional)"}
                    className={errors.fotoPerfil ? styles.input_error : styles.input_ok}
                    name="fotoPerfil"
                    autoComplete="url"
                />

                <div className={styles.checkboxs_container}>

                    <div className={styles.checkbox_content}>
                        <input id={styles.checkbox} type="checkbox" name="remember" />
                        <p className={styles.label_checkbox}>Senha padrão</p>
                    </div>

                    <div className={styles.checkbox_content}>
                        <input id={styles.checkbox} type="checkbox" name="remember" />
                        <p className={styles.label_checkbox}>Criar senha</p>
                    </div>

                    <div className={styles.checkbox_content}>
                        <input id={styles.checkbox} type="checkbox" name="remember" />
                        <p className={styles.label_checkbox}>Usuário cria a própia senha</p>
                    </div>
                </div>
            </div>
        )}

        { step === 2 && (
            <div className={styles.inputs_container2}>
                <Input
                    {...register("password")}
                    id={styles.input_senha}
                    type="password"
                    placeholder={"Senha"}
                    className={`${styles.input_register} ${errors.password ? styles.input_error : styles.input_ok}`}
                    name="password"
                    autoComplete="password"
                    maxLength={20}
                    />
                <Input
                    {...register("confirm")}
                    id={styles.input_senhaConfirm}
                    type="password"
                    placeholder={"Confirme a Senha"}
                    className={`${styles.input_register} ${errors.confirm ? styles.input_error : styles.input_ok}`}
                    name="confirm"
                    autoComplete="confirm-password"
                    maxLength={20}
                    />
                </div>
        )}

        { step === 3 && (
                <div className={styles.inputs_container3}>
                    <Img src="/accept_reset.png" width={314} height={289} class={""} />
                    <Title class={styles.title} title="Usuário criado com sucesso!" fontFamily='var(--font-poppins)' fontWeight={700}   />
                    <p id={styles.subtitle}>Clique no botão abaixo para ser redirecionado.</p>
                </div>
         )}

            <div className={step === 3 ? styles.button_content3 : styles.button_content}>
               <Button type="submit" text={step < 3 ? "avançar" : "início"} />
            </div>

        </form>
    )
}
