import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';
import { DanhMucNhomHopDongService } from '../service/danh-muc-nhom-hop-dong.service';

import danhMucNhomHopDongResolve from './danh-muc-nhom-hop-dong-routing-resolve.service';

describe('DanhMucNhomHopDong routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucNhomHopDongService;
  let resultDanhMucNhomHopDong: IDanhMucNhomHopDong | null | undefined;

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
    service = TestBed.inject(DanhMucNhomHopDongService);
    resultDanhMucNhomHopDong = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucNhomHopDong returned by find', () => {
      // GIVEN
      service.find = jest.fn(idNhom => of(new HttpResponse({ body: { idNhom } })));
      mockActivatedRouteSnapshot.params = { idNhom: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucNhomHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucNhomHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucNhomHopDong).toEqual({ idNhom: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucNhomHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucNhomHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucNhomHopDong).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucNhomHopDong>({ body: null })));
      mockActivatedRouteSnapshot.params = { idNhom: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucNhomHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucNhomHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucNhomHopDong).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
