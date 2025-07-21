import { user } from "@/propierts/types"

export async function postLogin(user: user) {

    
    try {
        if (user.email && user.password) {

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(user)
                });

                if (!response.ok) {
                    console.log(`Erro de requisição da URL API, ${JSON.stringify(response.status)}`)

                    if (response.status === 401) {
                        return {
                            status: response.status,
                            data: "Invalid Credentials"
                        }
                    } else if (response.status === 500) {
                        return {
                            status: response.status,
                            data: "Internal server error"
                        }
                    }
                } else {
                    return {
                        data: await response.json()
                    }
                }

            } catch (err: any) {
                console.log(err.message)
            }

        } else {
            return 0
        }
    } catch (err: any) {
        console.log(` Erro de função interna ${err}`)
    }
}

export async function postRecovery(user: user) {

    try {
        if (user.email) {

            try {
                const response = await fetch('/api/recovery', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(user)
                });

                if (!response.ok) {
                    console.log(`Erro de requisição da URL API, ${JSON.stringify(response.status)}`)
                }

                return {
                    status: response.status,
                    data: await response.json()
                }

            } catch (err: any) {
                console.log(err.message)
            }

        } else {
            return 0
        }
    } catch (err: any) {
        console.log(` Erro de função interna ${err}`)
    }
}