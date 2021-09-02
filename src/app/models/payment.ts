import { Time } from "@angular/common";

export interface Payment{
    id:string,
    total:number,
    billId:string,
    payTime:Date,
    cardNumber:string
}