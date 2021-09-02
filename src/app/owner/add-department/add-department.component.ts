import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/department';
import { OwnerService } from 'src/app/_services/owner.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(
    private ownerService:OwnerService,
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService,
    private fb:FormBuilder, 

  ) { }

  addDepartmentForm!:FormGroup;

  department!:Department;
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
        this.addDepartmentForm= this.fb.group(
          { 
            //id:[],
            departmentName:['',[Validators.required]],
            numberOfStaff:['',[Validators.required,Validators.min(0)]],
          }
        );
      }
    }
  }
  get departmentName(){
    return this.addDepartmentForm.get('departmentName')!;
  }
  get numberOfStaff(){
    return this.addDepartmentForm.get('numberOfStaff')!;
  }
  
  onSubmit(){
    console.log(this.addDepartmentForm.value);
    this.department=this.addDepartmentForm.value;
    this.ownerService.addDepartment(this.department).subscribe(
      response=>{
        console.log("resposen "+response)
        
        alert('SUCCESSFULLY ADDED');
        this.router.navigate(['../'],{relativeTo:this.route});
 
      },
      error=>{console.log(error);this.errorBool=true;this.errorMsg=error;}      
    )
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
