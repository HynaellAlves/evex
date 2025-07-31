import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from 'next/headers';

const BASE_URL = process.env.BASE_URL_API as string;

export default async function login(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const eventData = req.body

        const token = req.headers.authorization;
        const date = new Date(eventData.startDateEvent).toISOString();

        try {

            const request = await axios.post(`${BASE_URL}events`,

                {
                    name: eventData.eventName,
                    date: date,
                    addressCity: "",
                    addressDistrict: "",
                    addressStreet: "",
                    addressNumber: parseInt(eventData.eventNumber),
                    description: eventData.eventDescription,
                    attractions: [],
                    category: eventData.category,
                    coverImageUrl: eventData.img,
                    ticketsBatches: [{
                        type: 1,
                        totalQty: 0,
                        price: 500
                    }]
                }
                ,
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json"
                    }
                },
            )

            return res.status(request.status).json(request.data);

        }
        catch (error: any) {

            if (error.response) {

                const status = error.response.status
                const data = error.response.data

                console.log(`Erro na requisição da API externa de eventos: Código: ${status} ${JSON.stringify(data)}`);

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