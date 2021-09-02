import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report';
import { OwnerService } from 'src/app/_services/owner.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService,
    private ownerService:OwnerService
  ) { }
  isLoggedIn=false;
  allowed=false;
  private roles: string[] = [];

  report!:Report;
  reportsDataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id','reportDate','numberOfStaff','staffPayment','totalIncome','deleteReport'];
  errorMsg="";
  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn){
      const user = this.token.getUser();
      this.roles = user.roles;
    
      if(this.roles.includes('ROLE_OWNER')||this.roles.includes('ROLE_MANAGER')){
        this.allowed=true;
       this.ownerService.getReports().subscribe
       (
         data=>{this.reportsDataSource.data=data.reports},
         error=>{
           this.errorMsg=error;
         }
       );

      }
    }
    
      
    
  }
  viewReport(){
    this.ownerService.getReport().subscribe(
      data=>{
        console.log(data);
        window.location.reload();
        
      },
      error=>{}
      )
  }
  deleteReport(report:Report){
    this.ownerService.deleteReport(report).subscribe
    (
      data=>{console.log(data);
        alert('Deleted');
        window.location.reload();
      },
      error=>{this.errorMsg=error;
      console.log(error);
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reportsDataSource.filter = filterValue.trim().toLowerCase();
  }
}
