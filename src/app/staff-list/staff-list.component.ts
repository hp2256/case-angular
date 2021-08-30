import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../address';
import { Staff } from '../staff';
import { StaffList } from '../staff-list';
import { StaffserviceService } from '../staffservice.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'staffCode', 'empName', 'empAddress','empSalary','empAge','empOccupation','empEmail','updateStaff'];
  //public staff:StaffList;
  public errorMessage:string="";
  dataSource = new MatTableDataSource();
  isLoggedIn=false;
  allowed=false;
  private roles: string[] = [];

  constructor(
    private _staffService:StaffserviceService,
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService
     ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
if(this.isLoggedIn){
  const user = this.token.getUser();
  this.roles = user.roles;

  if(this.roles.includes('ROLE_OWNER')||this.roles.includes('ROLE_MANAGER')){
    this.allowed=true;
    this._staffService.getStaff()
    .subscribe(
      data=>{
        this.dataSource.data=data.staffs;
      },
      error=>this.errorMessage=error
    )
  }
}

  

    
    console.log("STAFF");
    
   // console.log(this.staff);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updateStaff(staff:Staff){
    this.router.navigate([staff.id],{relativeTo:this.route});
    console.log(staff);
  }
  addStaff(){
    this.router.navigate(['add'],{relativeTo:this.route});
  }
}
