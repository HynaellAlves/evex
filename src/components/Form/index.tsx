"use client";

import React from "react";
import Input from "../Input";
import Img from "../Image"
import "./style.css";
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
      <form className="box_input" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          type="email"
          placeholder={errors.email ? "Email ou senha incorretos" : "E-mail"}
          className={errors.email ? "input-error" : ""}
          name="email"
          autoComplete="username"
        />

        <Input
          {...register("senha")}
          type="password"
          placeholder={errors.senha ? "Email ou senha incorretos" : "Senha"}
          className={errors.senha ? "input-error" : ""}
          name="senha"
          autoComplete="current-password"
        />
        <button type="submit">Entrar</button>
      </form>

      <div className="box_hyperlink">
        <div className="hyperlink_google">
          <Img id="teste" src='/google logo.png' alt="Google" width={60} height={60} />
          <a href="#">Faça login com o Google</a>
        </div>
        <a id="password_link" href="#">
          Esqueceu a senha/Primeiro acesso?
        </a>
      </div>
    </>
  );
}
