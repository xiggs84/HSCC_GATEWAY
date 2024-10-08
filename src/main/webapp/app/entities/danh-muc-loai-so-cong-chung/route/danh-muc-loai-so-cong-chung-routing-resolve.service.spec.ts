import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';
import { DanhMucLoaiSoCongChungService } from '../service/danh-muc-loai-so-cong-chung.service';

import danhMucLoaiSoCongChungResolve from './danh-muc-loai-so-cong-chung-routing-resolve.service';

describe('DanhMucLoaiSoCongChung routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucLoaiSoCongChungService;
  let resultDanhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung | null | undefined;

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
    service = TestBed.inject(DanhMucLoaiSoCongChungService);
    resultDanhMucLoaiSoCongChung = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucLoaiSoCongChung returned by find', () => {
      // GIVEN
      service.find = jest.fn(idLoai => of(new HttpResponse({ body: { idLoai } })));
      mockActivatedRouteSnapshot.params = { idLoai: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiSoCongChungResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiSoCongChung = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucLoaiSoCongChung).toEqual({ idLoai: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiSoCongChungResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiSoCongChung = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucLoaiSoCongChung).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucLoaiSoCongChung>({ body: null })));
      mockActivatedRouteSnapshot.params = { idLoai: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiSoCongChungResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiSoCongChung = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucLoaiSoCongChung).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
