import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucXa } from '../danh-muc-xa.model';
import { DanhMucXaService } from '../service/danh-muc-xa.service';

import danhMucXaResolve from './danh-muc-xa-routing-resolve.service';

describe('DanhMucXa routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucXaService;
  let resultDanhMucXa: IDanhMucXa | null | undefined;

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
    service = TestBed.inject(DanhMucXaService);
    resultDanhMucXa = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucXa returned by find', () => {
      // GIVEN
      service.find = jest.fn(maXa => of(new HttpResponse({ body: { maXa } })));
      mockActivatedRouteSnapshot.params = { maXa: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucXaResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucXa = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucXa).toEqual({ maXa: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucXaResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucXa = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucXa).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucXa>({ body: null })));
      mockActivatedRouteSnapshot.params = { maXa: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucXaResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucXa = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucXa).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
