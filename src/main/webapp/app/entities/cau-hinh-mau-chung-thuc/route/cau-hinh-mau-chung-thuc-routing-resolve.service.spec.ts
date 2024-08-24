import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ICauHinhMauChungThuc } from '../cau-hinh-mau-chung-thuc.model';
import { CauHinhMauChungThucService } from '../service/cau-hinh-mau-chung-thuc.service';

import cauHinhMauChungThucResolve from './cau-hinh-mau-chung-thuc-routing-resolve.service';

describe('CauHinhMauChungThuc routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: CauHinhMauChungThucService;
  let resultCauHinhMauChungThuc: ICauHinhMauChungThuc | null | undefined;

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
    service = TestBed.inject(CauHinhMauChungThucService);
    resultCauHinhMauChungThuc = undefined;
  });

  describe('resolve', () => {
    it('should return ICauHinhMauChungThuc returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhMauChungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhMauChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhMauChungThuc).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhMauChungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhMauChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCauHinhMauChungThuc).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICauHinhMauChungThuc>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhMauChungThucResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhMauChungThuc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhMauChungThuc).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
