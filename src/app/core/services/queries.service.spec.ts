import { TestBed } from '@angular/core/testing';

import { QueriesService } from './queries.service';

describe('QueriesService', () => {
  let service: QueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueriesService]
    });
    service = TestBed.inject(QueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
