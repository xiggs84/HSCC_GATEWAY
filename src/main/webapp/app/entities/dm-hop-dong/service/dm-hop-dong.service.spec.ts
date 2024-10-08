import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDmHopDong } from '../dm-hop-dong.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../dm-hop-dong.test-samples';

import { DmHopDongService, RestDmHopDong } from './dm-hop-dong.service';

const requireRestSample: RestDmHopDong = {
  ...sampleWithRequiredData,
  ngayLapHd: sampleWithRequiredData.ngayLapHd?.format(DATE_FORMAT),
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayHen: sampleWithRequiredData.ngayHen?.format(DATE_FORMAT),
  ngayKyHd: sampleWithRequiredData.ngayKyHd?.format(DATE_FORMAT),
  ngayRutTrich: sampleWithRequiredData.ngayRutTrich?.format(DATE_FORMAT),
  ngayThaoTacRutTrich: sampleWithRequiredData.ngayThaoTacRutTrich?.format(DATE_FORMAT),
};

describe('DmHopDong Service', () => {
  let service: DmHopDongService;
  let httpMock: HttpTestingController;
  let expectedResult: IDmHopDong | IDmHopDong[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DmHopDongService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a DmHopDong', () => {
      const dmHopDong = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dmHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DmHopDong', () => {
      const dmHopDong = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dmHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DmHopDong', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DmHopDong', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DmHopDong', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDmHopDongToCollectionIfMissing', () => {
      it('should add a DmHopDong to an empty array', () => {
        const dmHopDong: IDmHopDong = sampleWithRequiredData;
        expectedResult = service.addDmHopDongToCollectionIfMissing([], dmHopDong);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmHopDong);
      });

      it('should not add a DmHopDong to an array that contains it', () => {
        const dmHopDong: IDmHopDong = sampleWithRequiredData;
        const dmHopDongCollection: IDmHopDong[] = [
          {
            ...dmHopDong,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDmHopDongToCollectionIfMissing(dmHopDongCollection, dmHopDong);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DmHopDong to an array that doesn't contain it", () => {
        const dmHopDong: IDmHopDong = sampleWithRequiredData;
        const dmHopDongCollection: IDmHopDong[] = [sampleWithPartialData];
        expectedResult = service.addDmHopDongToCollectionIfMissing(dmHopDongCollection, dmHopDong);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmHopDong);
      });

      it('should add only unique DmHopDong to an array', () => {
        const dmHopDongArray: IDmHopDong[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dmHopDongCollection: IDmHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addDmHopDongToCollectionIfMissing(dmHopDongCollection, ...dmHopDongArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dmHopDong: IDmHopDong = sampleWithRequiredData;
        const dmHopDong2: IDmHopDong = sampleWithPartialData;
        expectedResult = service.addDmHopDongToCollectionIfMissing([], dmHopDong, dmHopDong2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmHopDong);
        expect(expectedResult).toContain(dmHopDong2);
      });

      it('should accept null and undefined values', () => {
        const dmHopDong: IDmHopDong = sampleWithRequiredData;
        expectedResult = service.addDmHopDongToCollectionIfMissing([], null, dmHopDong, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmHopDong);
      });

      it('should return initial array if no DmHopDong is added', () => {
        const dmHopDongCollection: IDmHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addDmHopDongToCollectionIfMissing(dmHopDongCollection, undefined, null);
        expect(expectedResult).toEqual(dmHopDongCollection);
      });
    });

    describe('compareDmHopDong', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDmHopDong(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { idHopDong: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareDmHopDong(entity1, entity2);
        const compareResult2 = service.compareDmHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { idHopDong: 'ABC' };
        const entity2 = { idHopDong: 'CBA' };

        const compareResult1 = service.compareDmHopDong(entity1, entity2);
        const compareResult2 = service.compareDmHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { idHopDong: 'ABC' };
        const entity2 = { idHopDong: 'ABC' };

        const compareResult1 = service.compareDmHopDong(entity1, entity2);
        const compareResult2 = service.compareDmHopDong(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
