export interface Bill{
    id:string,
    numberOfNights:number,
    price:number,
    taxes:number,
    services:string,
    unit:number,
    paidStatus:boolean,
    reservationId:string
}