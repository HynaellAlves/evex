import axios from 'axios';
import { user } from '@/propierts/types';

const BASE_URL = process.env.BASE_URL_API;

export async function auth(user: user) {

        if (BASE_URL) {

            const { email, password } = user;

            try {

                const response = await axios.post(`${BASE_URL}auth/login`, { email, password });
                
                return {
                    status: response.status,
                    body: {
                    email,
                    password,
                    ...response.data
                    }
                }

            } catch (error: any) {

                if (error.response) {

                    const status = error.response.status;
                    const data = error.response.data

                    console.log(`Erro na requisição da API externa de autenticação: Código: ${status} - ${JSON.stringify(data)}`);

                    return {
                        status: status,
                        body: data.message ? data.message : data
                    }

                } else {

                    const status = error.response.status;

                    console.error("Erro inesperado na requisição:", error);

                    return {
                        status: status,
                        body: { message: 'Erro interno no servidor' }
                    }
                }
            }

        } else {

            return {
                status: 500,
                body: 'BASE_URL não definida'
            }
        }
}

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {

//     if (req.method === 'POST') {

//         if (BASE_URL) {

//             const { email, password } = req.body;

//             try {

//                 const response = await axios.post(`${BASE_URL}auth/login`, { email, password });
//                 return res.status(response.status).json(response.data)

//             } catch (err: any) {

                
//                 if (err.response) {
//                     const status = err.response.status;
//                     const data = err.response.data

//                     console.log(`Erro na requisição da API externa: Código: ${status} - ${data}`);

//                     return res.status(status).json(data.message ? data.message : data);

//                 } else {

//                     console.error("Erro inesperado na requisição:", err);

//                     return res.status(500).json({ message: 'Erro interno no servidor' });
//                 }
//             }

//         } else {
//             return res.status(500).json('BASE_URL não definida')
//         }
//     } else {
//         return res.status(405).json('Método não permitido')
//     }
// }


