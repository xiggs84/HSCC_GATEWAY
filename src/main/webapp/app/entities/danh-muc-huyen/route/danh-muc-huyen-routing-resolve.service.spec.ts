import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucHuyen } from '../danh-muc-huyen.model';
import { DanhMucHuyenService } from '../service/danh-muc-huyen.service';

import danhMucHuyenResolve from './danh-muc-huyen-routing-resolve.service';

describe('DanhMucHuyen routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucHuyenService;
  let resultDanhMucHuyen: IDanhMucHuyen | null | undefined;

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
    service = TestBed.inject(DanhMucHuyenService);
    resultDanhMucHuyen = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucHuyen returned by find', () => {
      // GIVEN
      service.find = jest.fn(maHuyen => of(new HttpResponse({ body: { maHuyen } })));
      mockActivatedRouteSnapshot.params = { maHuyen: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucHuyenResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucHuyen = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucHuyen).toEqual({ maHuyen: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucHuyenResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucHuyen = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucHuyen).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucHuyen>({ body: null })));
      mockActivatedRouteSnapshot.params = { maHuyen: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucHuyenResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucHuyen = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucHuyen).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
