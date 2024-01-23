export interface Tariff {
    id: number,
    name: string,
    description: string,
    status: number,
    image: string
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Order {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    name: string,
    description: string,
    clinical_trial: number
}

export interface Option {
    id: number,
    name: string
}