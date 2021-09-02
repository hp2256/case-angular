import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guest } from 'src/app/models/guest';
import { GuestsServiceService } from 'src/app/_services/guests-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {

  constructor(
    private fb:FormBuilder, 
    private _guestService:GuestsServiceService,
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService,

  ) { }

  
  addGuestForm!: FormGroup;
  addStaff!:Guest;
  errorMsg:string=""; 
  errorBool=false;
  isLoggedIn=false;

  guestsErrorMsg="";
  ngOnInit(): void {
    
    this.isLoggedIn=!!this.token.getToken();
    if(this.isLoggedIn){
      this.addGuestForm= this.fb.group(
        {
          //id:[],
          name:['',[Validators.required]]!,
          memberCode:['',[Validators.required]]!,
          phoneNumber:['',[Validators.required,Validators.minLength(10)]]!,
          gender:['',[Validators.required]]!,
          company:['',[Validators.required]],
          email:['',[Validators.required,Validators.email]],
          address: this.fb.group({
            street: ['',[Validators.required]],
            zipCode: ['',[Validators.required]],
            city: ['',[Validators.required]],
            country:['',[Validators.required]]
          })
        });
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

}
onCancel(){
  this.router.navigate(['../'],{relativeTo:this.route});
}

}
