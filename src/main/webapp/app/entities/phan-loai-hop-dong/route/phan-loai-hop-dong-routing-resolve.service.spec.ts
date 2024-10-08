import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IPhanLoaiHopDong } from '../phan-loai-hop-dong.model';
import { PhanLoaiHopDongService } from '../service/phan-loai-hop-dong.service';

import phanLoaiHopDongResolve from './phan-loai-hop-dong-routing-resolve.service';

describe('PhanLoaiHopDong routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: PhanLoaiHopDongService;
  let resultPhanLoaiHopDong: IPhanLoaiHopDong | null | undefined;

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
    service = TestBed.inject(PhanLoaiHopDongService);
    resultPhanLoaiHopDong = undefined;
  });

  describe('resolve', () => {
    it('should return IPhanLoaiHopDong returned by find', () => {
      // GIVEN
      service.find = jest.fn(idPhanLoaiHopDong => of(new HttpResponse({ body: { idPhanLoaiHopDong } })));
      mockActivatedRouteSnapshot.params = { idPhanLoaiHopDong: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        phanLoaiHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultPhanLoaiHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultPhanLoaiHopDong).toEqual({ idPhanLoaiHopDong: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        phanLoaiHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultPhanLoaiHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPhanLoaiHopDong).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IPhanLoaiHopDong>({ body: null })));
      mockActivatedRouteSnapshot.params = { idPhanLoaiHopDong: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        phanLoaiHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultPhanLoaiHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultPhanLoaiHopDong).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
