import { TestBed } from '@angular/core/testing';

import { NganchanService } from './nganchan.service';

describe('NganchanService', () => {
  let service: NganchanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NganchanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
