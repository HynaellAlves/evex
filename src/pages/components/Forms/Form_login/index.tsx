
// Importando componentes de função React
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Importando estilo da página modularizado
import styles from "./form.module.css";

// Importando componentes da página
import Input from "@/pages/components/Input/Input_default";
import Title from "@/pages/components/Title";
import Button from "@/pages/components/Buttons/Button_default"
import showToast from "@/pages/components/Toast/toast"

// Importando funções do form de login
import { Login, Redirect } from '@/functions/requests';

// Importando tipo do formulário com os tipos dos inputs para validação
import { useLoginForm } from "@/functions/formPropierts";

// Importando context global para extrair as constantes guardadas dentro dele
import { useUserContext } from "@/context/userContext";

export default function Form() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState<any>();

  const router = useRouter();

  // Extraindo do tipo do formulário as funções de submitar e registrar os campos com os tipos definidos
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm({ mode: "onChange" });

  // Extraindo as funções para guardar no context, os dados de usuário e se vai lembrar a senha ou não
  const { setData, setRemenber } = useUserContext();

  /*
  Essa função executa o evento de login que faz a rotina de chamadas na API interna e externa para realizar o Login
  */

  // Função
  async function onSubmit(data: any) {

    // Toast da página, posteriormente será modificado
    showToast("Carregando...", "info")

    // Função de Login importada do arquivo de requests
    const response = await Login(data);

    // Setando no estado Response o retorno da API externa => interna => requests
    setResponse(response);
  }

  /*
  Essa função captura o evento do checkbox "Lembrar senha" junto com um onChange no elemento
  Se for marcado ou desmarcado manda um "true" ou "false" para o context global que decide se guarda os dados
  */

  async function onchange(event: ChangeEvent<HTMLInputElement>) {

    if (event.target.checked) {
      setRemenber(true);
    } else {
      setRemenber(false);
    }
  }

  /* 
  Esse observador espera o estado de resposta
  quando a API retorna a resposta ele exibe os toasts  e redireciona para a área logada
  Ele também manda o dado para o context global
  */

  useEffect(() => {

    if (response) {

      if (response.status) {

        showToast(`Erro de Login ${response.data}`, "error")

      } else if (response.permissions) {

        showToast(`Bem vindo(a) ${response.email}`, "success")

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
        <input onChange={onchange} id={styles.checkbox} type="checkbox" name="remember" />
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
