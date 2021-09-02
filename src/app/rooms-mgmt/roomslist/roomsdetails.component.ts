import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Rooms } from '../rooms';
import { RoomsServiceService } from '../rooms-service.service';

@Component({
  selector: 'app-roomsdetails',
  templateUrl: './roomsdetails.component.html',
  styleUrls: ['./roomsdetails.component.css']
})
export class RoomsdetailsComponent implements OnInit {

  displayedColumns: string[] = ['roomNumber','type','typeId','smoke','price','updateRoom'];

   errorMessage:string="";
  roomsDataSource = new MatTableDataSource();
  isLoggedIn=false;
  allowed=false;
  constructor(
    private _roomsService: RoomsServiceService,
    private router:Router,
    private route:ActivatedRoute,
    private token:TokenStorageService

  ) { } 
  private roles: string[] = [];

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    
    if(this.isLoggedIn){
      const user = this.token.getUser();
      this.roles = user.roles;
      
  if(this.roles.includes('ROLE_OWNER')||this.roles.includes('ROLE_MANAGER')){
    this.allowed=true;
    this._roomsService.getRooms()
    .subscribe(
      data=>{
    //    console.log(data);
    
        this.roomsDataSource.data=data.rooms;
        console.log("data");
        
        console.log(data);
        
        console.log(this.roomsDataSource);
        
      },
      error=>this.errorMessage=error
    );
  }
  }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roomsDataSource.filter = filterValue.trim().toLowerCase();
  }
  addRoom(){
    this.router.navigate(['add'],{relativeTo:this.route});

  }
  updateRoom(room:Rooms){
    this.router.navigate([room.id],{relativeTo:this.route});
    console.log(room);
  }
}
