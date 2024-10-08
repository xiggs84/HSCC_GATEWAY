import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IChungThuc } from '../chung-thuc.model';
import { ChungThucService } from '../service/chung-thuc.service';

import chungThucResolve from './chung-thuc-routing-resolve.service';

describe('ChungThuc routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: ChungThucService;
  let resultChungThuc: IChungThuc | null | undefined;

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
    service = TestBed.inject(ChungThucService);
    resultChungThuc = undefined;
  });

  describe('resolve', () => {
    it('should return IChungThuc returned by find', () => {
      // GIVEN
      service.find = jest.fn(idChungThuc => of(new HttpResponse({ body: { idChungThuc } })));
      mockActivatedRouteSnapshot.params = { idChungThuc: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        chungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultChungThuc).toEqual({ idChungThuc: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        chungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultChungThuc).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IChungThuc>({ body: null })));
      mockActivatedRouteSnapshot.params = { idChungThuc: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        chungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultChungThuc).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
