import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsdetailsComponent } from './roomsdetails.component';

describe('RoomsdetailsComponent', () => {
  let component: RoomsdetailsComponent;
  let fixture: ComponentFixture<RoomsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
