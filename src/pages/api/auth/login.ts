import axios from 'axios';
import { user } from '@/propierts/types';

const BASE_URL = process.env.BASE_URL_API;

export async function authLogin(user: user) {

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