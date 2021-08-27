import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
const Material = [
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule
];
@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
