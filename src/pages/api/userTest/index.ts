import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.BASE_URL_API;

export default async function UserTest(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {

        if (BASE_URL) {

            try {

                const response = await axios.get(`${BASE_URL}/users/user`);
                console.log(response.data)
                return response.data
            }
            catch (err: any) {
                console.log("Erro aqui: ", err.response)
            }

        } else {
            return res.status(500).json;
        }
    } else {
        return res.status(405).json({ error: 'Método não permitido' })
     }
} 