import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Guest } from 'src/app/models/guest';
import { GuestsServiceService } from 'src/app/_services/guests-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-update-guest',
  templateUrl: './update-guest.component.html',
  styleUrls: ['./update-guest.component.css']
})
export class UpdateGuestComponent implements OnInit {

  constructor(
    private fb:FormBuilder, 
    private _guestService:GuestsServiceService,
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService,
    private snackBar:MatSnackBar
  ) { }
  addGuestForm!: FormGroup;
  addStaff!:Guest;
  errorMsg:string=""; 
  errorBool=false;
  isLoggedIn=false;

  //update
  public guestId:string="";
  public guestUpdate!:Guest;

  ngOnInit(): void {
    
    this.isLoggedIn=!!this.token.getToken();
    if(this.isLoggedIn){
      this.route.paramMap.subscribe((params:ParamMap)=>{
        let id=params.get('id')||"";
        this.guestId=id;
      })

      this._guestService.getGuestById(this.guestId)
    .subscribe(
      data=>{
        this.addGuestForm= this.fb.group(
          {
            id:[data.id],
            name:[data.name,[Validators.required]]!,
            memberCode:[data.memberCode,[Validators.required]]!,
            phoneNumber:[data.phoneNumber,[Validators.required,Validators.maxLength(10),Validators.minLength(10)]]!,
            gender:[data.gender,[Validators.required]]!,
            company:[data.company,[Validators.required]],
            email:[data.email,[Validators.required,Validators.email]],
            address: this.fb.group({
              street: [data.address.street,[Validators.required]],
              zipCode: [data.address.zipCode,[Validators.required,Validators.minLength(4),Validators.maxLength(9)]],
              city: [data.address.city,[Validators.required]],
              country:[data.address.country,[Validators.required]]
            })
          });
      },
      error=>{
        this.errorBool=true;
        this.errorMsg=error;
      }
    )

     
    }
    else{
      
      this.isLoggedIn=false;
      this.errorMsg="PLEASE LOGIN";
    }
  }

  get name(){
    return this.addGuestForm.get('name')!;
  }
  get memberCode(){
    return this.addGuestForm.get('memberCode')!;
  }
  get phoneNumber(){
    return this.addGuestForm.get('phoneNumber')!;
  }
  get company(){
    return this.addGuestForm.get('company')!;
  }
  get email(){
    return this.addGuestForm.get('email')!;
  }
  get gender(){
    return this.addGuestForm.get('gender')!;
  }
  get address(){
    return this.addGuestForm.get('address')!;
  }
  get country() {
    return this.addGuestForm.get("address")!.get('country')!;
  }
 
  get city() {
    return this.addGuestForm.get("address")!.get('city')!;
  }
 
  get street() {
    return this.addGuestForm.get("address")!.get('street')!;
  }
 
  get zipcode() {
    return this.addGuestForm.get("address")!.get('zipCode')!;
  }
onSubmit(){
  console.log(this.addGuestForm.value);
  console.log(this.addGuestForm.value);
  this.guestUpdate=this.addGuestForm.value;
  this._guestService.updateGuest(this.guestUpdate)
  .subscribe(
    response=>{console.log(response);
    this.router.navigate(['../'],{relativeTo:this.route});
    this.snackBar.open("Successfully Updated!","Dismiss",{duration:2000});
    
    
    },
    error=>console.log(error)    
  )
  ;
}
onCancel(){
  this.router.navigate(['../'],{relativeTo:this.route});
}

}
