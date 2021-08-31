import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllRooms } from '../rooms-mgmt/all-rooms';

@Injectable({
  providedIn: 'root'
})
export class ReservationServicesService {

  private _url:string="http://localhost:8086/";

  constructor(private httpClient:HttpClient) { }

  searchRooms(checkIn:string,checkOut:string):Observable<AllRooms>{
    return this.httpClient.get<AllRooms>(this._url+"search/"+checkIn+"/"+checkOut)
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      
      return throwError(error);
    }));
  }}
