/* 
Essa aqui é a rota do servidor que faz o login
1 - Primeiro ela executa a função de autenticação que retorna um objeto com token
2 - Depois ela recebendo esse token passa ele como corpo da requsição para outra rota que busca o user
*/

// Importando o Axios para realizar as requisições
import axios from 'axios';
import { user } from '@/propierts/types';

// Importando função reutilizável de autenticação
import { authLogin } from '../auth/login';

// Importando os types do Next para requisição e resposta
import { NextApiRequest, NextApiResponse } from 'next';

// Url base da API externa (no final um "as string" para garantir o retorno string se não é um possível undefined e o TS acusa)
const BASE_URL = process.env.BASE_URL_API as string;

export default async function login(req: NextApiRequest, res: NextApiResponse) {

    // Verifica se o método da requisição é POST, se não retorna um erro
    if (req.method === 'POST') {

        try {

            /* 
            Primeiro tenta executar a função de autenticação e extrai do retorno o status e corpo com o token
            Note que não executei ela como requisição HTTP pois está no servidor na mesma pasta de API
            Seria uma requisição via web desnecessária e poderia demorar mais 
            */

            const user: user = req.body;

            const { body, status } = await authLogin(user);


            // Aqui verifica se o retorno da autenticação foi sucesso ou erro e retorna
            if (status !== 200) {

                return res.status(status).json(body);

                // Se não retornou erro executa a próxima requisição para o endpoin que retorna os dados do usuário
            } else {

                /* 
                Aqui extrai do corpo o token e o email e envia a requisição para o endpoint de login
                Lembrar de incluir uma forma de guardar o email via cookies ou cache no navegador do usuário 
                assim facilita a autenticação quando expirar o token e retorna a página de login já com o email
                */

                const { token } = body;

                const request = await axios.get(`${BASE_URL}users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                return res.status(request.status).json({ ...request.data });
            }


            // Tratando o erro das requisições
        } catch (error: any) {

            if (error.request) {

                const status = error.response.status;
                const data = error.response.data

                console.log(`Erro na requisição da API externa de login: Código: ${status} - ${JSON.stringify(data)}`);

                return {
                    status: status,
                    body: data.message ? data.message : data
                }

            } else {

                const status = error ? error.status : 0;

                console.error("Erro inesperado na requisição:", error);

                return {
                    status: status,
                    body: { message: 'Erro interno no servidor' }
                }
            }
        }

        // Tratando erro do método
    } else {
        return res.status(405).json('Método não permitido');
    }
} 