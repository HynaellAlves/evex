
// Importando a biblioteca do react para funcionar o form
import React from "react";

// Importando o módulo CSS
import styles from './form.module.css'

// Importando os componentes da página
import Title from '@/components/Title';
import Button from '@/components/Button';

// Novo input criado como uma melhora do antigo
import Input_example from '@/components/Input/Input_example_other';

// Importando o Useform do react já com o Schema moldado no background
import { useLoginForm } from "@/functions/requests";

export default function Form() {

    /* Extraindo as funções do Useform React para aplicar no form */
    const {
        /* Função que registra os campos para que o React identifique cada um */
        register,

        /* Função que executa a função quando está tudo correto */
        handleSubmit,

        /* Objeto de erro quando um campo está incorreto */
        formState: { errors },
    } = useLoginForm();

    /* Aqui vai a função que será executada quando tudo estiver correto */
    const onSubmit = (data: any) => {
        alert(`Dados enviados: ${data}`);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Esse é o content do efeito visual de progresso no topo do form com numeração */}
            <div className={styles.formProgess_content}>
                <div className={`${styles.circles} ${styles.progess_on}`}><p>1</p></div>
                <div className={`${styles.progess_bar} ${styles.progess_off}`}></div>
                <div className={`${styles.circles} ${styles.progess_off}`}><p>2</p></div>
            </div>

            {/*Content do título */}
            <div className={styles.title_content}>
                <Title class={styles.title} title={'Recuperar Acesso'} fontFamily={'var(--font-poppins)'} fontWeight={700} />
            </div>

            {/* Content que agrupa os inputs do form */}
            <div className={styles.inputs_content}>

                {/* Cada Input precisa ser registrado com o "register e name iguais e únicos" e garantir que esse tipo esteja definido no schema
                O type define o tipo do campo como um input comum HTML
                O classname possui a lógica para mudar o visual do component se ele estiver com os critérios satisfeitos ou não "input_ok ou input_error"
                */}
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
                    maxLength={20}
                />
                <Input_example
                    {...register("senhaConfirm")}
                    type="password"
                    placeholder={errors.senhaConfirm ? "Confirmação Inválida" : "Confirme a Senha"}
                    className={`${styles.input_recovery} ${errors.senhaConfirm ? styles.input_error : styles.input_ok}`}
                    name="senhaConfirm"
                    autoComplete="confirm-password"
                    maxLength={20}
                />
            </div>

            {/* O componente do botão, ele vai precisar ser modificado de novo para garantir estabilidade
            O type dele precisa ser definido como de um botão normal e o text é a exibição do nome do botão
            */}
            <div className={styles.button_content}>
                <Button type="submit" text="avançar" />
            </div>
        </form>
    );
}