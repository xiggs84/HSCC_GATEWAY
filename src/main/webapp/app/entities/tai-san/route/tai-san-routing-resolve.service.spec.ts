import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ITaiSan } from '../tai-san.model';
import { TaiSanService } from '../service/tai-san.service';

import taiSanResolve from './tai-san-routing-resolve.service';

describe('TaiSan routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: TaiSanService;
  let resultTaiSan: ITaiSan | null | undefined;

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
    service = TestBed.inject(TaiSanService);
    resultTaiSan = undefined;
  });

  describe('resolve', () => {
    it('should return ITaiSan returned by find', () => {
      // GIVEN
      service.find = jest.fn(idTaiSan => of(new HttpResponse({ body: { idTaiSan } })));
      mockActivatedRouteSnapshot.params = { idTaiSan: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaiSan).toEqual({ idTaiSan: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        taiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTaiSan).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITaiSan>({ body: null })));
      mockActivatedRouteSnapshot.params = { idTaiSan: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaiSan).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
