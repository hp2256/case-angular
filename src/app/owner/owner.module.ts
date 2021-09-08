import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsComponent } from './reports/reports.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { DialogCompComponent } from './dialog-comp/dialog-comp.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ReportsComponent,
    DepartmentListComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent,
    DialogCompComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ]
})
export class OwnerModule { }
