import React, { useState } from "react";
import styles from "./form.module.css";
import Input from "@/pages/components/Input/Input_example_other";
import Title from "@/pages/components/Title";
import Button_submit from "../../Buttons/Button_owner";
import Button_back from "../../Buttons/Button_event";

import { useEventForm } from "@/functions/formPropierts";
import { registerEvent } from "@/functions/requests";
import { useUserContext } from "@/context/userContext";

// Função para formatar valor em moeda
// Obs: É executado como evento de Onchange no input, ou seja executa a cada alteração
const formatCurrency = (value: string) => {
  // Remove tudo que não é número, isso inclui espaços e letras, por isso o primeiro parametro é um regex
  const numbers = value.replace(/\D/g, '');

  // Se não tem números, retorna vazio, se retornar vazio o schema acusa
  if (numbers === '') return '';

  // Transforma em inteiro o número e depois divide por 100 para destacar a vírgula
  const number = parseInt(numbers) / 100;

  // Detecta o local do navegador para formatar com base na região
  const userLocale = navigator.language || 'pt-BR';

  // Formata de acordo com o local
  return number.toLocaleString(userLocale, {
    style: 'currency',
    currency: 'BRL' // Aqui ainda formata a moeda como BRL 00,00 ou 00.00 mas usa o caractere da região
  });
};

