import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryAddComponent } from './inventorycs/inventory-add/inventory-add.component';
import { InventoryListComponent } from './inventorycs/inventory-list/inventory-list.component';
import { UpdateInventoryComponent } from './inventorycs/update-inventory/update-inventory.component';
import { LoginComponent } from './login/login.component';
import { AddDepartmentComponent } from './owner/add-department/add-department.component';
import { DepartmentListComponent } from './owner/department-list/department-list.component';
import { ReportsComponent } from './owner/reports/reports.component';
import { UpdateDepartmentComponent } from './owner/update-department/update-department.component';
import { AddGuestComponent } from './reservations/add-guest/add-guest.component';
import { GuestListComponent } from './reservations/guest-list/guest-list.component';
import { MakeReservationComponent } from './reservations/make-reservation/make-reservation.component';
import { PaymentComponent } from './reservations/payment/payment.component';
import { ReservationBillingComponent } from './reservations/reservation-billing/reservation-billing.component';
import { SearchRoomsComponent } from './reservations/search-rooms/search-rooms.component';
import { UpdateGuestComponent } from './reservations/update-guest/update-guest.component';
import { AddRoomComponent } from './rooms-mgmt/add-room/add-room.component';
import { RoomsMgmtModule } from './rooms-mgmt/rooms-mgmt.module';
import { RoomsdetailsComponent } from './rooms-mgmt/roomslist/roomsdetails.component';
import { UpdateRoomComponent } from './rooms-mgmt/update-room/update-room.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'staff',component:StaffListComponent  },
  {path:'staff/add',component:AddStaffComponent},
  {path:'staff/:id',component:UpdateStaffComponent},
  {path:'rooms',component:RoomsdetailsComponent},
  {path:'rooms/add',component:AddRoomComponent},
  {path:'rooms/:id',component:UpdateRoomComponent},
  {path:'search-rooms',component:SearchRoomsComponent},

  {path:'search-rooms/:id/:checkin/:checkout',component:MakeReservationComponent},
  
  {path:'all-reservations',component:ReservationBillingComponent},
  {path:'all-reservations/:id',component:PaymentComponent},

  {path:'guests',component:GuestListComponent},
  {path:'guests/add',component:AddGuestComponent},
  {path:'guests/:id',component:UpdateGuestComponent},
  {path:'reports',component:ReportsComponent},
  {path:'departments',component:DepartmentListComponent},
  {path:'departments/add',component:AddDepartmentComponent},
  {path:'departments/:id',component:UpdateDepartmentComponent},
  {path:'inventory',component:InventoryListComponent},
  {path:'inventory/add',component:InventoryAddComponent},
  {path:'inventory/:id',component:UpdateInventoryComponent},



  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents =[
  DashboardComponent,StaffListComponent,AddStaffComponent,UpdateStaffComponent,
  SearchRoomsComponent,
  MakeReservationComponent,
  ReservationBillingComponent,
  GuestListComponent,
  AddGuestComponent,
  UpdateGuestComponent,
  ReportsComponent,
  DepartmentListComponent,
  AddDepartmentComponent,
  UpdateDepartmentComponent,
  InventoryListComponent,
  InventoryAddComponent,
  UpdateInventoryComponent,
  PaymentComponent
]