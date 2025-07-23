import { DateTime } from "next-auth/providers/kakao"

export type user = {
    name?: string,
    email: string,
    password: string,
    auth: number
}

export type eventsObj = {
    name: string,
    capacity: number,
    date?: Date,
    url?: string
}