import { user } from "@/propierts/types"

export async function postLogin(user: user) {

    try {
        const Post = fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        console.log((await Post).body)
    } catch (err) {
        console.log("Erro de comunicação com a API interna", err)
    }
}

export async function postRecovery(user: user) {

    try {
        const Post = fetch('/api/recovery', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        console.log((await Post).body)
    } catch (err) {
        console.log("Erro na requeisição", err)
    }
}

// export async function getUserTeste() {

//     try {
//         const Post = fetch('/api/userTest', {
//             method: 'GET',
//         })
//     } catch (err) {
//         console.log("Erro na requeisição", err)
//     }
// }