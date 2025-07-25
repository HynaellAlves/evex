import React from "react";
import styles from "./form.module.css";
import Input from "@/pages/components/Input/Input_example_other";
import Title from "@/pages/components/Title";
import { useLoginForm } from "@/functions/formPropierts";

export default function EventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm({ mode: "onChange" });

  const onSubmit = (data: any) => {
    console.log("Dados enviados:", data);
  };

  return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.container}>
            <div className={styles.infEvento}>
              <Title
                class={styles.informacoes}
                title="1. INFORMAÇÕES BÁSICAS"
                fontFamily="var(--font-poppins)"
                fontWeight={700}
              />
              <p className={styles.paragrafo}>ADICIONE AS PRINCIPAIS INFORMAÇÕES DO EVENTO.</p>

              {/* Nome do evento */}
              <label htmlFor="name" className={styles.nomeEvento}>Nome do evento</label>
              <Input
                {...register("name")}
                type="text"
                placeholder="Nome completo"
                className={`${styles.input} ${errors.name ? styles.input_error : styles.input_ok}`}
                autoComplete="name"
                name="name"
              />

              {/* URL da imagem */}
              <label htmlFor="" className={styles.nomeEvento}>Imagem de divulgação (opcional)</label>
              <input
                {...register("img")}
                type="text"
                id="imagemEvento"
                className={`${styles.input} ${errors.img ? styles.input_error : styles.input_ok}`}
                placeholder="URL da imagem"
                name="img"
              />

              {/* Recomendações */}
              <small className={styles.small}>A dimensão recomendada é de 1600 x 838</small>
              <small className={styles.small}>(mesma proporção das páginas de evento no Facebook)</small>
              <small className={styles.small}>Formato JPG, GIF ou PNG de no máximo 2MB</small>
              <small className={styles.small}>Imagens com dimensões diferentes serão redimensionadas.</small>

              {/* Categoria do evento */}
              <label htmlFor="categoriaEvento" className={styles.nomeEvento}>Classifique seu evento</label>
              <select id="categoriaEvento" className={styles.input}>
                <option value="">Selecionar categoria</option>
                <option value="workshop">Workshop</option>
                <option value="palestra">Palestra</option>
                <option value="cultural">Evento Cultural</option>
                <option value="networking">Networking</option>

              </select>
            </div>
        </section>



        <section className={styles.container}>
          <div className={styles.infDataHora}>
            <Title
              class={styles.informacoes}
              title="2. DATA E HORÁRIO"
              fontFamily="var(--font-poppins)"
              fontWeight={700}
            />
            <p className={styles.paragrafo}>ADICIONE QUANDO SEU EVENTO VAI ACONTECER.</p>

            <div className={styles.infDataHora2}>
              {/* Data do evento */}
              <label htmlFor="date" className={styles.nomeEvento2}>Data de início</label>
              <input
                {...register("date")}
                type="date"
                id="dataEvento"
                className={`${styles.input2} ${errors.date ? styles.input_error : styles.input_ok}`}
                name="date"
              />
              <label htmlFor="hour" className={styles.nomeEvento2}>Hora de início</label>
              <input
                {...register("hour")}
                type="hora"
                id="dataEvento"
                className={`${styles.input2} ${errors.hour ? styles.input_error : styles.input_ok}`}
                name="hour"
              />
              {/* Hora do evento */}

              <label htmlFor="date" className={styles.nomeEvento2}>Data de término</label>
              <input
                {...register("date")}
                className={`${styles.input2} ${errors.date ? styles.input_error : styles.input_ok}`}
                type="date"
                id="dataEvento"
                name="date"
              />

              <label htmlFor="hour" className={styles.nomeEvento2}>Hora de término</label>
              <input
                {...register("hour")}
                className={`${styles.input2} ${errors.hour ? styles.input_error : styles.input_ok}`}
                type="hora"
                id="horaEvento"
                name="hour"
              />
            </div>
            <p className={styles.paragrafo}>Seu evento vai durar x tempo</p>
          </div>
        </section>



        <section className={styles.container}>
          <div className={styles.infLocal}>
            <Title
              class={styles.informacoes}
              title="3. DESCRIÇÃO"
              fontFamily="var(--font-poppins)"
              fontWeight={700}
            />
            <p className={styles.paragrafo}>CONTE TODOS OS DETALHES DO SEU EVENTO, COM A PROGRAMAÇÃO E OS DIFERENCIAIS DA SUA PRODUÇÃO!.</p>
            <textarea
              {...register("eventDescription")}
              className={`${styles.input3} ${errors.eventDescription ? styles.input_error : styles.input_ok}`}
              placeholder="Adicione aqui sua Descrição do evento..."
              maxLength={2000}
              name="description"
            />
            <p className={styles.paragrafo}>Até 2.000 caracteres.</p>
          </div>
        </section>



        <section className={styles.container}>
          <div className={styles.infLocal}>
            <Title
              class={styles.informacoes}
              title="4. ONDE VAI ACONTECER?"
              fontFamily="var(--font-poppins)"
              fontWeight={700}
            />
            <label className={styles.checkbox}>
              <input
                {...register("localDefined")}
                className={`${styles.checkbox}`}
                type="checkbox"
                name="localDefined"
              />
              Local ainda será definido
            </label>

            <Input
              {...register("local")}
              placeholder="Nome do espaço"
              className={`${styles.input} ${errors.local ? styles.input_error : styles.input_ok}`}
              name="local"
            />
            <div className={styles.row}>
              <Input
                {...register("cep")}
                placeholder="CEP"
                className={`${styles.input} ${errors.cep ? styles.input_error : styles.input_ok}`}
                maxLength={8}
                name="cep"
              />
              <Input
                {...register("number")}
                placeholder="Nº"
                className={`${styles.input} ${errors.number ? styles.input_error : styles.input_ok}`}
                name="number"
              />
            </div>

            <p className={styles.paragrafo}>Complemento</p>

            <Input
              {...register("complement")}
              placeholder="Complemento"
              className={`${styles.input} ${errors.complement ? styles.input_error : styles.input_ok}`}
              name="complement"
            />
            <label className={styles.checkbox}>
              <input
                {...register("showMap")}
                type="checkbox"
                name="showMap"
              />
              Mostrar o endereço no Google Maps
            </label>
          </div>
        </section>



        <section className={styles.container}>
          <div className={styles.infLocal}>
            <Title
              class={styles.informacoes}
              title="5. INGRESSO"
              fontFamily="var(--font-poppins)"
              fontWeight={700}
            />
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  {...register("ticketType")}
                  type="checkbox"
                  className={`${styles.checkbox}`}
                  value="pago"
                  name="ticketType"
                />
                Ingresso pago
              </label>
              <label className={styles.radioOption}>
                <input
                  {...register("ticketType")}
                  type="checkbox"
                  className={`${styles.checkbox}`}
                  value="gratis"
                  name="ticketType"
                />
                Ingresso grátis
              </label>
            </div>

            <label>Valor</label>
            <Input
              {...register("ticketValue")}
              placeholder="R$ 0,00"
              className={`${styles.input} ${errors.ticketValue ? styles.input_error : styles.input_ok}`}
              name="ticketValue"
            />

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Início das vendas</label>
                <input
                  {...register("startSold")}
                  type="date"
                  className={`${styles.input} ${errors.date ? styles.input_error : styles.input_ok}`}
                  name="date"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Término das vendas</label>
                <input
                  {...register("endSold")}
                  type="date"
                  className={`${styles.input} ${errors.date ? styles.input_error : styles.input_ok}`}
                  name="date"
                />
              </div>
            </div>

            <label>Quantidade permitida por compra</label>
            <Input
              {...register("quantityForBuy")}
              type="number"
              placeholder="1"
              className={`${styles.input} ${errors.quantityForBuy ? styles.input_error : styles.input_ok}`}
              name="quantityForBuy"
            />

            <label className={styles.checkbox}>
              <input
                {...register("absolveTax")}
                type="checkbox"
                className={`${styles.checkbox}`}
                name="absolveTax"
              />
              Absorver taxa de serviço
            </label>

            <p className={styles.limiteCaracteres}>Descrição (opcional)</p>

            <textarea
              {...register("ticketDescription")}
              placeholder="Caso o ingresso dê direito a brindes ou tenha exceções."
              className={`${styles.input} ${errors.ticketDescription ? styles.input_error : styles.input_ok}`}
              name="ticketDescription"
            />

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Nome do Cupom</label>
                <Input
                  {...register("ticketNameHalfPrice")}
                  placeholder="Nome"
                  className={`${styles.input} ${errors.ticketNameHalfPrice ? styles.input_error : styles.input_ok}`}
                  name="ticketNameHalfPrice"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Valor do Cupom</label>
                <Input
                  {...register("ticketHalfPrice")}
                  placeholder="R$ 0,00"
                  className={`${styles.input} ${errors.ticketHalfPrice ? styles.input_error : styles.input_ok}`}
                  name="ticketHalfPrice"
                />
              </div>
            </div>
          </div>
        </section>



        <section className={styles.container}>
          <div className={styles.infLocal}>
            <Title
              class={styles.informacoes}
              title="6. RESPONSABILIDADES"
              fontFamily="var(--font-poppins)"
              fontWeight={700}
            />
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  {...register("typeEvent")}
                  type="checkbox"
                  className={`${styles.checkbox}`}
                  value="publico"
                  name="typeEvent"
                />
                Evento Público
              </label>
              <label className={styles.radioOption}>
                <input
                  {...register("typeEvent")}
                  type="checkbox"
                  className={`${styles.checkbox}`}
                  value="privado"
                  name="typeEvent"
                />
                Evento Privado
              </label>
            </div>

            <p className={styles.textoInfo}>
              ℹ  Ao publicar este evento, estou de acordo com os Termos de uso, com as Diretrizes de Comunidade e com as Regras de meia-entrada, bem como declaro estar ciente da Política de Privacidade e das Obrigatoriedades Legais.
            </p>

            <label className={styles.checkbox}>
              <input
                {...register("terms")}
                type="checkbox"
                className={`${styles.checkbox}`}
                name="terms"
              />
              Aceitar termos
            </label>
          </div>
        </section>
      </form >
  );
}