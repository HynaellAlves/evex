/* O componente funciona sem o 'user client' e seria interessante usar a mesma abordagem do outro form nesse
usando o componente de input novo
*/

import React, { useEffect, useState } from "react";

import Input from "@/pages/components/Input/Input_default";
import Title from "@/pages/components/Title";
import Button from "@/pages/components/Buttons/Button_default"
import { toast_sucess, toast_error, toast_loading } from "../../Toast/toast";

import styles from "./form.module.css";

import { Login, Redirect } from '@/functions/requests';
import { useLoginForm } from "@/functions/formPropierts";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/router";

export default function Form() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState<any>();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm({ mode: "onChange" });

  const { setData } = useUserContext();

  async function onSubmit(data: any) {

    toast_loading("Carregando...");

    const response = await Login(data);
    setResponse(response);
  }

  useEffect(() => {

    if (response) {

      if (response.status) {

        toast_error(`Erro de Login ${response.data}`);

      } else if (response.permissions) {

        toast_sucess(`Bem vindo(a) ${response.email}`);

        const user = {
          id: response.id,
          email: response.email,
          permission: response.permissions
        }

        setData(user);

          Redirect(response.permissions, router);

      }
    }
  }, [response])

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
