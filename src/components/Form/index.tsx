"use client";

import React from "react";
import Input from "../Input";
import Button from "../Button"
import Img from "../Image"
import styles from "./form.module.css";
import { useLoginForm } from "@/functions/requests"; 


export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  function onSubmit(data: any) {
    console.log("Dados enviados:", data);
  }

  return (
    <>
      <form className={styles.box_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.box_input}>
        <Input
          {...register("email")}
          type="email"
          placeholder={errors.email ? "Email ou senha incorretos" : "E-mail"}
          className={errors.email ? styles.input_error : ""}
          name="email"
          autoComplete="username"
          />

        <Input
          {...register("senha")}
          type="password"
          placeholder={errors.senha ? "Email ou senha incorretos" : "Senha"}
          className={errors.senha ? styles.input_error : ""}
          name="senha"
          autoComplete="current-password"
          />
          </div>
        <Button/>

      <div className={styles.box_hyperlink}>
        <div className={styles.hyperlink_google}>
          <Img class={styles.google} src='/google_logo.png' alt="Google" width={44} height={44} />
          <a id={styles.google_link} href="#">Faça login com o Google</a>
        </div>
        <a id={styles.password_link} href="#">
          Esqueceu a senha/Primeiro acesso?
        </a>
      </div>
      </form>
    </>
  );
}
