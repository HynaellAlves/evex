import { DateTime } from "next-auth/providers/kakao"

export type user = {
    id?: string,
    token?: string,
    name?: string,
    email?: string,
    bio?: string,
    password?: string,
    permissions?: number[],
    eventOwner?: any,
    events?: any
}

export type eventsObj = {
    name: string,
    capacity: number,
    date?: Date,
    coverImageUrl?: string
}

export type eventRegister = {
    ticketType: "pago" | "gratis";
    typeEvent: "publico" | "privado";
    terms: boolean;
    ticketValue: string;
    eventName?: string;
    img?: string;
    category?: string;
    startDateEvent?: string;
    endDateEvent?: string;
    startHourEvent?: string;
    endHourEvent?: string;
    eventDescription?: string;
    localDefined?: boolean;
    local?: string;
    showMap?: boolean;
    eventCep?: string;
    eventNumber?: string;
    eventComplement?: string;
    startSold?: string;
    endSold?: string;
    quantityForBuy?: string;
    absolveTax?: boolean;
    ticketDescription?: string;
    ticketNameHalfPrice?: string;
    ticketHalfPrice?: string;
}