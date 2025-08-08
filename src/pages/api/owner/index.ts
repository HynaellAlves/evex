import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.BASE_URL_API as string;

function calcularIdade(dataNascimento: string): number {
  const [dia, mes, ano] = dataNascimento.split("/").map(Number);
  const hoje = new Date();
  let idade = hoje.getFullYear() - ano;
  const mesAtual = hoje.getMonth() + 1; // mês começa em 0
  const diaAtual = hoje.getDate();

  if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
    idade--;
  }
  return idade;
}

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const userData = req.body;
    const token = req.headers.authorization;

     const idade = userData.date ? calcularIdade(userData.date) : 18;

    const response = await axios.post(`${BASE_URL}event-owners`, {
                    email: userData.email,
                    password: userData.userCreatesPassword? undefined: userData.password,
                    permisions: userData.eventNumber,
                    defaultPassword: userData.defaultPassword,
                    name: userData.name,
                    bio: "",
                    age: idade,
                    photoUrl: userData.profilephoto,
    }, {
      headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json"
      }
  });

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      console.error(`Erro ao cadastrar usuário: ${status} - ${JSON.stringify(data)}`);
      return res.status(status).json(data);
    }

    console.error("Erro inesperado:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
}