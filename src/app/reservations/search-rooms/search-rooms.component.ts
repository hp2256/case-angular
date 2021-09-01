import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Rooms } from 'src/app/rooms-mgmt/rooms';
import { ReservationServicesService } from '../reservation-services.service';

@Component({
  selector: 'app-search-rooms',
  templateUrl: './search-rooms.component.html',
  styleUrls: ['./search-rooms.component.css']
})
export class SearchRoomsComponent implements OnInit {
  range!:FormGroup;
  displayedColumns: string[] = ['roomNumber','type','typeId','smoke','price','reserveRoom'];
  roomsDataSource = new MatTableDataSource();

  constructor(
    private fb:FormBuilder,
    private reservationService:ReservationServicesService,
    private route:ActivatedRoute,
    private router:Router
    ) { }
  //allRooms: AllRooms
  errorMessage:string="";

  ngOnInit(): void {
    this.range=this.fb.group({
      
      start:['',Validators.required],
      end:['',Validators.required]
    }
    );
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
    )
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
