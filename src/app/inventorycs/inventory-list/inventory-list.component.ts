import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Inventory } from 'src/app/models/inventory';
import { RoomsServiceService } from 'src/app/rooms-mgmt/rooms-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  constructor(
    private roomService:RoomsServiceService,
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService
  ) { }
  displayedColumns: string[] = ['id', 'name','amount','updateInventory'];
  //public staff:StaffList;
  public errorMessage:string="";
  inventoryDataSource = new MatTableDataSource();
  isLoggedIn=false;
  allowed=false;
  private roles: string[] = [];

  ngOnInit(): void {
    
    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn){ 
      
      const user = this.token.getUser();
      this.roles = user.roles;
      if(this.roles.includes('ROLE_OWNER')||this.roles.includes('ROLE_MANAGER')){
        this.allowed=true;
        this.roomService.getInventories().subscribe(
          data=>{
            
            console.log(data.inventory);
            this.inventoryDataSource.data=data.inventory;
          },
          error=>{
            console.log(error);
            this.errorMessage=error;
            
          }
        );
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inventoryDataSource.filter = filterValue.trim().toLowerCase();
  }
  updateInventory(inventory:Inventory){
    this.router.navigate([inventory.id],{relativeTo:this.route});
    console.log(inventory);
  }
  addInventory(){
    this.router.navigate(['add'],{relativeTo:this.route});
  }

}
