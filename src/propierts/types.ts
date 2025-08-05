
export type user = {
    id?: string,
    token?: string,
    name?: string,
    age?: number,
    email?: string,
    bio?: string,
    photoUrl?: string,
    password?: string,
    permissions?: number[],
    eventOwner?: any,
    events?: any
}

// export type eventsObj = {
//     id?: string,
//     name?: string,
//     category?: string,
//     capacity?: number,
//     endDateEvent?: Date,
//     coverImageUrl?: string
// }

export type eventRegister = {
    id?: string;
    eventName?: string;
    img?: string;
    category: string;
    startDateEvent?: string;
    endDateEvent?: string;
    startHourEvent?: string;
    endHourEvent?: string;
    eventDescription?: string;
    local?: string;
    showMap?: boolean;
    eventCep?: string;
    eventNumber?: number;
    eventComplement?: string;
    completeAdress?: string;
    eventAttractions: string;
    ticketsBatches: [];
}

export type eventsObj = {

    addressCep?: string,
    addressComplement?: string,
    addressNumber?: number,
    attractions: Array<string>,
    category: string,
    coverImageUrl?: string,
    description?: string,
    endDateEvent: string,
    id: string,
    imagesUrls?: Array<string>,
    local?: string,
    name: string,
    showMap?: boolean,
    slug?: string,
    startDateEvent: string,
    ticketsBatches: Array<{ id: string, type: number, description?: string, price: number, remainingQty: number, totalQty: number }>
}