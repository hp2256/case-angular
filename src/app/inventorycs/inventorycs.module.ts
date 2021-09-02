import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';



@NgModule({
  declarations: [
    InventoryListComponent,
    InventoryAddComponent,
    UpdateInventoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InventorycsModule { }
