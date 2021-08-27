import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Rooms } from '../Rooms';
import { RoomsServiceService } from '../rooms-service.service';

@Component({
  selector: 'app-roomsdetails',
  templateUrl: './roomsdetails.component.html',
  styleUrls: ['./roomsdetails.component.css']
})
export class RoomsdetailsComponent implements OnInit {

  displayedColumns: string[] = ['roomNumber','type','typeId','smoke','price','updateRoom'];

  public errorMessage:string="";
  dataSource = new MatTableDataSource();
  constructor(
    private _roomsService: RoomsServiceService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._roomsService.getRooms()
    .subscribe(
      data=>{
        this.dataSource.data=data;
      },
      error=>this.errorMessage=error
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addRoom(){

  }
  updateRoom(room:Rooms){

  }
}
