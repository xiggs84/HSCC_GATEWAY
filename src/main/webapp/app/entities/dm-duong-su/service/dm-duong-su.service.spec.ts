import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDmDuongSu } from '../dm-duong-su.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../dm-duong-su.test-samples';

import { DmDuongSuService, RestDmDuongSu } from './dm-duong-su.service';

const requireRestSample: RestDmDuongSu = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('DmDuongSu Service', () => {
  let service: DmDuongSuService;
  let httpMock: HttpTestingController;
  let expectedResult: IDmDuongSu | IDmDuongSu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DmDuongSuService);
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

    it('should create a DmDuongSu', () => {
      const dmDuongSu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dmDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DmDuongSu', () => {
      const dmDuongSu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dmDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DmDuongSu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DmDuongSu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DmDuongSu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDmDuongSuToCollectionIfMissing', () => {
      it('should add a DmDuongSu to an empty array', () => {
        const dmDuongSu: IDmDuongSu = sampleWithRequiredData;
        expectedResult = service.addDmDuongSuToCollectionIfMissing([], dmDuongSu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmDuongSu);
      });

      it('should not add a DmDuongSu to an array that contains it', () => {
        const dmDuongSu: IDmDuongSu = sampleWithRequiredData;
        const dmDuongSuCollection: IDmDuongSu[] = [
          {
            ...dmDuongSu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDmDuongSuToCollectionIfMissing(dmDuongSuCollection, dmDuongSu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DmDuongSu to an array that doesn't contain it", () => {
        const dmDuongSu: IDmDuongSu = sampleWithRequiredData;
        const dmDuongSuCollection: IDmDuongSu[] = [sampleWithPartialData];
        expectedResult = service.addDmDuongSuToCollectionIfMissing(dmDuongSuCollection, dmDuongSu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmDuongSu);
      });

      it('should add only unique DmDuongSu to an array', () => {
        const dmDuongSuArray: IDmDuongSu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dmDuongSuCollection: IDmDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addDmDuongSuToCollectionIfMissing(dmDuongSuCollection, ...dmDuongSuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dmDuongSu: IDmDuongSu = sampleWithRequiredData;
        const dmDuongSu2: IDmDuongSu = sampleWithPartialData;
        expectedResult = service.addDmDuongSuToCollectionIfMissing([], dmDuongSu, dmDuongSu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmDuongSu);
        expect(expectedResult).toContain(dmDuongSu2);
      });

      it('should accept null and undefined values', () => {
        const dmDuongSu: IDmDuongSu = sampleWithRequiredData;
        expectedResult = service.addDmDuongSuToCollectionIfMissing([], null, dmDuongSu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmDuongSu);
      });

      it('should return initial array if no DmDuongSu is added', () => {
        const dmDuongSuCollection: IDmDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addDmDuongSuToCollectionIfMissing(dmDuongSuCollection, undefined, null);
        expect(expectedResult).toEqual(dmDuongSuCollection);
      });
    });

    describe('compareDmDuongSu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDmDuongSu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { idDuongSu: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDmDuongSu(entity1, entity2);
        const compareResult2 = service.compareDmDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { idDuongSu: 123 };
        const entity2 = { idDuongSu: 456 };

        const compareResult1 = service.compareDmDuongSu(entity1, entity2);
        const compareResult2 = service.compareDmDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { idDuongSu: 123 };
        const entity2 = { idDuongSu: 123 };

        const compareResult1 = service.compareDmDuongSu(entity1, entity2);
        const compareResult2 = service.compareDmDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
