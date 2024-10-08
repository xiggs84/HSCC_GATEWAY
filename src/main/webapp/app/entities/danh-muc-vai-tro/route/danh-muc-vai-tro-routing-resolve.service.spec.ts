import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucVaiTro } from '../danh-muc-vai-tro.model';
import { DanhMucVaiTroService } from '../service/danh-muc-vai-tro.service';

import danhMucVaiTroResolve from './danh-muc-vai-tro-routing-resolve.service';

describe('DanhMucVaiTro routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucVaiTroService;
  let resultDanhMucVaiTro: IDanhMucVaiTro | null | undefined;

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
    service = TestBed.inject(DanhMucVaiTroService);
    resultDanhMucVaiTro = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucVaiTro returned by find', () => {
      // GIVEN
      service.find = jest.fn(idVaiTro => of(new HttpResponse({ body: { idVaiTro } })));
      mockActivatedRouteSnapshot.params = { idVaiTro: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucVaiTroResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucVaiTro = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucVaiTro).toEqual({ idVaiTro: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucVaiTroResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucVaiTro = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucVaiTro).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucVaiTro>({ body: null })));
      mockActivatedRouteSnapshot.params = { idVaiTro: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucVaiTroResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucVaiTro = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDanhMucVaiTro).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
