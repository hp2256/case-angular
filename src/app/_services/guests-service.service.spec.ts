import { TestBed } from '@angular/core/testing';

import { GuestsServiceService } from './guests-service.service';

describe('GuestsServiceService', () => {
  let service: GuestsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
