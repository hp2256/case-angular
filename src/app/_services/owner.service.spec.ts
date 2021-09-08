import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable,from } from 'rxjs';
import { AllDepartment } from '../models/alldepartments';

import { OwnerService } from './owner.service';

describe('OwnerService', () => {
  let service: OwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]

    });
    service = TestBed.inject(OwnerService);
  });

  it('should be created', () => {
    
    expect(service).toBeTruthy();

  });
  it('should return all dpts',(done)=>{

    const alldata:AllDepartment={
      allDepartments:[
        {
          id:"612f4adb072554251c6cac58",
          departmentName:"Valet",
          numberOfStaff:3
        },
        {
          id:"6130a713ec3add6393364163",
          departmentName:"House-Keeping",
          numberOfStaff:1
        },
        {
          id:"613203ff08fd046532547b41",
          departmentName:"Cooking",
          numberOfStaff:2
        }
      ]
    };
    // const fake={getDepartments:():Observable<AllDepartment>=>{return alldata}};
    // const fakeService= new OwnerService(fake as OwnerService() );
    spyOn(service,'getDepartments').and.callFake(():Observable<AllDepartment>=>{
      return from([alldata]);
    })
    service.getDepartments().subscribe(data=>{
      expect(data).toEqual(alldata);
      done();
    })

  });


});
