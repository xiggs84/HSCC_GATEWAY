import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../duong-su-trung-cmnd-bak.test-samples';

import { DuongSuTrungCmndBakService, RestDuongSuTrungCmndBak } from './duong-su-trung-cmnd-bak.service';

const requireRestSample: RestDuongSuTrungCmndBak = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('DuongSuTrungCmndBak Service', () => {
  let service: DuongSuTrungCmndBakService;
  let httpMock: HttpTestingController;
  let expectedResult: IDuongSuTrungCmndBak | IDuongSuTrungCmndBak[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DuongSuTrungCmndBakService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a DuongSuTrungCmndBak', () => {
      const duongSuTrungCmndBak = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(duongSuTrungCmndBak).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DuongSuTrungCmndBak', () => {
      const duongSuTrungCmndBak = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(duongSuTrungCmndBak).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DuongSuTrungCmndBak', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DuongSuTrungCmndBak', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DuongSuTrungCmndBak', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDuongSuTrungCmndBakToCollectionIfMissing', () => {
      it('should add a DuongSuTrungCmndBak to an empty array', () => {
        const duongSuTrungCmndBak: IDuongSuTrungCmndBak = sampleWithRequiredData;
        expectedResult = service.addDuongSuTrungCmndBakToCollectionIfMissing([], duongSuTrungCmndBak);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(duongSuTrungCmndBak);
      });

      it('should not add a DuongSuTrungCmndBak to an array that contains it', () => {
        const duongSuTrungCmndBak: IDuongSuTrungCmndBak = sampleWithRequiredData;
        const duongSuTrungCmndBakCollection: IDuongSuTrungCmndBak[] = [
          {
            ...duongSuTrungCmndBak,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDuongSuTrungCmndBakToCollectionIfMissing(duongSuTrungCmndBakCollection, duongSuTrungCmndBak);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DuongSuTrungCmndBak to an array that doesn't contain it", () => {
        const duongSuTrungCmndBak: IDuongSuTrungCmndBak = sampleWithRequiredData;
        const duongSuTrungCmndBakCollection: IDuongSuTrungCmndBak[] = [sampleWithPartialData];
        expectedResult = service.addDuongSuTrungCmndBakToCollectionIfMissing(duongSuTrungCmndBakCollection, duongSuTrungCmndBak);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(duongSuTrungCmndBak);
      });

      it('should add only unique DuongSuTrungCmndBak to an array', () => {
        const duongSuTrungCmndBakArray: IDuongSuTrungCmndBak[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const duongSuTrungCmndBakCollection: IDuongSuTrungCmndBak[] = [sampleWithRequiredData];
        expectedResult = service.addDuongSuTrungCmndBakToCollectionIfMissing(duongSuTrungCmndBakCollection, ...duongSuTrungCmndBakArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const duongSuTrungCmndBak: IDuongSuTrungCmndBak = sampleWithRequiredData;
        const duongSuTrungCmndBak2: IDuongSuTrungCmndBak = sampleWithPartialData;
        expectedResult = service.addDuongSuTrungCmndBakToCollectionIfMissing([], duongSuTrungCmndBak, duongSuTrungCmndBak2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(duongSuTrungCmndBak);
        expect(expectedResult).toContain(duongSuTrungCmndBak2);
      });

      it('should accept null and undefined values', () => {
        const duongSuTrungCmndBak: IDuongSuTrungCmndBak = sampleWithRequiredData;
        expectedResult = service.addDuongSuTrungCmndBakToCollectionIfMissing([], null, duongSuTrungCmndBak, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(duongSuTrungCmndBak);
      });

      it('should return initial array if no DuongSuTrungCmndBak is added', () => {
        const duongSuTrungCmndBakCollection: IDuongSuTrungCmndBak[] = [sampleWithRequiredData];
        expectedResult = service.addDuongSuTrungCmndBakToCollectionIfMissing(duongSuTrungCmndBakCollection, undefined, null);
        expect(expectedResult).toEqual(duongSuTrungCmndBakCollection);
      });
    });

    describe('compareDuongSuTrungCmndBak', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDuongSuTrungCmndBak(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDuongSuTrungCmndBak(entity1, entity2);
        const compareResult2 = service.compareDuongSuTrungCmndBak(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDuongSuTrungCmndBak(entity1, entity2);
        const compareResult2 = service.compareDuongSuTrungCmndBak(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDuongSuTrungCmndBak(entity1, entity2);
        const compareResult2 = service.compareDuongSuTrungCmndBak(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
