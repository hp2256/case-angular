import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/models/bill';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Reservation } from '../reservation';
import { ReservationServicesService } from '../reservation-services.service';

@Component({
  selector: 'app-reservation-billing',
  templateUrl: './reservation-billing.component.html',
  styleUrls: ['./reservation-billing.component.css']
})
export class ReservationBillingComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private _reservationService:ReservationServicesService,
    private fb:FormBuilder,
    private token:TokenStorageService,
    
  ) { }

  reservationsDataSource=new MatTableDataSource();
  //displayedColumns:string[]=['roomno','numberOfChildren','numberOfAdults','checkInDate','checkOutDate','numberOfNights','guests','price','pay'];
  displayedColumns:string[]=['roomNo','numberOfChildren','numberOfAdults','checkInDate','checkOutDate','numberOfNights','guests','price','pay'];
 
  isLoggedIn=false;
  allowed=false;

  roomnumber="";
  ngOnInit(): void {

    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn){
      //const user = this.token.getUser();
      this._reservationService.allReservations()
      .subscribe(
        data=>{
          console.log(data);
          
          this.reservationsDataSource.data=data.reservations;
          
        },
        error=>{}
      )
      
    }

  }
  bill!:Bill;
  payBill(reservation:Reservation){
    this._reservationService.issueBill(reservation)
    .subscribe(
      data=>{
        this.bill=data;
        this.router.navigate([this.bill.id],{relativeTo:this.route});
        
      },
      error=>{}
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reservationsDataSource.filter = filterValue.trim().toLowerCase();
  }
update(reservation:Reservation){
  
}
}
