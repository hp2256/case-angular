import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllReports } from '../models/allreports';
import { Report } from '../models/report';
import { AllDepartment } from '../models/alldepartments';
import { Department } from '../models/department';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private _url:string="http://localhost:8100/case-owner/api/";
// private _url:string="http://localhost:8084/"
  constructor(private _httpClient:HttpClient) { }

  getReports():Observable<AllReports>{
    return this._httpClient.get<AllReports>(this._url+"allreports")
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      return throwError(error);
    }));
  }
  getReport():Observable<Report>{
    return this._httpClient.get<Report>(this._url+"viewreport")
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      return throwError(error);
    }));
  }

  deleteReport(report:Report):Observable<Report>{
  //  return this._httpClient.delete<Report>(this._url+"deletereport",report);
    return this._httpClient.post<Report>(this._url+"deletereport",report);
  
  }
  getDepartments():Observable<AllDepartment>{
    return this._httpClient.get<AllDepartment>(this._url+"alldepartment")
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      return throwError(error);
    }));
  }

  getDepartmentById(id:string):Observable<Department>{
    return this._httpClient.get<Department>(this._url+"department/"+id)
    .pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error);
      return throwError(error);
    }));  }
  addDepartment(department:Department):Observable<Department>{
    return this._httpClient.post<Department>(this._url+"adddepartment",department);
  }
  
  updateDepartment(department:Department):Observable<Department>{
    return this._httpClient.put<Department>(this._url+"updatedepartment",department);
  }
}
