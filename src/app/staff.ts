import { Address } from "./address";

export interface Staff{
    id:string,
    staffCode:number,
    empName:string,
    empAddress:{
        street:String,
        zipCode:number,
        city:String,
        country:String
    },
    empSalary:number,
    empAge:number,
    empOccupation:string,
    empEmail:string
}