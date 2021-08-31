import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllRooms } from './all-rooms';
import { Rooms } from './rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsServiceService {

  private _url:string="http://localhost:8083/"
  constructor(private _httpClient:HttpClient) { }
  private headers1 = new HttpHeaders().set('Content-Type', 'application/json');

  getRooms():Observable<AllRooms>{
    return this._httpClient.get<AllRooms>(this._url+"allrooms")
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
  updateRoom(room:Rooms){
    return this._httpClient.put<Rooms>(this._url+"updateroom",room);
  };

  addRoom(room:Rooms){
    return this._httpClient.post<Rooms>(this._url+"addroom",room,{headers:this.headers1});
  }}
