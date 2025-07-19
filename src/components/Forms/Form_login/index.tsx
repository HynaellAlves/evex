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
        <label className={styles.label_inputs}>{errors.email ? errors.email.message : ""}</label>
        <Input
          {...register("email")}
          id={styles.input_email_login}
          type="email"
          placeholder={"E-mail"}
          className={errors.email ? styles.input_error : styles.input_ok}
          name="email"
          autoComplete="username"
        />
        <label className={styles.label_inputs}>{errors.senha ? errors.senha.message : ""}</label>
        <Input
          {...register("senha")}
          id={styles.input_senha_login}
          type="password"
          placeholder={"Senha"}
          className={errors.senha ? styles.input_error : styles.input_ok}
          name="senha"
          autoComplete="current-password"
          maxLength={25}
        />

      </div>
      <div className={styles.checkbox_content}>
        <input id={styles.checkbox} type="checkbox" name="remember" />
        <p className={styles.label_checkbox}>Lembrar-me</p>
      </div>
      <Button text="avançar" />

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
