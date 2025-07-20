import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.BASE_URL_API;

export default async function Login(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        if (BASE_URL) {

            const { email, password } = req.body;

            try {

                const response = await axios.post(`${BASE_URL}auth/login`, { email, password });
                return res.status(response.status).json(response.data)

            } catch (err: any) {

                
                if (err.response) {
                    const status = err.response.status;
                    const data = err.response.data

                    console.log(`Erro na requisição da API externa: Código: ${status} - ${data}`);

                    return res.status(status).json(data.message ? data.message : data);

                } else {

                    console.error("Erro inesperado na requisição:", err);

                    return res.status(500).json({ message: 'Erro interno no servidor' });
                }
            }

        } else {
            return res.status(500).json('BASE_URL não definida')
        }
    } else {
        return res.status(405).json('Método não permitido')
    }
} 