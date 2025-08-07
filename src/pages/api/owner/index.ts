import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.BASE_URL_API as string;

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const userData = req.body;

    const response = await axios.post(`${BASE_URL}users`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
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