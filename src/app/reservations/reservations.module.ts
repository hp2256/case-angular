import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoomsComponent } from './search-rooms/search-rooms.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { ReservationBillingComponent } from './reservation-billing/reservation-billing.component';



@NgModule({
  declarations: [
    SearchRoomsComponent,
    MakeReservationComponent,
    ReservationBillingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReservationsModule { }
