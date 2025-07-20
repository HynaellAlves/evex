import React from 'react';
import styles from "./form.module.css";

/* Troquei o input utilizado
O forwardRef é método usado pelo react agora que garante o funcionamento
Ele passa a referência dentro do elemento da forma certa
Sem ele é imprevisível se o React ta passando a referência
*/

import Input from '@/pages/components/Input/Input_example_other';
import Title from '@/pages/components/Title';
import Button from '@/pages/components/Button';
import { useLoginForm } from "@/functions/formPropierts";

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

            <div className={styles.title_content}>
                <Title class={styles.title} title="Cadastrar Usuário" fontFamily='var(--font-poppins)' fontWeight={700} />
            </div>

            <div className={styles.inputs_container}>
                <Input
                    {...register("nome")}
                    type="text"
                    placeholder={errors.nome ? "Nome inválido" : "Nome completo"}
                    className={errors.nome ? styles.input_error : styles.input_ok}
                    name="nome"
                    autoComplete="name"
                />
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
                <Input
                    {...register("complemento")}
                    type="text"
                    placeholder="Complemento (opcional)"
                    className={styles.input_ok}
                    name="complemento"
                />
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
                <Input
                    {...register("fotoPerfil")}
                    type="url"
                    placeholder={errors.fotoPerfil ? "URL inválida" : " URL Foto de perfil (opcional)"}
                    className={errors.fotoPerfil ? styles.input_error : styles.input_ok}
                    name="fotoPerfil"
                    autoComplete="url"
                />
            </div>

            <div className={styles.button_content}>
                <Button type="submit" text="avançar" />
            </div>
        </form>
    )
}
