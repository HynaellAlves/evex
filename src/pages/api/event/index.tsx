import { eventRegister } from '@/propierts/types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";
import { number } from 'zod';

const BASE_URL = process.env.BASE_URL_API as string;

export default async function event(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const eventData: eventRegister = req.body

        const token = req.headers.authorization;
        const Startdate = new Date(eventData.startDateEvent ? eventData.startDateEvent : NaN).toISOString();
        const Enddate = new Date(eventData.endDateEvent ? eventData.endDateEvent : NaN).toISOString();


        try {

            const request = await axios.post(`${BASE_URL}events`,

                {
                    addressCep: eventData.eventCep,
                    addressComplement: eventData.eventComplement,
                    addressNumber: eventData.eventNumber,
                    attractions: [""],
                    category: eventData.category,
                    coverImageUrl: eventData.img,
                    description: eventData.eventDescription,
                    endDateEvent: Enddate,
                    local: eventData.local,
                    name: eventData.eventName,
                    showMap: eventData.showMap,
                    startDateEvent: Startdate,
                    ticketsBatches: [{ type: 1, description: eventData.ticketDescription, price: eventData.ticketValue, remainingQty: eventData.quantity, totalQty: eventData.quantity }]
                },
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json"
                    }
                }
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