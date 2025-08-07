import { eventRegister, user } from "../propierts/types"
import { useRouter } from "next/router"

const BASE_URL = process.env.NEXT_PUBLIC_URL_CEP as string;

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
                return {
                    status: 500,
                    data: "Error inesperado"
                };
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
                return {
                    status: 500,
                    data: "Error inesperado"
                };
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
                return {
                    status: 500,
                    data: "Error inesperado"
                };
            }

        } else {
            return 0
        }
    } catch (err: any) {
        return {
            status: 500,
            data: "Error inesperado"
        };
    }
}

export async function redirect(permissions: number[], router: ReturnType<typeof useRouter>) {

    if (permissions) {
        if (permissions.length > 0) {
            // Aqui vai a página de admin
            router.push("/register/owner");
        } else if (permissions.length <= 0) {
            router.push("/home/owner");
        } else {
            router.push("/login");
        }

    }
}

export async function reset() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
}

export async function registerEvent(eventData: eventRegister, token: string, user: any) {

    if (!token) {
        alert("Usuário não logado ou fora da base de dados")
        return
    }

    try {
        const response = await fetch('/api/event', {
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
            } else if (response.status === 409) {
                return {
                    status: response.status,
                    data: "Somente Eventos Futuros"
                }
            }
            return {
                status: response.status,
                data: "Erro ao registrar evento"
            }
        }

        const request_events = await searchEventsOwner(user);

        return {
            status: request_events?.status,
            data: request_events?.data
        }

    } catch (err: any) {
        console.log(`Erro de função interna ${err}`)
        return {
            status: 500,
            data: "Erro interno do servidor"
        }
    }
}

export async function editEvent(eventData: eventRegister, token: string, user: any) {
    try {
        const response = await fetch('/api/edit/event', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
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

        const request_events = await searchEventsOwner(user);

        return {
            status: request_events?.status,
            data: request_events?.data
        }

    } catch (err: any) {
        console.log(`Erro de função interna ${err}`)
        return {
            status: 500,
            data: "Erro interno do servidor"
        }
    }
}

export async function editOwner({ bio, name, photoUrl, age, token }: user) {

    try {

        const response = await fetch('/api/edit/owner', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                token,
                bio,
                name,
                photoUrl,
                age
            })
        });

        if (!response.ok) {

            console.log(`Erro de requisição da URL API, ${JSON.stringify(response.status)}`)

            if (response.status === 400) {
                return {
                    status: response.status,
                    data: "Dados inválidos"
                }
            } else if (response.status === 401) {
                return {
                    status: response.status,
                    data: "Não autorizado"
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

    } catch (err) {
        console.log(`Erro de função interna ${err}`)
        return {
            status: 500,
            data: "Erro interno do servidor"
        }
    }
}

export async function searchCEP(CEP: string) {
    try {
        const response = await fetch(`${BASE_URL}${CEP}/json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {

            console.log(`Erro de requisição da URL API, ${JSON.stringify(response.status)}`)

            return {
                status: response.status,
                data: "Erro na busca do CEP"
            }
        }

        return {
            status: response.status,
            data: await response.json()
        }
    } catch (err) {
        console.log(`Erro de função interna ${err}`)
        return {
            status: 500,
            data: "Erro interno do servidor"
        }
    }
}

export async function searchEventsOwner(user: any) {

    if (!user.token) {
        alert("Usuário não logado ou fora da base de dados")
        return
    }

    try {
        if (user.token) {

            try {
                const response = await fetch('/api/login', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
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

                    const session = sessionStorage.getItem("user");
                    const local = localStorage.getItem("user");
                    const events = await response.json();

                    if (session) {

                        const user = JSON.parse(session)
                        user.events = events;

                        sessionStorage.setItem("user", JSON.stringify(user));

                        return {
                            status: response.status,
                            data: user
                        }

                    } else if (local) {

                        const user = JSON.parse(local)
                        user.events = events;

                        localStorage.setItem("user", JSON.stringify(user));

                        return {
                            status: response.status,
                            data: user
                        }
                    }
                }

            } catch (err: any) {
                return {
                    status: 500,
                    data: "Error inesperado"
                };
            }

        }
    } catch (err: any) {
        console.log(` Erro de função interna ${err}`)
    }
}

export async function prismic() {

    const response = await fetch("/api/prismic")

    if (response && response.status == 200) {

        const data = await response.json();

        if (data)
            return data

        else return "O data não existe"

    } else {

        console.log("Erro na requisição API, status: ", response.status)
        return response
    }
}

export async function registerUser(data: any, token: string) {

    const response = await fetch('/api/owner', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar usuário");
    }

    return {
        status: response.status,
        data: response.json()
    }
}
