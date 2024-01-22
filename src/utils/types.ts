export interface Tariff {
    id: number,
    name: string,
    status: number,
    description: string,
    ram: number,
    ssd: number,
    price: number,
    image: string
}

export interface Option {
    id: number,
    name: string
}

// export interface User {
//     id: number,
//     name: string,
//     email: string
// }

// export interface Order {
//     id: number,
//     status: number,
//     owner: User,
//     moderator: User,
//     date_created: string,
//     date_formation: string,
//     date_complete: string,
// }