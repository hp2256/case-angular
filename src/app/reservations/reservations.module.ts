import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoomsComponent } from './search-rooms/search-rooms.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchRoomsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReservationsModule { }
