import React, { useEffect, useState } from "react";
import styles from "./form.module.css";
import Input from "@/pages/components/Input/Input_example_other";
import Title from "@/pages/components/Title";
import Button_submit from "../../Buttons/Button_owner";
import Button_back from "../../Buttons/Button_event";

import { useEventForm } from "@/functions/formPropierts";
import { editEvent, searchCEP } from "@/functions/requests";
import { useUserContext } from "@/context/userContext";
import { eventsObj } from "@/propierts/types";

interface eventProps { event?: eventsObj }

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

export default function EventForm(props: eventProps) {

  const [event] = useState(props.event);
  const { data: userData } = useUserContext();
  const [adress, setAdress] = useState<string | undefined>();
  const [whole, setWhole] = useState(0);
  const [half, setHalf] = useState(0);
  const [pair, setPair] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useEventForm({ mode: "onChange" });

  function formatEvent(data: any) {

    if (typeof data === "object") {
      const price = formatCurrency(String(data.price * 100));
      return price
    }
  }

  async function search() {

    const response = await searchCEP(props.event?.addressCep || "");
    const { logradouro, bairro, localidade, uf } = response.data;
    const format = `${logradouro}, ${bairro} - ${localidade}/${uf}`

    setAdress(format)

  }

  useEffect(() => {

    setWhole(Number(event?.ticketsBatches.find((ticket) => ticket.type == 1)?.totalQty))
    setHalf(Number(event?.ticketsBatches.find((ticket) => ticket.type == 2)?.totalQty))
    setPair(Number(event?.ticketsBatches.find((ticket) => ticket.type == 0)?.totalQty))

    search();

    reset({
      eventName: event?.name,
      img: event?.coverImageUrl,
      category: event?.category,
      eventDescription: event?.description,
      eventAttractions: event?.attractions[0],
      local: event?.local,
      eventCep: event?.addressCep,
      eventNumber: String(event?.addressNumber),
      completeAdress: adress,
      eventComplement: event?.addressComplement,
      ticketWhole: formatEvent(event?.ticketsBatches.find((ticket) => ticket.type == 1)),
      ticketWholeQuantity: String(event?.ticketsBatches.find((ticket) => ticket.type == 1)?.totalQty),
      ticketHalf: formatEvent(event?.ticketsBatches.find((ticket) => ticket.type == 2)),
      ticketHalfQuantity: String(event?.ticketsBatches.find((ticket) => ticket.type == 2)?.totalQty),
      ticketPair: formatEvent(event?.ticketsBatches.find((ticket) => ticket.type == 0)),
      ticketPairQuantity: String(event?.ticketsBatches.find((ticket) => ticket.type == 0)?.totalQty),
      ticketDescription: (event?.ticketsBatches.find((ticket) => ticket.type == 1))?.description,
      terms: true,
    })

  }, [event])

  const onSubmit = async (data: any) => {

    try {
      if (!userData?.token) {
        alert("Erro: Token não encontrado");
        return;
      }

      const formatData = {
        id: props.event?.id,
        ...data,
        eventNumber: Number(data.eventNumber),
        ticketsBatches: [

          {
            id: props.event?.ticketsBatches.find(ticket => ticket.type == 2)?.id,
            type: 2,
            price: parseFloat(data.ticketHalf.replace(/\D/g, '')) / 100,
            totalQty: Number(data.ticketHalfQuantity),
            description: data.ticketDescription
          },
          {
            id: props.event?.ticketsBatches.find(ticket => ticket.type == 1)?.id,
            type: 1,
            price: parseFloat(data.ticketWhole.replace(/\D/g, '')) / 100,
            totalQty: Number(data.ticketWholeQuantity),
            description: data.ticketDescription
          },
          {
            id: props.event?.ticketsBatches.find(ticket => ticket.type == 0)?.id,
            type: 0,
            price: parseFloat(data.ticketPair.replace(/\D/g, '')) / 100,
            totalQty: Number(data.ticketPairQuantity),
            description: data.ticketDescription
          }
        ]
      }

      const response = await editEvent(formatData, userData.token);

      if (response?.status === 200) {
        alert("Evento editado com sucesso!");

        console.log("Resposta:", response.data);
      } else {
        alert(`Erro ao registrar a edição do evento: ${response.data}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro interno ao editar evento");
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
          <p className={styles.text_error}>{errors.eventDescription?.message}</p>
        </div>

        <div className={`${styles.input_group} ${styles.dateTime}`}>
          <label htmlFor="local" className={styles.labelInputs}>Atrações do Evento</label>
          <Input
            {...register("eventAttractions")}
            className={`${styles.input} ${styles.attractions} ${errors.eventAttractions ? styles.input_error : styles.input_ok}`}
            placeholder="Descreva as atrações"
            maxLength={1000}
          />
          <p className={styles.text_error}>{errors.eventAttractions?.message}</p>
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
            <div className={`${styles.input_group} ${styles.localName}`}>
              <label htmlFor="local" className={styles.labelInputs}>Nome do local</label>
              <Input
                {...register("local")}
                placeholder="Nome do espaço"
                className={`${styles.input} ${errors.local ? styles.input_error : styles.input_ok}`}
              />
              <p className={styles.text_error}>{errors.local ? errors.local.message : ""}</p>
            </div>

            <div className={`${styles.input_group} ${styles.adressCEP}`}>
              <label htmlFor="eventCep" className={styles.labelInputs}>CEP</label>
              <Input
                {...register("eventCep")}
                type="text"
                onChange={async (e) => {

                  register("eventCep").onChange(e);

                  const cep = e.target.value

                  if (cep && cep.length === 8) {

                    const response = await searchCEP(cep);

                    if (response?.status == 200 && !response.data.erro) {

                      const { logradouro, bairro, localidade, uf } = response.data

                      const format = `${logradouro}, ${bairro} - ${localidade}/${uf}`

                      setAdress(format)
                    } else {
                      alert("CEP não encontrado")
                    }
                  }
                }}
                placeholder="Endereço postal"
                className={`${styles.input} ${errors.eventCep ? styles.input_error : styles.input_ok}`}
                maxLength={8}
              />
              <p className={styles.text_error}>{errors.eventCep?.message}</p>
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

            <div className={`${styles.input_group} ${styles.adress}`}>
              <label htmlFor="eventComplement" className={styles.labelInputs}>Endereço Completo</label>
              <Input
                {...register("completeAdress")}
                value={adress}
                onChange={(e) => {
                  setAdress(e.target.value)
                }}
                placeholder="Digite o endereço completo"
                className={`${styles.input} ${errors.completeAdress ? styles.input_error : styles.input_ok}`}
              />
            </div>

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
            <div className={styles.group_ticket}>
              <label className={styles.labelInputs}>Inteira</label>
              <div className={styles.group_value}>
                <div id={styles.ticket_value} className={styles.input_group}>
                  <p className={styles.subtitle}>Valor:</p>
                  <Input
                    {...register("ticketWhole")}
                    type="text"
                    placeholder="R$ 0,00"
                    id={styles.input_ticket_value}
                    className={`${styles.input} ${errors.ticketWhole ? styles.input_error : styles.input_ok}`}
                    onChange={(e) => {
                      // Primeiro formata os valores que recebe do campo
                      const formatted = formatCurrency(e.target.value);
                      // Agora atribui ao próprio campo o valor formatado
                      e.target.value = formatted;

                      register("ticketWhole").onChange(e);
                    }}
                  />
                  {errors.ticketWhole && <p className={styles.text_error}>{errors.ticketWhole.message}</p>}
                </div>
                <div id={styles.ticket_value} className={styles.input_group}>
                  <p className={styles.subtitle}>Quantidade total de ingressos</p>
                  <Input
                    {...register("ticketWholeQuantity")}
                    type="number"
                    value={whole}
                    id={styles.input_ticket_value}
                    className={`${styles.input} ${errors.ticketWholeQuantity ? styles.input_error : styles.input_ok}`}
                    onChange={(e) => {

                      const format = Number(e.target.value)

                      if (format <= 0) {
                        setWhole(0)
                        console.log(format)
                      } else {
                        setWhole(format)
                      }
                      register("ticketWholeQuantity").onChange(e);
                    }}
                  />
                  {errors.ticketWholeQuantity && <p className={styles.text_error}>{errors.ticketWholeQuantity.message}</p>}
                </div>
              </div>
            </div>

            <div className={styles.group_ticket}>
              <label className={styles.labelInputs}>Meia</label>
              <div className={styles.group_value}>
                <div id={styles.ticket_value} className={styles.input_group}>
                  <p className={styles.subtitle}>Valor:</p>
                  <Input
                    {...register("ticketHalf")}
                    type="text"
                    placeholder="R$ 0,00"
                    id={styles.input_ticket_value}
                    className={`${styles.input} ${errors.ticketHalf ? styles.input_error : styles.input_ok}`}
                    onChange={(e) => {
                      // Primeiro formata os valores que recebe do campo
                      const formatted = formatCurrency(e.target.value);
                      // Agora atribui ao próprio campo o valor formatado
                      e.target.value = formatted;
                      register("ticketHalf").onChange(e);
                    }}
                  />
                  {errors.ticketHalf && <p className={styles.text_error}>{errors.ticketHalf.message}</p>}
                </div>
                <div id={styles.ticket_value} className={styles.input_group}>
                  <p className={styles.subtitle}>Quantidade total de ingressos</p>
                  <Input
                    {...register("ticketHalfQuantity")}
                    type="number"
                    value={half}
                    id={styles.input_ticket_value}
                    className={`${styles.input} ${errors.ticketHalfQuantity ? styles.input_error : styles.input_ok}`}
                    onChange={async (e) => {

                      const format = Number(e.target.value)

                      if (format <= 0) {
                        setHalf(0)
                        console.log(format)
                      } else {
                        setHalf(format)
                      }
                      register("ticketHalfQuantity").onChange(e);
                    }}
                  />
                  {errors.ticketHalfQuantity && <p className={styles.text_error}>{errors.ticketHalfQuantity.message}</p>}
                </div>
              </div>
            </div>

            <div className={styles.group_ticket}>
              <label className={styles.labelInputs}>Casadinha</label>
              <div className={styles.group_value}>
                <div id={styles.ticket_value} className={styles.input_group}>
                  <p className={styles.subtitle}>Valor:</p>
                  <Input
                    {...register("ticketPair")}
                    type="text"
                    placeholder="R$ 0,00"
                    id={styles.input_ticket_value}
                    className={`${styles.input} ${errors.ticketPair ? styles.input_error : styles.input_ok}`}
                    onChange={(e) => {
                      // Primeiro formata os valores que recebe do campo
                      const formatted = formatCurrency(e.target.value);
                      // Agora atribui ao próprio campo o valor formatado
                      e.target.value = formatted;
                      register("ticketPair").onChange(e);
                    }}
                  />
                  {errors.ticketPair && <p className={styles.text_error}>{errors.ticketPair.message}</p>}
                </div>
                <div id={styles.ticket_value} className={styles.input_group}>
                  <p className={styles.subtitle}>Quantidade total de ingressos</p>
                  <Input
                    {...register("ticketPairQuantity")}
                    type="number"
                    value={pair}
                    id={styles.input_ticket_value}
                    className={`${styles.input} ${errors.ticketPairQuantity ? styles.input_error : styles.input_ok}`}
                    onChange={(e) => {


                      const format = Number(e.target.value)

                      if (format <= 0) {
                        setPair(0)
                        console.log(format)
                      } else {
                        setPair(format)
                      }
                      register("ticketPairQuantity").onChange(e);
                    }}
                  />
                  {errors.ticketPairQuantity && <p className={styles.text_error}>{errors.ticketPairQuantity.message}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tickets_aditional}>
            <label className={styles.labelInputs}>Descrição (opcional)</label>
            <textarea
              {...register("ticketDescription")}
              id={styles.ticket_description}
              placeholder="Caso o ingresso dê direito a brindes ou tenha exceções."
              className={`${styles.input} ${styles.input_ok}`}
            />
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

        <p id={styles.terms} className={styles.information}>
          <img className={styles.information_icon} src="/information_icon.png" />Ao publicar este evento, declaro ser o responsável por sua realização e comprometo-me a cumprir integralmente todas as leis e regulamentações aplicáveis.
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
        <Button_submit id={styles.button_event} type="submit" radius="40px"><img className={styles.add_icon} src="/add_icon.svg" />cadastrar evento</Button_submit>
        <Button_back id={styles.button_event} type="button" onClick={() => window.history.back()} radius="40px"><img className={styles.back_icon} src="/back_icon.png" />Voltar</Button_back>
      </div>
    </form >
  );
}