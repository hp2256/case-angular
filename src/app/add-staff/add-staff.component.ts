import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from '../staff';
import { StaffserviceService } from '../staffservice.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {

  constructor(
    private fb:FormBuilder, 
    private _staffService:StaffserviceService,
    private router:Router, 
    private route:ActivatedRoute
    ) { }

  addStaffForm!: FormGroup;
  addStaff!:Staff;
  errorMsg:string="";
  errorBool=false;
  ngOnInit(): void {
    this.addStaffForm= this.fb.group(
      {
        //id:[],
        empName:['',[Validators.required]]!,
        staffCode:['',[Validators.required]]!,
        empSalary:['',[Validators.required]]!,
        empAge:['',[Validators.required,Validators.min(18)]]!,
        empOccupation:['',[Validators.required]],
        empEmail:['',[Validators.required,Validators.email]],
        empAddress: this.fb.group({
          street: ['',[Validators.required]],
          zipCode: ['',[Validators.required]],
          city: ['',[Validators.required]],
          country:['',[Validators.required]]
        }),
      }
    )
  }
  get empName(){
    return this.addStaffForm.get('empName')!;
  }
  get staffCode(){
    return this.addStaffForm.get('staffCode')!;
  }
  get empSalary(){
    return this.addStaffForm.get('empSalary')!;
  }
  get empAge(){
    return this.addStaffForm.get('empAge')!;
  }
  get empOccupation(){
    return this.addStaffForm.get('empOccupation')!;
  }
  get empEmail(){
    return this.addStaffForm.get('empEmail')!;
  }
  get empAddress(){
    return this.addStaffForm.get('empAddress')!;
  }
  get country() {
    return this.addStaffForm.get("empAddress")!.get('country')!;
  }
 
  get city() {
    return this.addStaffForm.get("empAddress")!.get('city')!;
  }
 
  get street() {
    return this.addStaffForm.get("empAddress")!.get('street')!;
  }
 
  get zipcode() {
    return this.addStaffForm.get("empAddress")!.get('zipCode')!;
  }
  // get empName(){
  //   return this.addStaffForm.get('empName')!;
  // }
  
  onSubmit(){
    console.log(this.addStaffForm.value);
    this.addStaff=this.addStaffForm.value;
    this._staffService.addStaff(this.addStaff).subscribe(
      response=>console.log(response),
      error=>{
        this.errorBool=true;
        console.log(error);
        this.errorMsg=error;}     
    )
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
