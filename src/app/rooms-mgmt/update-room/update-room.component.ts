import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Rooms } from '../rooms';
import { RoomsServiceService } from '../rooms-service.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {

  constructor(
        
    private fb:FormBuilder, 
    private _roomService:RoomsServiceService,
    private router:Router, 
    private route:ActivatedRoute
  ) { }

  
  updateRoomForm!:FormGroup;
  updatedRoom!:Rooms;
  errorMsg="";
  errorBool=false;

  public roomId:string="";

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=params.get('id')||"";
      this.roomId=id;
    })
    this._roomService.getRoomById(this.roomId)
    .subscribe(
      data=>{
        this.updateRoomForm= this.fb.group(
          { 
            id:[data.id],
            roomNumber:[data.roomNumber,[Validators.required]],
            type:[data.type,[Validators.required]],
            typeId:[data.typeId,[Validators.required]],
            smoke:[data.smoke,[Validators.required]],
            price:[data.price,[Validators.required]],
          }
        )
      },
      error=>this.errorMsg=error
    )
   
  }
  get roomNumber(){
    return this.updateRoomForm.get('roomNumber')!;
  }
  get type(){
    return this.updateRoomForm.get('type')!;
  }
  get typeId(){
    return this.updateRoomForm.get('typeId')!;
  }
  get smoke(){
    return this.updateRoomForm.get('smoke')!;
  }
  get price(){
    return this.updateRoomForm.get('price')!;
  }
  onSubmit(){
    console.log(this.updateRoomForm.value);
    this.updatedRoom=this.updateRoomForm.value;
    this._roomService.updateRoom(this.updatedRoom).subscribe(
      response=>{console.log(response);
      alert('SUCCESSFULLY UPDATED');
    this.router.navigate(['../'],{relativeTo:this.route});

      },
      error=>{console.log(error);this.errorBool=true;this.errorMsg=error;}      
    )
    
  }
    onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
