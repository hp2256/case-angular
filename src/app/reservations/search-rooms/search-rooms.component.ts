import { DatePipe, formatDate } from '@angular/common';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Rooms } from 'src/app/rooms-mgmt/rooms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ReservationServicesService } from '../reservation-services.service';

@Component({
  selector: 'app-search-rooms',
  templateUrl: './search-rooms.component.html',
  styleUrls: ['./search-rooms.component.css']
})
export class SearchRoomsComponent implements OnInit {
  range!:FormGroup;
  displayedColumns: string[] = ['roomNumber','type','typeId','smoke','price','reserveRoom'];

  //material table
  roomsDataSource = new MatTableDataSource();

  constructor(
    private fb:FormBuilder,
    private reservationService:ReservationServicesService,
    private route:ActivatedRoute,
    private router:Router,
    private token:TokenStorageService
    ) { }
  //allRooms: AllRooms
  errorMessage:string="";
  isLoggedIn=false;
  allowed=false;

  ngOnInit(): void {
    
    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn){
    this.range=this.fb.group({
      
      start:['',Validators.required],
      end:['',Validators.required]
    }
    );
  }
    }

    checkIn!: string;
    checkOut!: string;

  search(){
    this.checkIn=formatDate(this.range.get('start')?.value,'yyyy-MM-dd','en');
    this.checkOut=formatDate(this.range.get('end')?.value,'yyyy-MM-dd','en');

    this.reservationService.searchRooms(this.checkIn,this.checkOut)
    .subscribe(
      data=>{
        console.log(data);
        this.roomsDataSource.data=data.rooms;
      },
      error=>{
        this.errorMessage=error;
        console.log(error);
        
      }
    );
    console.log(this.checkIn);
    console.log(   this.checkOut  );

    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roomsDataSource.filter = filterValue.trim().toLowerCase();
  }
  reserve(rooms:Rooms){
    console.log(rooms);
    console.log(this.checkIn);
    console.log(this.checkOut);


    
    this.router.navigate([rooms.id,this.checkIn,this.checkOut],{relativeTo:this.route});
    //dont need to add price and number of nights
  }
}
