import { Guest } from "../models/guest";

export interface Reservation{
    id:string,
    numberOfChildren:number,
    numberOfAdults:number,
    checkInDate:Date,
    checkOutDate:Date,
    status:boolean,
    numberOfNights:number,
    roomId:string,
    roomNo:number,
    billId:string,
    price:number,
    guests:Array<Guest>
}