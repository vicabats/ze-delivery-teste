import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';

describe('LocationService', () => {
  var google;
  let service: LocationService;

  beforeEach(() => {
    google = google;
    TestBed.configureTestingModule({
      providers: [LocationService]
    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
