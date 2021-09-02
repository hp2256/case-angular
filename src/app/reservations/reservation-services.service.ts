import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllBills } from '../models/allbills';
import { Bill } from '../models/bill';
import { Payment } from '../models/payment';
import { AllRooms } from '../rooms-mgmt/all-rooms';
import { AllReservation } from './all-reservations';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationServicesService {

  //private _url:string="http://localhost:8100/case-reservation/";
  private _url:string="http://localhost:8086/";

  constructor(private httpClient:HttpClient) { }

  searchRooms(checkIn:string,checkOut:string):Observable<AllRooms>{
    return this.httpClient.get<AllRooms>(this._url+"search/"+checkIn+"/"+checkOut)
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      
      return throwError(error);
    }));
  }

  makeReservation(reservation:Reservation){
    return this.httpClient.post<Reservation>(this._url+"addreservation",reservation)
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      
      return throwError(error);
    }));

  }
  allReservations():Observable<AllReservation>{
    return this.httpClient.get<AllReservation>(this._url+"allreservations")
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      
      return throwError(error);
    }));
  }

  issueBill(reservation:Reservation):Observable<Bill>{
    return this.httpClient.post<Bill>(this._url+"issuebill",reservation)
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      
      return throwError(error);
    }));
  }
  
  getBill(id:string):Observable<Bill>{
    return this.httpClient.get<Bill>(this._url+"getbill/"+id)
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      
      return throwError(error);
    }));
  }
  
  getBills():Observable<AllBills>{
    return this.httpClient.get<AllBills>(this._url+"getbills")
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      
      return throwError(error);
    }));
  }

  addPayment(payment:Payment):Observable<Payment>{
    return this.httpClient.post<Payment>(this._url+"addpayment",payment)
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      
      return throwError(error);
    }));
  }
}
