import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable,from } from 'rxjs';
import { AllDepartment } from 'src/app/models/alldepartments';
import { Department } from 'src/app/models/department';
import { OwnerService } from 'src/app/_services/owner.service';

import { DepartmentListComponent } from './department-list.component';

describe('DepartmentListComponent', () => {
  let component: DepartmentListComponent;
  let fixture: ComponentFixture<DepartmentListComponent>;
  let service:OwnerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,RouterTestingModule],
      declarations: [ DepartmentListComponent ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentListComponent);
    service=TestBed.inject(OwnerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('check if is loggedin', () => {
 
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
