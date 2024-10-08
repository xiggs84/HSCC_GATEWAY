import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';
import { DanhMucLoaiGiayToChungThucService } from '../service/danh-muc-loai-giay-to-chung-thuc.service';

import danhMucLoaiGiayToChungThucResolve from './danh-muc-loai-giay-to-chung-thuc-routing-resolve.service';

describe('DanhMucLoaiGiayToChungThuc routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucLoaiGiayToChungThucService;
  let resultDanhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc | null | undefined;

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
    service = TestBed.inject(DanhMucLoaiGiayToChungThucService);
    resultDanhMucLoaiGiayToChungThuc = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucLoaiGiayToChungThuc returned by find', () => {
      // GIVEN
      service.find = jest.fn(idLoaiGiayTo => of(new HttpResponse({ body: { idLoaiGiayTo } })));
      mockActivatedRouteSnapshot.params = { idLoaiGiayTo: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiGiayToChungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiGiayToChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucLoaiGiayToChungThuc).toEqual({ idLoaiGiayTo: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiGiayToChungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiGiayToChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucLoaiGiayToChungThuc).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucLoaiGiayToChungThuc>({ body: null })));
      mockActivatedRouteSnapshot.params = { idLoaiGiayTo: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiGiayToChungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiGiayToChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucLoaiGiayToChungThuc).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
