import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { DanhSachHopDongService } from '../service/danh-sach-hop-dong.service';

import danhSachHopDongResolve from './danh-sach-hop-dong-routing-resolve.service';

describe('DanhSachHopDong routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhSachHopDongService;
  let resultDanhSachHopDong: IDanhSachHopDong | null | undefined;

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
    service = TestBed.inject(DanhSachHopDongService);
    resultDanhSachHopDong = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhSachHopDong returned by find', () => {
      // GIVEN
      service.find = jest.fn(idHopDong => of(new HttpResponse({ body: { idHopDong } })));
      mockActivatedRouteSnapshot.params = { idHopDong: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhSachHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhSachHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhSachHopDong).toEqual({ idHopDong: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhSachHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhSachHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhSachHopDong).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhSachHopDong>({ body: null })));
      mockActivatedRouteSnapshot.params = { idHopDong: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhSachHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhSachHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhSachHopDong).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
