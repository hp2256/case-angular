import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Rooms } from './Rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsServiceService {

  private _url:string="http://localhost:8083/"
  constructor(private _httpClient:HttpClient) { }
  private headers1 = new HttpHeaders().set('Content-Type', 'application/json');

  getRooms():Observable<Rooms[]>{
    return this._httpClient.get<Rooms[]>(this._url+"allrooms")
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      
      return throwError(error);
    }));
  }
  getRoomById(id:string):Observable<Rooms>{
    console.log(this._url+"rooms/"+id);
    
    return this._httpClient.get<Rooms>(this._url+"rooms/"+id)
    .pipe(catchError((error:HttpErrorResponse)=>{
      return throwError(error);
    }));
  }
  updateRoom(staff:Rooms){
    return this._httpClient.put<Rooms>(this._url+"udpateroom",staff);
  };

  addRoom(staff:Rooms){
    return this._httpClient.post<Rooms>(this._url+"addroom",staff,{headers:this.headers1});
  }}
