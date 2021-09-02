import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/department';
import { OwnerService } from 'src/app/_services/owner.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  constructor(
    private ownerService:OwnerService,
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService
  ) {

   }
   displayedColumns: string[] = ['id', 'departmentName','numberOfStaff','updateDepartment'];
   //public staff:StaffList;
   public errorMessage:string="";
   departmentDataSource = new MatTableDataSource();
   isLoggedIn=false;
   allowed=false;
   private roles: string[] = [];
 
  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn){ 
      
      const user = this.token.getUser();
      this.roles = user.roles;
      if(this.roles.includes('ROLE_OWNER')){
        this.allowed=true;
        this.ownerService.getDepartments()
        .subscribe(
          data=>{
            console.log(data);
            
            console.log(data.allDepartments);
            this.departmentDataSource.data=data.allDepartments;
          },
          error=>{
            console.log(error);
            this.errorMessage=error;
            
          }
        )
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.departmentDataSource.filter = filterValue.trim().toLowerCase();
  }
  updateDepartment(department:Department){
    this.router.navigate([department.id],{relativeTo:this.route});
    console.log(department);
  }
  addDepartment(){
    this.router.navigate(['add'],{relativeTo:this.route});
  }

}
