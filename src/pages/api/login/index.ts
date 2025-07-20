import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.BASE_URL_API;

export default async function Login(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        if (BASE_URL) {

            const request = req.body;

            try {

                const response = await axios.post(`${BASE_URL}/auth/login`, request);
                console.log(response.data)
                return response.data
            }
            catch (err: any) {
                console.log("Erro aqui: ", err.response.data)
            }

        } else {
            return res.status(500).json;
        }
    } else {
        return res.status(405).json({ error: 'Método não permitido' })
     }
} 