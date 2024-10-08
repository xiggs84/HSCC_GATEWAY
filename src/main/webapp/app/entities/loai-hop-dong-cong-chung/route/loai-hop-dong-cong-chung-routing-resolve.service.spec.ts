import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ILoaiHopDongCongChung } from '../loai-hop-dong-cong-chung.model';
import { LoaiHopDongCongChungService } from '../service/loai-hop-dong-cong-chung.service';

import loaiHopDongCongChungResolve from './loai-hop-dong-cong-chung-routing-resolve.service';

describe('LoaiHopDongCongChung routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: LoaiHopDongCongChungService;
  let resultLoaiHopDongCongChung: ILoaiHopDongCongChung | null | undefined;

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
    service = TestBed.inject(LoaiHopDongCongChungService);
    resultLoaiHopDongCongChung = undefined;
  });

  describe('resolve', () => {
    it('should return ILoaiHopDongCongChung returned by find', () => {
      // GIVEN
      service.find = jest.fn(idLoaiHopDongCongChung => of(new HttpResponse({ body: { idLoaiHopDongCongChung } })));
      mockActivatedRouteSnapshot.params = { idLoaiHopDongCongChung: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        loaiHopDongCongChungResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLoaiHopDongCongChung = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultLoaiHopDongCongChung).toEqual({ idLoaiHopDongCongChung: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        loaiHopDongCongChungResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLoaiHopDongCongChung = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLoaiHopDongCongChung).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ILoaiHopDongCongChung>({ body: null })));
      mockActivatedRouteSnapshot.params = { idLoaiHopDongCongChung: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        loaiHopDongCongChungResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLoaiHopDongCongChung = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultLoaiHopDongCongChung).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
