import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AllGuest } from 'src/app/models/allguests';
import { Guest } from 'src/app/models/guest';
import { StaffserviceService } from 'src/app/staffservice.service';
import { GuestsServiceService } from 'src/app/_services/guests-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Reservation } from '../reservation';
import { ReservationServicesService } from '../reservation-services.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private _reservationService:ReservationServicesService,
    private fb:FormBuilder,
    private token:TokenStorageService,
    private _guestService:GuestsServiceService
  ) { }
  dataSource=new MatTableDataSource();
  displayedColumns:string[]=['memberCode','phoneNumber','company','name','email','gender','address','updateGuest']
  errorMsg:string=""; 
  isLoggedIn=false;

  guestsErrorMsg="";

  ngOnInit(): void {
    this.isLoggedIn=!!this.token.getToken();
    if(this.isLoggedIn){
      this._guestService.getGuests()
    .subscribe(
      response=>{
        console.log(response.guestList);
        
        this.dataSource.data=response.guestList;
      },
      error=>{
        this.guestsErrorMsg=error;
        console.log(error);
        
      }
    )
    }
    else{
      
      this.isLoggedIn=false;
      this.errorMsg="PLEASE LOGIN";
    }
  }
 updateGuest(guest:Guest){
  this.router.navigate([guest.id],{relativeTo:this.route});
  console.log(guest);
 }
 addGuest(){
  this.router.navigate(['add'],{relativeTo:this.route});
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
