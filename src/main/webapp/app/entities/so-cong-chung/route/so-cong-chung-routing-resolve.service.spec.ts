import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ISoCongChung } from '../so-cong-chung.model';
import { SoCongChungService } from '../service/so-cong-chung.service';

import soCongChungResolve from './so-cong-chung-routing-resolve.service';

describe('SoCongChung routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: SoCongChungService;
  let resultSoCongChung: ISoCongChung | null | undefined;

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
    service = TestBed.inject(SoCongChungService);
    resultSoCongChung = undefined;
  });

  describe('resolve', () => {
    it('should return ISoCongChung returned by find', () => {
      // GIVEN
      service.find = jest.fn(idSo => of(new HttpResponse({ body: { idSo } })));
      mockActivatedRouteSnapshot.params = { idSo: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        soCongChungResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSoCongChung = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultSoCongChung).toEqual({ idSo: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        soCongChungResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSoCongChung = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSoCongChung).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ISoCongChung>({ body: null })));
      mockActivatedRouteSnapshot.params = { idSo: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        soCongChungResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSoCongChung = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultSoCongChung).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
