import { eventRegister, user } from "../propierts/types"
import { useRouter } from "next/router"

export async function login(user: user) {

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
                    } else if (response.status === 404) {
                        return {
                            status: response.status,
                            data: "Usuário não cadastrado"
                        }
                    } else if (response.status === 404) {
                        return {
                            status: response.status,
                            data: "Usuário não cadastrado"
                        }
                    }
                } else {

                    const { token, id, email, permissions, eventOwner, events }: user = await response.json();

                    return {
                        token,
                        id,
                        email,
                        permissions,
                        ...eventOwner,
                        events
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

export async function recovery({ token, password, email }: user) {

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
                } else {
                    localStorage.clear();
                    sessionStorage.clear();
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

export async function redirect(permissions: number[], router: ReturnType<typeof useRouter>) {

    if (permissions) {
        if (permissions.length > 0) {
            // Aqui vai a página de admin
            router.push("/home/admin");
        } else if (permissions.length <= 0) {
            router.push("/home/owner");
            if (permissions) {
                if (permissions.length > 0) {
                    // Aqui vai a página de admin
                    router.push("/home/admin");
                } else if (permissions.length <= 0) {
                    router.push("/home/owner");
                }
            } else {
                router.push("/login");
                console.log(permissions)
            }

        }
    }
}

export async function reset() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    location.reload();
}

export async function registerEvent(eventData: eventRegister, token: string) {

    if (!token) {
        alert("Token não existe no request")
        return
    }

    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        });

        if (!response.ok) {

            console.log(`Erro de requisição da URL API, ${JSON.stringify(response.status)}`)

            if (response.status === 400) {
                return {
                    status: response.status,
                    data: "Dados inválidos"
                }
            } else if (response.status === 404) {
                return {
                    status: response.status,
                    data: "Usuário Event Owner não encontrado"
                }
            }

            return {
                status: response.status,
                data: "Erro ao registrar evento"
            }

        }

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (err: any) {
        console.log(`Erro de função interna ${err}`)
        return {
            status: 500,
            data: "Erro interno do servidor"
        }
    }
}