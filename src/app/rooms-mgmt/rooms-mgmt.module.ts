import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsdetailsComponent } from './roomslist/roomsdetails.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { MaterialModule } from '../material/material.module';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RoomsdetailsComponent,
    AddRoomComponent,
    UpdateRoomComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
    ]
})
export class RoomsMgmtModule { }
