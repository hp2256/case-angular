import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Inventory } from 'src/app/models/inventory';
import { RoomsServiceService } from 'src/app/rooms-mgmt/rooms-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.css']
})
export class UpdateInventoryComponent implements OnInit {

  constructor(
    private roomsService:RoomsServiceService,
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService,
    private fb:FormBuilder, 
  ) { }
  addInventoryForm!:FormGroup;

  inventory!:Inventory;
  public errorMessage:string="";
  isLoggedIn=false;
  allowed=false;
  private roles: string[] = [];
  errorBool=false;
  errorMsg="";
  inventoryId="";
  ngOnInit(): void {
    
    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn){ 
      
      const user = this.token.getUser();
      this.roles = user.roles;
      if(this.roles.includes('ROLE_OWNER')||this.roles.includes('ROLE_MANAGER')){
        this.allowed=true;
        this.route.paramMap.subscribe((params:ParamMap)=>{
          let id=params.get('id')||"";
          this.inventoryId=id;
        });
       this.roomsService.getInventoryById(this.inventoryId)
       .subscribe(
         data=>{
          this.addInventoryForm= this.fb.group(
            { 
              id:[data.id],
              name:[data.name,[Validators.required]],
              amount:[data.amount,[Validators.required,Validators.min(0)]],
            }
          );
         },
         error=>{

         }
       );
      }
    }
  }
  get name(){
    return this.addInventoryForm.get('name')!;
  }
  get amount(){
    return this.addInventoryForm.get('amount')!;
  }
  onSubmit(){
    console.log(this.addInventoryForm.value);
    this.inventory=this.addInventoryForm.value;
    this.roomsService.updateInventory(this.inventory).subscribe(
      response=>{
        console.log("resposen "+response)
        
        alert('SUCCESSFULLY UPDATED');
        this.router.navigate(['../'],{relativeTo:this.route});
 
      },
      error=>{console.log(error);this.errorBool=true;this.errorMsg=error;}      
    )
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
