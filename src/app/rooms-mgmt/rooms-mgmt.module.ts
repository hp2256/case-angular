import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsdetailsComponent } from './roomslist/roomsdetails.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    RoomsdetailsComponent,
    AddRoomComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
    ]
})
export class RoomsMgmtModule { }
