import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RoomsMgmtModule } from './rooms-mgmt/rooms-mgmt.module';
import { RoomsdetailsComponent } from './rooms-mgmt/roomslist/roomsdetails.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'staff',component:StaffListComponent  },
  {path:'staff/add',component:AddStaffComponent},
  {path:'staff/:id',component:UpdateStaffComponent},
  {path:'rooms',component:RoomsdetailsComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents =[DashboardComponent,StaffListComponent,AddStaffComponent,UpdateStaffComponent]