export default function EventForm() {

  const { data: userData } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useEventForm({ mode: "onChange" });

  const onSubmit = async (data: any) => {

    try {
      if (!userData?.token) {
        alert("Erro: Token não encontrado");
        return;
      }

      const formatValue = () => {
        const value = data.ticketValue
        const numbers = value.replace(/\D/g, '');
        const number = parseInt(numbers);

        return number
      }

      const formatData = {
        ...data,
        eventNumber: Number(data.eventNumber),
        quantity: Number(data.quantity),
        ticketValue: formatValue()
      }

      const response = await registerEvent(formatData, userData.token);

      if (response?.status === 201) {
        alert("Evento registrado com sucesso!");
        console.log("Resposta:", response.data);
      } else {
        alert(`Erro ao registrar evento: ${response?.data}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro interno ao registrar evento");

      // console.log(formatData.ticketValue);
    }
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <section className={styles.container}>
        <Title
          uppercase
          class={styles.title_section}
          title="1. INFORMAÇÕES BÁSICAS"
          fontFamily="var(--font-poppins)"
          fontWeight={700}
        />
        <p className={styles.paragraph}>adicione as principais informações do evento</p>

        {/* Nome do evento */}
        <div className={styles.input_group}>
          <label htmlFor="eventName" className={styles.labelInputs}>Nome do evento</label>
          <Input
            {...register("eventName")}
            type="text"
            className={`${styles.input} ${errors.eventName ? styles.input_error : styles.input_ok}`}
            autoComplete="eventName"
          />
          <p className={styles.text_error}>{errors.eventName ? errors.eventName.message : ""}</p>
        </div>

        {/* URL da imagem */}
        <div className={styles.input_group}>
          <label htmlFor="img" className={styles.labelInputs}>Imagem de divulgação</label>
          <Input
            {...register("img")}
            type="text"
            id="imagemEvento"
            className={`${styles.input} ${errors.img ? styles.input_error : styles.input_ok}`}
            placeholder="Endereço URL do Banner do Evento"
          />
          <p className={styles.text_error}>{errors.img ? errors.img.message : ""}</p>

          {/* Recomendações */}
          <ul className={styles.list}>
            <li className={styles.small_paragraph}>
              <small>A dimensão recomendada é de 1600 x 838</small>
            </li>
            <li className={styles.small_paragraph}>
              <small>(mesma proporção das páginas de evento no Facebook)</small>
            </li>
            <li className={styles.small_paragraph}>
              <small>Formato JPG, GIF ou PNG de no máximo 2MB</small>
            </li>
            <li className={styles.small_paragraph}>
              <small>Imagens com dimensões diferentes serão redimensionadas.</small>
            </li>
          </ul>
        </div>

        {/* Categoria do evento */}
        <div id={styles.category_group} className={styles.input_group}>
          <label htmlFor="category" className={styles.labelInputs}>Classifique seu evento</label>
          <select
            {...register("category")}
            id={styles.category_select}
            className={`${styles.input} ${errors.category ? styles.input_error : styles.input_ok}`}
          >
            <option value="">Selecionar categoria</option>
            <option value="workshop">Workshop</option>
            <option value="palestra">Palestra</option>
            <option value="cultural">Evento Cultural</option>
            <option value="networking">Networking</option>
          </select>
          {errors.category && <p className={styles.text_error}>{errors.category.message}</p>}
        </div>
      </section>

      <section className={styles.container}>
        <Title
          uppercase
          class={styles.title_section}
          title="2. DATA E HORÁRIO"
          fontFamily="var(--font-poppins)"
          fontWeight={700}
        />
        <p className={styles.paragraph}>adicione quando seu evento vai acontecer</p>

        <div className={styles.dateTime_content}>
          <div className={styles.StartEndtEvent}>
            {/* Data do evento */}
            <div className={`${styles.input_group} ${styles.dateTime}`}>
              <label htmlFor="startDateEvent" className={styles.labelInputs}>Data de início</label>
              <Input
                {...register("startDateEvent")}
                type="date"
                id={styles.date_input}
                className={`${styles.input} ${errors.startDateEvent ? styles.input_error : styles.input_ok}`}
              />
              {errors.startDateEvent && (
                <p className={styles.text_error}>{errors.startDateEvent.message}</p>
              )}
            </div>
            {/* Hora do evento */}
            <div className={`${styles.input_group} ${styles.dateTime}`}>
              <label htmlFor="startHourEvent" className={styles.labelInputs}>Hora de início</label>
              <Input
                {...register("startHourEvent")}
                type="time"
                id={styles.hour_input}
                className={`${styles.input} ${errors.startHourEvent ? styles.input_error : styles.input_ok}`}
              />
              <p className={styles.text_error}>{errors.startHourEvent?.message}</p>
            </div>
          </div>

          <div className={styles.StartEndtEvent}>
            {/* Hora do evento */}
            <div className={`${styles.input_group} ${styles.dateTime}`}>
              <label htmlFor="date" className={styles.labelInputs}>Data de término</label>
              <Input
                {...register("endDateEvent")}
                id={styles.date_input}
                type="date"
                className={`${styles.input} ${errors.endDateEvent ? styles.input_error : styles.input_ok}`}
              />
              <p className={styles.text_error}>{errors.endDateEvent?.message}</p>
            </div>
            <div className={`${styles.input_group} ${styles.dateTime}`}>
              <label htmlFor="hour" className={styles.labelInputs}>Hora de término</label>
              <Input
                {...register("endHourEvent")}
                id={styles.hour_input}
                className={`${styles.input} ${errors.endHourEvent ? styles.input_error : styles.input_ok}`}
                type="time"
              />
              <p className={styles.text_error}>{errors.endHourEvent?.message}</p>
            </div>
          </div>
        </div>

        <p className={styles.labelInputs}>Seu evento vai durar x tempo</p>
      </section>

      <section className={styles.container}>
        <Title
          uppercase
          class={styles.title_section}
          title="3. DESCRIÇÃO"
          fontFamily="var(--font-poppins)"
          fontWeight={700}
        />
        <p id={styles.paragraph_details} className={styles.paragraph}>CONTE TODOS OS DETALHES DO SEU EVENTO, COM A PROGRAMAÇÃO E OS DIFERENCIAIS DA SUA PRODUÇÃO!</p>
        <div className={`${styles.input_group} ${styles.dateTime}`}>
          <textarea
            {...register("eventDescription")}
            className={`${styles.input} ${styles.text_description} ${styles.input_ok}`}
            placeholder="Adicione aqui sua Descrição do evento..."
            maxLength={2000}
          />
        </div>

        <p className={styles.labelInputs}>Até 2.000 caracteres.</p>
      </section>

      <section className={styles.container}>
        <Title
          uppercase
          class={styles.title_section}
          title="4. ONDE VAI ACONTECER?"
          fontFamily="var(--font-poppins)"
          fontWeight={700}
        />
        <div className={styles.container_location}>
          <div className={styles.adress_information}>
            <label id={styles.localDefined} className={styles.checkbox_group}>
              <input
                {...register("localDefined")}
                type="checkbox"
                className={styles.checkbox}
              />
              Local ainda será definido
            </label>
            <div className={`${styles.input_group} ${styles.localName}`}>
              <label htmlFor="local" className={styles.labelInputs}>Nome do local</label>
              <Input
                {...register("local")}
                placeholder="Nome do espaço"
                className={`${styles.input} ${errors.local ? styles.input_error : styles.input_ok}`}
              />
            </div>

            <div className={`${styles.input_group} ${styles.adressCEP}`}>
              <label htmlFor="eventCep" className={styles.labelInputs}>CEP</label>
              <Input
                {...register("eventCep")}
                type="text"
                placeholder="Endereço postal"
                className={`${styles.input} ${errors.eventCep ? styles.input_error : styles.input_ok}`}
                maxLength={8}
              />
              <p className={styles.text_error}>{errors.eventCep ? errors.eventCep.message : ""}</p>
            </div>

            <div className={`${styles.input_group} ${styles.numberLocal}`}>
              <label htmlFor="eventNumber" className={styles.labelInputs}>Nº</label>
              <Input
                {...register("eventNumber")}
                type="number"
                placeholder="Nº"
                className={`${styles.input} ${errors.eventNumber ? styles.input_error : styles.input_ok}`}
              />
              {errors.eventNumber && <p className={styles.text_error}>{errors.eventNumber.message}</p>}
            </div>

            <div className={`${styles.input_group} ${styles.complementLocal}`}>
              <label htmlFor="eventComplement" className={styles.labelInputs}>Complemento</label>
              <Input
                {...register("eventComplement")}
                placeholder="Informações que ajudem na localização..."
                className={`${styles.input} ${errors.eventComplement ? styles.input_error : styles.input_ok}`}
              />
            </div>
            <label id={styles.showMap} className={styles.checkbox_group}>
              <input
                {...register("showMap")}
                type="checkbox"
                className={styles.checkbox}
              />
              Mostrar o endereço no Google Maps
            </label>
          </div>
          <div className={styles.map}>
            <img className={styles.map_image} src="/mapaEvents.png" alt="mapa Events" />
          </div>
        </div>
      </section>

      <section className={styles.container}>
        <Title
          uppercase
          class={styles.title_section}
          title="5. INGRESSO"
          fontFamily="var(--font-poppins)"
          fontWeight={700}
        />
        <div className={styles.tickets_content}>
          <div className={styles.tickets_information}>
            <label id={styles.ticket_cost} className={styles.radio_option}>
              <input
                {...register("ticketType")}
                type="radio"
                value="pago"
              />
              Ingresso pago
            </label>
            <label id={styles.ticket_free} className={styles.radio_option}>
              <input
                {...register("ticketType")}
                type="radio"
                value="gratis"
              />
              Ingresso grátis
            </label>

            <p id={styles.type_error} className={styles.text_error}>{errors.ticketType?.message}</p>

            <div id={styles.ticket_value} className={styles.input_group}>
              <label className={styles.labelInputs}>Valor</label>
              <Input
                {...register("ticketValue")}
                type="text"
                placeholder="R$ 0,00"
                className={`${styles.input} ${errors.ticketValue ? styles.input_error : styles.input_ok}`}
                onChange={(e) => {
                  // Primeiro formata os valores que recebe do campo
                  const formatted = formatCurrency(e.target.value);
                  // Agora atribui ao próprio campo o valor formatado
                  e.target.value = formatted;
                }}
              />
              {errors.ticketValue && <p className={styles.text_error}>{errors.ticketValue.message}</p>}
            </div>

            <div id={styles.start_sold} className={styles.input_group}>
              <label className={styles.labelInputs}>Início das vendas</label>
              <Input
                {...register("startSold")}
                id={styles.date_input}
                type="date"
                className={`${styles.input} ${errors.startSold ? styles.input_error : styles.input_ok}`}
              />
              {errors.startSold && <p className={styles.text_error}>{errors.startSold.message}</p>}
            </div>

            <div id={styles.end_sold} className={styles.input_group}>
              <label className={styles.labelInputs}>Término das vendas</label>
              <Input
                {...register("endSold")}
                id={styles.date_input}
                type="date"
                className={`${styles.input} ${errors.endSold ? styles.input_error : styles.input_ok}`}
              />
              {errors.endSold && <p className={styles.text_error}>{errors.endSold.message}</p>}
            </div>

            <div id={styles.quantityForBuy} className={styles.input_group}>
              <label className={styles.labelInputs}>Quantidade total de ingressos</label>
              <Input
                {...register("quantity")}
                id={styles.quantity_input}
                type="number"
                placeholder="0"
                className={`${styles.input} ${errors.quantity ? styles.input_error : styles.input_ok}`}
              />
              {errors.quantity && <p className={styles.text_error}>{errors.quantity.message}</p>}
            </div>

            <label id={styles.tax_absolve} className={styles.checkbox_group}>
              <input
                {...register("absolveTax")}
                type="checkbox"
                className={`${styles.checkbox}`}
              />
              Absorver taxa de serviço
            </label>
          </div>
          <div className={styles.tickets_aditional}>
            <label className={styles.labelInputs}>Descrição (opcional)</label>
            <textarea
              {...register("ticketDescription")}
              id={styles.ticket_description}
              placeholder="Caso o ingresso dê direito a brindes ou tenha exceções."
              className={`${styles.input} ${styles.input_ok}`}
            />

            <div className={styles.ticketBatch}>
              <div className={styles.input_group}>
                <label className={styles.labelInputs}>Nome do Cupom</label>
                <Input
                  {...register("ticketNameHalfPrice")}
                  placeholder="Nome"
                  className={`${styles.input} ${errors.ticketNameHalfPrice ? styles.input_error : styles.input_ok}`}
                />
                {errors.ticketNameHalfPrice && <p className={styles.text_error}>{errors.ticketNameHalfPrice.message}</p>}
              </div>
              <div className={styles.input_group}>
                <label className={styles.labelInputs}>Valor do Cupom</label>
                <Input
                  {...register("ticketHalfPrice")}
                  placeholder="R$ 0,00"
                  className={`${styles.input} ${errors.ticketHalfPrice ? styles.input_error : styles.input_ok}`}
                />
                {errors.ticketHalfPrice && <p className={styles.text_error}>{errors.ticketHalfPrice.message}</p>}
              </div>
            </div>
            <p id={styles.information} className={styles.information}><img className={styles.information_icon} src="/information_icon.png" />A meia-entrada precisa ser a mesma para todos os grupos elegíveis.</p>
          </div>
        </div>
      </section>

      <section className={styles.container}>
        <Title
          uppercase
          class={styles.title_section}
          title="6. RESPONSABILIDADES"
          fontFamily="var(--font-poppins)"
          fontWeight={700}
        />
        <div id={styles.radio_terms} className={styles.radio_group}>
          <label className={styles.radio_option}>
            <input
              {...register("typeEvent")}
              type="radio"
              value="publico"
            />
            Evento Público
          </label>
          <label className={styles.radio_option}>
            <input
              {...register("typeEvent")}
              type="radio"
              value="privado"
            />
            Evento Privado
          </label>
        </div>
        {errors.typeEvent && <p className={styles.text_error}>{errors.typeEvent.message}</p>}

        <p id={styles.terms} className={styles.information}>
          <img className={styles.information_icon} src="/information_icon.png" /> Ao publicar este evento, estou de acordo com os Termos de uso, com as Diretrizes de Comunidade e com as Regras de meia-entrada, bem como declaro estar ciente da Política de Privacidade e das Obrigatoriedades Legais.
        </p>

        <label className={styles.checkbox_group}>
          <input
            {...register("terms")}
            type="checkbox"
            className={`${styles.checkbox}`}
          />
          Aceitar termos
        </label>
        {errors.terms && <p className={styles.text_error}>{errors.terms.message}</p>}
      </section>
      <div className={styles.page_butons}>
        <Button_submit class={styles.button_event} type="submit" radius="40px"><img className={styles.add_icon} src="/add_icon.svg" />cadastrar evento</Button_submit>
        <Button_back class={styles.button_event} type="button" onClick={() => window.history.back()} radius="40px"><img className={styles.back_icon} src="/back_icon.png" />Voltar</Button_back>
      </div>
    </form >
  );
}