import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDmTinhTmp } from '../dm-tinh-tmp.model';
import { DmTinhTmpService } from '../service/dm-tinh-tmp.service';

import dmTinhTmpResolve from './dm-tinh-tmp-routing-resolve.service';

describe('DmTinhTmp routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DmTinhTmpService;
  let resultDmTinhTmp: IDmTinhTmp | null | undefined;

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
    service = TestBed.inject(DmTinhTmpService);
    resultDmTinhTmp = undefined;
  });

  describe('resolve', () => {
    it('should return IDmTinhTmp returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        dmTinhTmpResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDmTinhTmp = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDmTinhTmp).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        dmTinhTmpResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDmTinhTmp = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDmTinhTmp).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDmTinhTmp>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        dmTinhTmpResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDmTinhTmp = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDmTinhTmp).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
