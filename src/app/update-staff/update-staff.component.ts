import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Staff } from '../staff';
import { StaffserviceService } from '../staffservice.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {

  updateStaffForm!: FormGroup;
  constructor(
    private _staffService:StaffserviceService, 
    private route:ActivatedRoute, 
    private router:Router,
    private fb:FormBuilder,
    private token:TokenStorageService,
    private snackBar:MatSnackBar
    ) {
   }

  public memberId:string="";
  public staffUpdate!:Staff;
  public errorMsg:string="";
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
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=params.get('id')||"";
      this.memberId=id;
    })
    this._staffService.getStaffById(this.memberId)
    .subscribe(
      data=>{
        this.updateStaffForm= this.fb.group(
          {
            id:[data.id],
            empName:[data.empName,[Validators.required]],
            staffCode:[data.staffCode,[Validators.required]],
            empSalary:[data.empSalary,[Validators.required]],
            empAge:[data.empAge,[Validators.required]],
            empOccupation:[data.empOccupation,[Validators.required]],
            empEmail:[data.empEmail,[Validators.required,Validators.email]],
            empAddress: this.fb.group({
              street: [data.empAddress.street,[Validators.required]],
              zipCode: [data.empAddress.zipCode,[Validators.required,Validators.minLength(4),Validators.maxLength(9)]],
              city: [data.empAddress.city,[Validators.required]],
              country:[data.empAddress.country,[Validators.required]]
            }),
          }
        )
        console.log("data:"+ data);
        
        this.staffUpdate=data},
      error=>this.errorMsg=error
    )
        }}
    //oninit
  }
get empName(){
  return this.updateStaffForm.get('empName')!;
}
get staffCode(){
  return this.updateStaffForm.get('staffCode')!;
}
get empSalary(){
  return this.updateStaffForm.get('empSalary')!;
}
get empAge(){
  return this.updateStaffForm.get('empAge')!;
}
get empOccupation(){
  return this.updateStaffForm.get('empOccupation')!;
}
get empEmail(){
  return this.updateStaffForm.get('empEmail')!;
}
get empAddress(){
  return this.updateStaffForm.get('empAddress')!;
}
get country() {
  return this.updateStaffForm.get("empAddress")!.get('country')!;
}

get city() {
  return this.updateStaffForm.get("empAddress")!.get('city')!;
}

get street() {
  return this.updateStaffForm.get("empAddress")!.get('street')!;
}

get zipcode() {
  return this.updateStaffForm.get("empAddress")!.get('zipCode')!;
}
  onSubmit(){
    console.log(this.updateStaffForm.value);
    this.staffUpdate=this.updateStaffForm.value;
    this._staffService.updateStaff(this.staffUpdate)
    .subscribe(
      response=>{console.log(response);
      this.snackBar.open("Successfully Updated","Dismiss",{duration:2000});
    this.router.navigate(['../'],{relativeTo:this.route})
      
      },
      error=>console.log(error)    
    )
    ;
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
