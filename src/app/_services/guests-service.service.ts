import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllGuest } from '../models/allguests';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestsServiceService {
  private _url:string="http://localhost:8100/case-guests/";
//private _url:string="http://localhost:8081/"
 //@CrossOrigin(origins = "*", allowedHeaders = "*")


  constructor(private _httpClient:HttpClient) { }

  private headers1 = new HttpHeaders().set('Content-Type', 'application/json');

  getGuests():Observable<AllGuest>{
    return this._httpClient.get<AllGuest>(this._url+"allguests")
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      return throwError(error);
    }));
  }




  getGuestById(id:string):Observable<Guest>{
    console.log(this._url+"guest/"+id);
    
    return this._httpClient.get<Guest>(this._url+"guest/"+id)
    .pipe(catchError((error:HttpErrorResponse)=>{
      return throwError(error);
    }));
  }
  updateGuest(guest:Guest){
    return this._httpClient.put<Guest>(this._url+"updateguest",guest);
  };

  addGuest(guest:Guest){
    return this._httpClient.post<Guest>(this._url+"addguest",guest);
  }

}
