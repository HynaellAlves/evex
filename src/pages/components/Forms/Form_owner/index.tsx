"use client";

import React, { useEffect, useState } from 'react';
import styles from "./form.module.css";
import Img from '@/pages/components/Image';

import Input from '@/pages/components/Input/Input_example_other';
import Title from '@/pages/components/Title';
import Button from '@/pages/components/Buttons/Button_default';
import { useOwnerForm } from "@/functions/formPropierts";

export default function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useOwnerForm();

  const [step, setStep] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string | null>("create");

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit = (data: any) => {
    console.log("Dados enviados:", data);

    if (step < 2) {
      nextStep();
    } else {
      alert("Formulário finalizado com sucesso!");
    }
  };

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 8);
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatDate(raw);
    setValue("date", formatted);
  };

  return (
    <form
      className={step >= 2 ? styles.formbackground : styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {step === 1 && (
        <div className={styles.title_content}>
          <Title
            class={styles.title}
            title="Cadastrar Usuário"
            fontFamily="var(--font-poppins)"
            fontWeight={700}
            uppercase
          />
        </div>
      )}

      <div className={styles.formProgess_content}>
        <div className={`${styles.circles} ${step >= 1 ? styles.progess_on : styles.progess_off}`}>
          <p>1</p>
        </div>
        <div className={`${styles.progess_bar} ${step >= 2 ? styles.progess_on : styles.progess_off}`} />
        <div className={`${styles.circles} ${step >= 2 ? styles.progess_on : styles.progess_off}`}>
          <p>2</p>
        </div>
      </div>

      {step === 1 && (
        <div className={styles.inputs_container}>
          <Input
            {...register("name")}
            type="text"
            placeholder={errors.name ? "Nome inválido" : "Nome completo"}
            className={errors.name ? styles.input_error : styles.input_ok}
            autoComplete="name"
            onChange={(e) => {
              register("name").onChange(e)
              trigger("name")
            }}
          />

          <div className={styles.inputs_row}>
            <Input
              {...register("date")}
              type="text"
              placeholder={"Data de nascimento"}
              className={errors.date ? styles.input_error : styles.input_ok}
              maxLength={10}
              autoComplete="bday"
              onChange={(e) => {
                register("date").onChange(e)
                handleDateChange(e)
                trigger("date")
              }}
            />

            <Input
              {...register("email")}
              type="email"
              placeholder={errors.email ? "E-mail inválido" : "E-mail"}
              className={errors.email ? styles.input_error : styles.input_ok}
              autoComplete="username"
              onChange={(e) => {
                register("email").onChange(e)
                trigger("email")
              }}
            />
          </div>

          <div className={styles.inputs_row}>
            <Input
              {...register("cep")}
              type="text"
              placeholder={errors.cep ? "CEP inválida" : "CEP"}
              className={errors.cep ? styles.input_error : styles.input_ok}
              maxLength={8}
              onChange={(e) => {
                register("cep").onChange(e)
                trigger("cep")
              }}
            />
            <Input
              {...register("number")}
              type="text"
              placeholder={errors.number ? "Número inválido" : "Nº"}
              className={errors.number ? styles.input_error : styles.input_ok}
              onChange={(e) => {
                register("number").onChange(e)
                trigger("number")
              }}
            />
          </div>

          <Input
            {...register("complement")}
            type="text"
            placeholder="Complemento (opcional)"
            className={styles.input_ok}
            onChange={(e) => {
              register("complement").onChange(e)
              trigger("complement")
            }}
          />

          <div className={styles.inputs_row}>
            <Input
              {...register("cpfCnpj")}
              type="text"
              placeholder={errors.cpfCnpj ? "CPF/CNPJ inválido" : "CPF/CNPJ"}
              className={errors.cpfCnpj ? styles.input_error : styles.input_ok}
              onChange={(e) => {
                register("cpfCnpj").onChange(e)
                trigger("cpfCnpj")
              }}
            />
            <Input
              {...register("phonenumber")}
              type="tel"
              placeholder={errors.phonenumber ? "Telefone inválido" : "Telefone"}
              className={errors.phonenumber ? styles.input_error : styles.input_ok}
              autoComplete="tel"
              onChange={(e) => {
                register("phonenumber").onChange(e)
                trigger("phonenumber")
              }}
            />
          </div>

          <Input
            {...register("profilephoto")}
            type="url"
            placeholder={errors.profilephoto ? "URL inválida" : " URL Foto de perfil (opcional)"}
            className={errors.profilephoto ? styles.input_error : styles.input_ok}
            autoComplete="url"
            onChange={(e) => {
              register("profilephoto").onChange(e)
              trigger("profilephoto")
            }}
          />

          <div className={styles.checkboxs_container}>
            <div className={styles.checkbox_content}>
              <input
                {...register("defaultPassword")}
                id={styles.checkbox}
                type="checkbox"
                checked={selectedOption === "default"}
                onChange={(e) => {
                  register("defaultPassword").onChange(e)
                  setSelectedOption("default")
                  setValue("password", "12345678")
                  trigger("defaultPassword")
                  trigger("password")
                }}
              />
              <p>Senha padrão</p>
            </div>

            <div className={styles.checkbox_content}>
              <input
                {...register("createPassword")}
                id={styles.checkbox}
                type="checkbox"
                checked={selectedOption === "create"}
                onChange={(e) => {
                  register("createPassword").onChange(e)
                  setSelectedOption("create")
                  setValue("password", "")
                  trigger("createPassword")
                  trigger("password")
                }}
              />
              <p>Criar senha</p>
            </div>

            <div className={styles.checkbox_content}>
              <input
                {...register("userCreatesPassword")}
                id={styles.checkbox}
                type="checkbox"
                checked={selectedOption === "user"}
                onChange={(e) => {
                  register("userCreatesPassword").onChange(e)
                  setSelectedOption("user")
                  setValue("password", "12345678")
                  trigger("userCreatesPassword")
                  trigger("password")
                }}
              />
              <p>Criada pelo usuário</p>
            </div>
          </div>

          {selectedOption === "create" && (
            <Input
              {...register("password")}
              type="password"
              placeholder={errors.password ? "Senha inválida" : "Crie uma senha"}
              id={styles.newpassword}
              className={`${errors.password ? styles.input_error : styles.input_ok} ${styles.password_input}`}
              autoComplete="new-password"
              showEye={false}
              onChange={(e) => {
                register("password").onChange(e)
                trigger("password")
              }}
            />
          )}
        </div>
      )}

      {step === 2 && (
        <div className={styles.inputs_container3}>
          <Img src="/accept_reset.png" width={314} height={289} class={""} />
          <Title
            class={styles.title}
            title="Usuário criado com sucesso!"
            fontFamily="var(--font-poppins)"
            fontWeight={700}
          />
          <p id={styles.subtitle}>Clique no botão abaixo para ser redirecionado.</p>
        </div>
      )}

      <div className={step === 2 ? styles.button_content3 : styles.button_content}>
        <Button
          type="submit"
          text={step < 2 ? "avançar" : "início"}
          disabled={step === 1 && !isValid}
        />
      </div>
    </form>
  );
}
