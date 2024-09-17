import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucTinh } from '../danh-muc-tinh.model';
import { DanhMucTinhService } from '../service/danh-muc-tinh.service';

import danhMucTinhResolve from './danh-muc-tinh-routing-resolve.service';

describe('DanhMucTinh routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucTinhService;
  let resultDanhMucTinh: IDanhMucTinh | null | undefined;

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
    service = TestBed.inject(DanhMucTinhService);
    resultDanhMucTinh = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucTinh returned by find', () => {
      // GIVEN
      service.find = jest.fn(maTinh => of(new HttpResponse({ body: { maTinh } })));
      mockActivatedRouteSnapshot.params = { maTinh: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucTinhResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucTinh = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucTinh).toEqual({ maTinh: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucTinhResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucTinh = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucTinh).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucTinh>({ body: null })));
      mockActivatedRouteSnapshot.params = { maTinh: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucTinhResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucTinh = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucTinh).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
