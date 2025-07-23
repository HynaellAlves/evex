/* O componente funciona sem o 'user client' e seria interessante usar a mesma abordagem do outro form nesse
usando o componente de input novo
*/

import React, { useState } from "react";

import Input from "@/pages/components/Input/Input_default";
import Title from "@/pages/components/Title";
import Button from "@/pages/components/Buttons/Button_default"

import styles from "./form.module.css";

import { postLogin } from '@/functions/requests'
import { useLoginForm } from "@/functions/formPropierts";

export default function Form() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm({ mode: "onChange" });

  async function onSubmit(data: any) {

    const response = await postLogin(data);

    if (response) {

      if (response.status) {
        alert(`A requisição não funcionou ${JSON.stringify(response.status)} ${JSON.stringify(response.data)}`)
      } else {
        alert(`A requisição funcionou Token recebido ${response.data.email}`)
      }
    }

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
          onChange={(e) => {
            register("email").onChange(e);
            setEmail(e.target.value)
          }}
          className={email ? errors.email ? styles.input_error : styles.input_ok : styles.input_ok}
          name="email"
          autoComplete="username"
        />
        <label className={styles.label_inputs}>{errors.password ? errors.password.message : ""}</label>
        <Input
          {...register("password")}
          id={styles.input_senha_login}
          type="password"
          placeholder={"Senha"}
          onChange={(e) => {
            register("password").onChange(e);
            setPassword(e.target.value)
          }
          }
          className={password ? errors.password ? styles.input_error : styles.input_ok : styles.input_ok}
          name="password"
          autoComplete="current-password"
          maxLength={25}
        />

      </div>
      <div className={styles.checkbox_content}>
        <input id={styles.checkbox} type="checkbox" name="remember" />
        <p className={styles.label_checkbox}>Lembrar-me</p>
      </div>

      <div className={styles.button_content}>
        <Button disabled={!email || !password || !!errors.email || !!errors.password} className={!email || !password || !!errors.email || !!errors.password ? styles.disabled_button : ""} text="avançar" />
      </div>

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
