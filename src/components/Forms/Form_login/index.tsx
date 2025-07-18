/* O componente funciona sem o 'user client' e seria interessante usar a mesma abordagem do outro form nesse
usando o componente de input novo
*/

import React from "react";
import Input from "@/components/Input/Input_default";
import Button from "@/components/Button"
import Title from "../../Title";
import Checkbox from "../../Checkbox";
import styles from "./form.module.css";
import { useLoginForm } from "@/functions/requests";


export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  function onSubmit(data: any) {
    alert("Dados enviados:");
  }

  return (
    <form className={styles.box_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.box_title}>
        <Title class={styles.title_form} title="Login" fontFamily='var(--font-poppins)' fontWeight={700} />
      </div>

      <div className={styles.box_input}>
        <Input
          {...register("email")}
          type="email"
          placeholder={errors.email ? "E-mail inválido" : "E-mail"}
          className={errors.email ? styles.input_error : styles.input_ok}
          name="email"
          autoComplete="username"
        />

        <Input
          {...register("senha")}
          type="password"
          placeholder={errors.senha ? "Senha inválida" : "Senha"}
          className={errors.senha ? styles.input_error : styles.input_ok}
          name="senha"
          autoComplete="current-password"
        />

      </div>
      <Button />

      <div className={styles.box_hyperlink}>
        <div className={styles.hyperlink_google}>
          <img className={styles.img_google} src='/google_logo.png' alt="Google"></img>
          <a id={styles.google_link} href="#">Faça login com o Google</a>
        </div>
        <a id={styles.password_link} href="/Recovery">
          Esqueceu a senha/Primeiro acesso?
        </a>
      </div>
    </form>
  );
}
