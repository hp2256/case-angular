import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rooms } from '../rooms';
import { RoomsServiceService } from '../rooms-service.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  constructor(
    
    private fb:FormBuilder, 
    private _roomService:RoomsServiceService,
    private router:Router, 
    private route:ActivatedRoute
  ) { }

  
  addRoomForm!:FormGroup;
  addRoom!:Rooms;
  errorMsg="";
  errorBool=false;
  ngOnInit(): void {
    this.addRoomForm= this.fb.group(
      { 
        //id:[],
        roomNumber:['',[Validators.required]],
        type:['',[Validators.required]],
        typeId:['',[Validators.required]],
        smoke:['',[Validators.required]],
        price:['',[Validators.required]],
      }
    )
  }
//getters
get roomNumber(){
  return this.addRoomForm.get('roomNumber')!;
}
get type(){
  return this.addRoomForm.get('type')!;
}
get typeId(){
  return this.addRoomForm.get('typeId')!;
}
get smoke(){
  return this.addRoomForm.get('smoke')!;
}
get price(){
  return this.addRoomForm.get('price')!;
}
  onSubmit(){
    console.log(this.addRoomForm.value);
    this.addRoom=this.addRoomForm.value;
    this._roomService.addRoom(this.addRoom).subscribe(
      response=>{console.log(response)
        
        alert('SUCCESSFULLY ADDED');
        this.router.navigate(['../'],{relativeTo:this.route});
 
      },
      error=>{console.log(error);this.errorBool=true;this.errorMsg=error;}      
    )
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
