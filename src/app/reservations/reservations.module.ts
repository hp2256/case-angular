import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoomsComponent } from './search-rooms/search-rooms.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { ReservationBillingComponent } from './reservation-billing/reservation-billing.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { AddGuestComponent } from './add-guest/add-guest.component';
import { UpdateGuestComponent } from './update-guest/update-guest.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    SearchRoomsComponent,
    MakeReservationComponent,
    ReservationBillingComponent,
    GuestListComponent,
    AddGuestComponent,
    UpdateGuestComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReservationsModule { }
