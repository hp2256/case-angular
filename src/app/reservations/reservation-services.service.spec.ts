import { TestBed } from '@angular/core/testing';

import { ReservationServicesService } from './reservation-services.service';

describe('ReservationServicesService', () => {
  let service: ReservationServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
