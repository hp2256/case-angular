import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private token:TokenStorageService
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
            empName:[data.empName],
            staffCode:[data.staffCode],
            empSalary:[data.empSalary],
            empAge:[data.empAge],
            empOccupation:[data.empOccupation],
            empEmail:[data.empEmail],
            empAddress: this.fb.group({
              street: [data.empAddress.street],
              zipCode: [data.empAddress.zipCode],
              city: [data.empAddress.city],
              country:[data.empAddress.country]
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

  onSubmit(){
    console.log(this.updateStaffForm.value);
    this.staffUpdate=this.updateStaffForm.value;
    this._staffService.updateStaff(this.staffUpdate)
    .subscribe(
      response=>console.log(response),
      error=>console.log(error)    
    )
    ;
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
