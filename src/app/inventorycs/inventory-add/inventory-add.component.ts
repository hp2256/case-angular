import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Inventory } from 'src/app/models/inventory';
import { RoomsServiceService } from 'src/app/rooms-mgmt/rooms-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {

  constructor(
    private roomsService:RoomsServiceService,
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService,
    private fb:FormBuilder, 
    private snackBar:MatSnackBar

  ) { }

  addInventoryForm!:FormGroup;

  inventory!:Inventory;
  public errorMessage:string="";
  isLoggedIn=false;
  allowed=false;
  private roles: string[] = [];
  errorBool=false;
  errorMsg="";

  ngOnInit(): void {
    
    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn){ 
      
      const user = this.token.getUser();
      this.roles = user.roles;
      if(this.roles.includes('ROLE_OWNER')||this.roles.includes('ROLE_MANAGER')){
        this.allowed=true;
        this.addInventoryForm= this.fb.group(
          { 
            //id:[],
            name:['',[Validators.required]],
            amount:['',[Validators.required,Validators.min(0)]],
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
    this.roomsService.addInventory(this.inventory).subscribe(
      response=>{
        console.log("resposen "+response)
    this.snackBar.open("Successfully Added!","Dismiss",{duration:2000});
        
     //   alert('SUCCESSFULLY ADDED');
        this.router.navigate(['../'],{relativeTo:this.route});
 
      },
      error=>{console.log(error);this.errorBool=true;this.errorMsg=error;}      
    )
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
