import { DateTime } from "next-auth/providers/kakao"

export type user = {
    id?: string,
    token?: string,
    name?: string,
    email?: string,
    password?: string,
    permissions?: number[],
    eventOwner?: any
}

export type eventsObj = {
    name: string,
    capacity: number,
    date?: Date,
    url?: string
}