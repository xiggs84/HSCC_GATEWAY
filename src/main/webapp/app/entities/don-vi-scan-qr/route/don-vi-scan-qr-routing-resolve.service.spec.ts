import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDonViScanQr } from '../don-vi-scan-qr.model';
import { DonViScanQrService } from '../service/don-vi-scan-qr.service';

import donViScanQrResolve from './don-vi-scan-qr-routing-resolve.service';

describe('DonViScanQr routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DonViScanQrService;
  let resultDonViScanQr: IDonViScanQr | null | undefined;

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
    service = TestBed.inject(DonViScanQrService);
    resultDonViScanQr = undefined;
  });

  describe('resolve', () => {
    it('should return IDonViScanQr returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        donViScanQrResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDonViScanQr = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDonViScanQr).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        donViScanQrResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDonViScanQr = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDonViScanQr).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDonViScanQr>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        donViScanQrResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDonViScanQr = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDonViScanQr).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
