import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';
import { DuongSuTrungCmndBakService } from '../service/duong-su-trung-cmnd-bak.service';

import duongSuTrungCmndBakResolve from './duong-su-trung-cmnd-bak-routing-resolve.service';

describe('DuongSuTrungCmndBak routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DuongSuTrungCmndBakService;
  let resultDuongSuTrungCmndBak: IDuongSuTrungCmndBak | null | undefined;

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
    service = TestBed.inject(DuongSuTrungCmndBakService);
    resultDuongSuTrungCmndBak = undefined;
  });

  describe('resolve', () => {
    it('should return IDuongSuTrungCmndBak returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        duongSuTrungCmndBakResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDuongSuTrungCmndBak = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDuongSuTrungCmndBak).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        duongSuTrungCmndBakResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDuongSuTrungCmndBak = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDuongSuTrungCmndBak).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDuongSuTrungCmndBak>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        duongSuTrungCmndBakResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDuongSuTrungCmndBak = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDuongSuTrungCmndBak).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
