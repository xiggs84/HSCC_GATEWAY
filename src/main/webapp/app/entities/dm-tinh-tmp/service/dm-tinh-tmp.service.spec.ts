import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDmTinhTmp } from '../dm-tinh-tmp.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../dm-tinh-tmp.test-samples';

import { DmTinhTmpService } from './dm-tinh-tmp.service';

const requireRestSample: IDmTinhTmp = {
  ...sampleWithRequiredData,
};

describe('DmTinhTmp Service', () => {
  let service: DmTinhTmpService;
  let httpMock: HttpTestingController;
  let expectedResult: IDmTinhTmp | IDmTinhTmp[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DmTinhTmpService);
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

    it('should create a DmTinhTmp', () => {
      const dmTinhTmp = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dmTinhTmp).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DmTinhTmp', () => {
      const dmTinhTmp = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dmTinhTmp).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DmTinhTmp', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DmTinhTmp', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DmTinhTmp', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDmTinhTmpToCollectionIfMissing', () => {
      it('should add a DmTinhTmp to an empty array', () => {
        const dmTinhTmp: IDmTinhTmp = sampleWithRequiredData;
        expectedResult = service.addDmTinhTmpToCollectionIfMissing([], dmTinhTmp);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmTinhTmp);
      });

      it('should not add a DmTinhTmp to an array that contains it', () => {
        const dmTinhTmp: IDmTinhTmp = sampleWithRequiredData;
        const dmTinhTmpCollection: IDmTinhTmp[] = [
          {
            ...dmTinhTmp,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDmTinhTmpToCollectionIfMissing(dmTinhTmpCollection, dmTinhTmp);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DmTinhTmp to an array that doesn't contain it", () => {
        const dmTinhTmp: IDmTinhTmp = sampleWithRequiredData;
        const dmTinhTmpCollection: IDmTinhTmp[] = [sampleWithPartialData];
        expectedResult = service.addDmTinhTmpToCollectionIfMissing(dmTinhTmpCollection, dmTinhTmp);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmTinhTmp);
      });

      it('should add only unique DmTinhTmp to an array', () => {
        const dmTinhTmpArray: IDmTinhTmp[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dmTinhTmpCollection: IDmTinhTmp[] = [sampleWithRequiredData];
        expectedResult = service.addDmTinhTmpToCollectionIfMissing(dmTinhTmpCollection, ...dmTinhTmpArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dmTinhTmp: IDmTinhTmp = sampleWithRequiredData;
        const dmTinhTmp2: IDmTinhTmp = sampleWithPartialData;
        expectedResult = service.addDmTinhTmpToCollectionIfMissing([], dmTinhTmp, dmTinhTmp2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmTinhTmp);
        expect(expectedResult).toContain(dmTinhTmp2);
      });

      it('should accept null and undefined values', () => {
        const dmTinhTmp: IDmTinhTmp = sampleWithRequiredData;
        expectedResult = service.addDmTinhTmpToCollectionIfMissing([], null, dmTinhTmp, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmTinhTmp);
      });

      it('should return initial array if no DmTinhTmp is added', () => {
        const dmTinhTmpCollection: IDmTinhTmp[] = [sampleWithRequiredData];
        expectedResult = service.addDmTinhTmpToCollectionIfMissing(dmTinhTmpCollection, undefined, null);
        expect(expectedResult).toEqual(dmTinhTmpCollection);
      });
    });

    describe('compareDmTinhTmp', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDmTinhTmp(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDmTinhTmp(entity1, entity2);
        const compareResult2 = service.compareDmTinhTmp(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDmTinhTmp(entity1, entity2);
        const compareResult2 = service.compareDmTinhTmp(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDmTinhTmp(entity1, entity2);
        const compareResult2 = service.compareDmTinhTmp(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
