import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = process.env.BASE_URL_API as string;

export default async function edit_owner(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "PUT") {

        const user = req.body
        const token = req.headers.authorization;

        try {

            const request = await axios.put(`${BASE_URL}event-owners/me`, user,
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.status(request.status).json(request.data);

        } catch (error: any) {
            if (error.response) {

                const status = error.response.status
                const data = error.response.data

                console.log(`Erro na requisição da API externa de edição de Owner: Código: ${status} ${JSON.stringify(data)}`);

                return res.status(status).json(data);

            } else {

                const status = error ? error.status : 0;

                console.error("Erro inesperado na requisição:", error);

                return res.status(status).json({ message: 'Erro interno no servidor' });
            }
        }

    } else {
        return res.status(405).json('Método não permitido');
    }

} 
