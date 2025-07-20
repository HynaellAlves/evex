import axios from 'axios';
import dotenv from 'dotenv'
import { NextApiRequest, NextApiResponse } from 'next';

dotenv.config();

const BASE_URL = process.env.BASE_URL_API;

export default async function Recovery(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        if (BASE_URL) {

            const request = req.body;

            try {

                const response = await axios.post(`${BASE_URL}/users/user`, request);
                console.log(res.json)
                return res.json
            }
            catch (err: any) {
                console.log("Erro aqui: ", err.response.data)
            }
        }
    } else {
        return res.status(405).json({ error: 'Método não permitido' })
    }
}