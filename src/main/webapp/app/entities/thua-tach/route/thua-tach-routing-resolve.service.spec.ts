import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IThuaTach } from '../thua-tach.model';
import { ThuaTachService } from '../service/thua-tach.service';

import thuaTachResolve from './thua-tach-routing-resolve.service';

describe('ThuaTach routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: ThuaTachService;
  let resultThuaTach: IThuaTach | null | undefined;

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
    service = TestBed.inject(ThuaTachService);
    resultThuaTach = undefined;
  });

  describe('resolve', () => {
    it('should return IThuaTach returned by find', () => {
      // GIVEN
      service.find = jest.fn(idThuaTach => of(new HttpResponse({ body: { idThuaTach } })));
      mockActivatedRouteSnapshot.params = { idThuaTach: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        thuaTachResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultThuaTach = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultThuaTach).toEqual({ idThuaTach: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        thuaTachResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultThuaTach = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultThuaTach).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IThuaTach>({ body: null })));
      mockActivatedRouteSnapshot.params = { idThuaTach: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        thuaTachResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultThuaTach = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultThuaTach).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
