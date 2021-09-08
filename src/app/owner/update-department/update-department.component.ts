import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Department } from 'src/app/models/department';
import { OwnerService } from 'src/app/_services/owner.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  constructor(
    private ownerService:OwnerService,
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService,
    private fb:FormBuilder, 
    private snackBar:MatSnackBar
  ) { }
  department!:Department;
  public errorMessage:string="";
  isLoggedIn=false;
  allowed=false;
  private roles: string[] = [];
  errorBool=false;
  errorMsg="";
  updateDepartmentForm!:FormGroup;
  departmentId="";
  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn){ 
      
      const user = this.token.getUser();
      this.roles = user.roles;
      if(this.roles.includes('ROLE_OWNER')){
        this.route.paramMap.subscribe((params:ParamMap)=>{
          let id=params.get('id')||"";
          this.departmentId=id;
        });
        this.allowed=true;
        this.ownerService.getDepartmentById(this.departmentId)
        .subscribe(
          data=>{
            this.updateDepartmentForm= this.fb.group(
              { 
                id:[data.id],
                departmentName:[data.departmentName,[Validators.required]],
                numberOfStaff:[data.numberOfStaff,[Validators.required,Validators.min(0)]],
              }
            );
          },
          error=>{

          }
        );
       
      }
    }
  }
  get departmentName(){
    return this.updateDepartmentForm.get('departmentName')!;
  }
  get numberOfStaff(){
    return this.updateDepartmentForm.get('numberOfStaff')!;
  }
  
  onSubmit(){
    console.log(this.updateDepartmentForm.value);
    this.department=this.updateDepartmentForm.value;
    this.ownerService.updateDepartment(this.department).subscribe(
      response=>{
        console.log("resposen "+response)
        this.snackBar.open("Successfully Updated!","Dismiss",{duration:2000});
        
     //   alert('SUCCESSFULLY UPDATED');
        this.router.navigate(['../'],{relativeTo:this.route});
 
      },
      error=>{console.log(error);this.errorBool=true;this.errorMsg=error;}      
    )
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
