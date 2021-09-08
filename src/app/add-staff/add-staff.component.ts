import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from '../staff';
import { StaffserviceService } from '../staffservice.service';
import { TokenStorageService } from '../_services/token-storage.service';

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
    private route:ActivatedRoute,
    private token:TokenStorageService,
    private snackBar:MatSnackBar

    ) { }

  addStaffForm!: FormGroup;
  addStaff!:Staff;
  errorMsg:string="";
  errorBool=false;
  isLoggedIn=false;
  ngOnInit(): void {
    this.isLoggedIn=!!this.token.getToken();
    if(this.isLoggedIn){
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
          zipCode: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(9)]],
          city: ['',[Validators.required]],
          country:['',[Validators.required]]
        })
      }
    )
    }
    else{
      
      this.isLoggedIn=false;
      this.errorMsg="PLEASE LOGIN";
    }
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
      response=>{console.log(response);
    //  alert('Successfully Added guest');
    this.snackBar.open("Successfully Added Guest","Dismiss",{duration:2000});
    this.router.navigate(['../'],{relativeTo:this.route});

    },
      error=>{
        this.errorBool=true;
        console.log(error);
        this.errorMsg=error;}     
    )
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
