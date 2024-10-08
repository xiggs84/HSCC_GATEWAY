import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhSachChungThuc } from '../danh-sach-chung-thuc.model';
import { DanhSachChungThucService } from '../service/danh-sach-chung-thuc.service';

import danhSachChungThucResolve from './danh-sach-chung-thuc-routing-resolve.service';

describe('DanhSachChungThuc routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhSachChungThucService;
  let resultDanhSachChungThuc: IDanhSachChungThuc | null | undefined;

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
    service = TestBed.inject(DanhSachChungThucService);
    resultDanhSachChungThuc = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhSachChungThuc returned by find', () => {
      // GIVEN
      service.find = jest.fn(idChungThuc => of(new HttpResponse({ body: { idChungThuc } })));
      mockActivatedRouteSnapshot.params = { idChungThuc: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhSachChungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhSachChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhSachChungThuc).toEqual({ idChungThuc: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhSachChungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhSachChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhSachChungThuc).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhSachChungThuc>({ body: null })));
      mockActivatedRouteSnapshot.params = { idChungThuc: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhSachChungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhSachChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhSachChungThuc).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
