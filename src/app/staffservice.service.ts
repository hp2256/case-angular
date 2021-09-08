import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Staff } from './staff';
import {catchError,retry} from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';
import { StaffList } from './staff-list';

@Injectable({
  providedIn: 'root'
})
export class StaffserviceService {

 // private _url:string="http://localhost:8082/";
  private _url:string="http://localhost:8100/case-staff/";

  constructor(private _httpClient:HttpClient) { }

  private headers1 = new HttpHeaders().set('Content-Type', 'application/json');

  getStaff():Observable<StaffList>{
    return this._httpClient.get<StaffList>(this._url+"allstaff")
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      return throwError(error.message);
    }));
  }




  getStaffById(id:string):Observable<Staff>{
    console.log(this._url+"staff/"+id);
    
    return this._httpClient.get<Staff>(this._url+"staff/"+id)
    .pipe(catchError((error:HttpErrorResponse)=>{
      return throwError(error.message);
    }));
  }
  updateStaff(staff:Staff){
    return this._httpClient.put<Staff>(this._url+"updatestaff",staff)
    .pipe(catchError((error:HttpErrorResponse)=>{
      return throwError(error.message);
    }));
    ;
  };

  addStaff(staff:Staff){
    return this._httpClient.post<Staff>(this._url+"addstaff",staff)
    .pipe(catchError((error:HttpErrorResponse)=>{
      return throwError(error.message);
    }));
    ;
  }

}
