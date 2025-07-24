import { user } from "@/propierts/types"
import { useRouter } from "next/router";

export async function Login(user: user) {

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
                            data: "Credenciais Inválidas"
                        }
                    } else if (response.status === 500) {
                        return {
                            status: response.status,
                            data: "Erro Interno do Servidor"
                        }
                    }
                } else {

                    const { email, permissions, id, eventOwner }: user = await response.json();

                    console.log(eventOwner)

                    return {
                        id,
                        email,
                        permissions,
                        eventOwner
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

export async function Recovery({ token, password, email }: user) {

    try {
        if (email) {

            try {
                const response = await fetch('/api/recovery', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ email })
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

        } else if (token && password) {

            try {
                const response = await fetch('/api/recovery', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ token, password })
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

export async function Redirect(permissions: number[], router: ReturnType<typeof useRouter>) {

    setTimeout(() => {
        if (permissions) {

            router.push("/Login");

        } else {

            router.push("/Home/Owner");

        }

    }, 1500)
}