import { TestBed } from '@angular/core/testing';

import { DuongsuFormService } from './duongsu-form.service';

describe('DuongsuFormService', () => {
  let service: DuongsuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuongsuFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
