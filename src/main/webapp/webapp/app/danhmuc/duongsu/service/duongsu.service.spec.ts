import { TestBed } from '@angular/core/testing';

import { DuongsuService } from './duongsu.service';

describe('DuongsuService', () => {
  let service: DuongsuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuongsuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
