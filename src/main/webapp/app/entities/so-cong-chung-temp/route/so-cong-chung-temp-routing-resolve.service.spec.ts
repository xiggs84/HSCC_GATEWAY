import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ISoCongChungTemp } from '../so-cong-chung-temp.model';
import { SoCongChungTempService } from '../service/so-cong-chung-temp.service';

import soCongChungTempResolve from './so-cong-chung-temp-routing-resolve.service';

describe('SoCongChungTemp routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: SoCongChungTempService;
  let resultSoCongChungTemp: ISoCongChungTemp | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(SoCongChungTempService);
    resultSoCongChungTemp = undefined;
  });

  describe('resolve', () => {
    it('should return ISoCongChungTemp returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        soCongChungTempResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSoCongChungTemp = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultSoCongChungTemp).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        soCongChungTempResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSoCongChungTemp = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSoCongChungTemp).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ISoCongChungTemp>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        soCongChungTempResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSoCongChungTemp = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultSoCongChungTemp).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
