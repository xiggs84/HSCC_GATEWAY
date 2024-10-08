import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDmHopDong } from '../dm-hop-dong.model';
import { DmHopDongService } from '../service/dm-hop-dong.service';

import dmHopDongResolve from './dm-hop-dong-routing-resolve.service';

describe('DmHopDong routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DmHopDongService;
  let resultDmHopDong: IDmHopDong | null | undefined;

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
    service = TestBed.inject(DmHopDongService);
    resultDmHopDong = undefined;
  });

  describe('resolve', () => {
    it('should return IDmHopDong returned by find', () => {
      // GIVEN
      service.find = jest.fn(idHopDong => of(new HttpResponse({ body: { idHopDong } })));
      mockActivatedRouteSnapshot.params = { idHopDong: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        dmHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDmHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDmHopDong).toEqual({ idHopDong: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        dmHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDmHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDmHopDong).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDmHopDong>({ body: null })));
      mockActivatedRouteSnapshot.params = { idHopDong: 'ABC' };

      // WHEN
      TestBed.runInInjectionContext(() => {
        dmHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDmHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith('ABC');
      expect(resultDmHopDong).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
