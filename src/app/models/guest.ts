import { Address } from "../address";

export interface Guest{
    id:string,
    memberCode:number,
    phoneNumber:number,
    company:string,
    name:string,
    email:string,
    gender:string,
    address:{
        street:String,
        zipCode:number,
        city:String,
        country:String
    }
}