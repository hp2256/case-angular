import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css']
})
export class MakeReservationComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private _reservationService:ReservationServicesService,
    private fb:FormBuilder,
    private token:TokenStorageService,
    private _guestService:GuestsServiceService,
    private snackBar:MatSnackBar
  ) { }
  dataSource=new MatTableDataSource();
  displayedColumns:string[]=['memberCode','phoneNumber','company','name','email','gender','address','addG']
  reservedRoomId:string="";
  reservedCheckIn:string="";
  reservedCheckOut:string="";
  
  guestsErrorMsg:string=""; 
  guestsArray:Array<Guest>=[];
  errorMsg:string="";
  isLoggedIn=false;
  addReservationForm!:FormGroup;
  reservation!:Reservation;
  ngOnInit(): void {
    this.isLoggedIn=!!this.token.getToken();
    //check if logged in else error
    if(this.isLoggedIn){
      this.route.paramMap.subscribe((params:ParamMap)=>{
        let id=params.get('id')||"";
        this.reservedRoomId=id;
        let checkIn= params.get('checkin')||"";
        this.reservedCheckIn=checkIn;
        let checkOut= params.get('checkout')||"";
        this.reservedCheckOut=checkOut;
      })
//dont need to add priceand number of nights
      this.addReservationForm=this.fb.group({
        numberOfChildren:['',[Validators.required,Validators.min(0),Validators.max(2)]]!,
        numberOfAdults:['',[Validators.required,Validators.min(1),Validators.max(2)]]!,
        checkInDate:[this.reservedCheckIn,[Validators.required]]!,
        checkOutDate:[this.reservedCheckOut,[Validators.required]]!,
        status:['']!,
        numberOfNights:[''],
        roomId:[this.reservedRoomId],
        billId:[''],
        price:[],
        guests:[this.guestsArray]
      });

    }
    else{
      this.isLoggedIn=false;
      this.errorMsg="PLEASE LOGIN";
    }
  }
  get numberOfChildren(){
    return this.addReservationForm.get('numberOfChildren')!;
  }
  get numberOfAdults(){
    return this.addReservationForm.get('numberOfAdults')!;
  }
  get checkInDate(){
    return this.addReservationForm.get('checkInDate')!;

  }
  get checkOutDate(){
    return this.addReservationForm.get('checkOutDate')!;

  }
  get status(){
    return this.addReservationForm.get('status')!;
  }
  get guests(){
    return this.addReservationForm.get('guests')!;
  }
  setguests(setguests:Array<Guest>){
     this.addReservationForm.patchValue({guests:setguests});
  }

  addGuest(){
    this._guestService.getGuests()
    .subscribe(
      response=>{
        console.log(response.guestList);
        
        this.dataSource.data=response.guestList;
      },
      error=>{}
    )
  }
  addGuestToArray(guest:Guest){
   let guests:Array<Guest>=[];
   guests.push(guest);
    this.setguests(guests);
    alert('GUEST: '+ guest.name+ " ADDED!");
  }
  onSubmit(){
    this.reservation=this.addReservationForm.value;
    console.log(this.reservation);
    
  this._reservationService.makeReservation(this.reservation)
  .subscribe(
    response=>{
      console.log(response);
      this.router.navigate(['../../../'],{relativeTo:this.route});
    //  alert('RESERVATION SUCCESS');
    this.snackBar.open("Successfully Reserved","Dismiss",{duration:2000});

    },
    error=>{
      this.errorMsg=error;
      console.log(error);
      
    }
  );
  }
  onCancel(){
    this.router.navigate(['../../../'],{relativeTo:this.route});

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
