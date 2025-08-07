import { createClient } from "@/prismicio";
import { NextApiRequest, NextApiResponse } from "next";

export default async function prismic(req: NextApiRequest, res: NextApiResponse) {

    try {
        const client = createClient();

        const request = (await (client.getSingle('home'))).data

        console.log(request)

        return res.status(200).json(request)
        
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }


}