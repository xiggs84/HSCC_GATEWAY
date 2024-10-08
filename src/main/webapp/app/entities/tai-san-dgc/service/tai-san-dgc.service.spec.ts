import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITaiSanDgc } from '../tai-san-dgc.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../tai-san-dgc.test-samples';

import { RestTaiSanDgc, TaiSanDgcService } from './tai-san-dgc.service';

const requireRestSample: RestTaiSanDgc = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayBdNganChan: sampleWithRequiredData.ngayBdNganChan?.format(DATE_FORMAT),
  ngayKtNganChan: sampleWithRequiredData.ngayKtNganChan?.format(DATE_FORMAT),
};

describe('TaiSanDgc Service', () => {
  let service: TaiSanDgcService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaiSanDgc | ITaiSanDgc[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TaiSanDgcService);
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

    it('should create a TaiSanDgc', () => {
      const taiSanDgc = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taiSanDgc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaiSanDgc', () => {
      const taiSanDgc = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taiSanDgc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaiSanDgc', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaiSanDgc', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaiSanDgc', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaiSanDgcToCollectionIfMissing', () => {
      it('should add a TaiSanDgc to an empty array', () => {
        const taiSanDgc: ITaiSanDgc = sampleWithRequiredData;
        expectedResult = service.addTaiSanDgcToCollectionIfMissing([], taiSanDgc);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taiSanDgc);
      });

      it('should not add a TaiSanDgc to an array that contains it', () => {
        const taiSanDgc: ITaiSanDgc = sampleWithRequiredData;
        const taiSanDgcCollection: ITaiSanDgc[] = [
          {
            ...taiSanDgc,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaiSanDgcToCollectionIfMissing(taiSanDgcCollection, taiSanDgc);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaiSanDgc to an array that doesn't contain it", () => {
        const taiSanDgc: ITaiSanDgc = sampleWithRequiredData;
        const taiSanDgcCollection: ITaiSanDgc[] = [sampleWithPartialData];
        expectedResult = service.addTaiSanDgcToCollectionIfMissing(taiSanDgcCollection, taiSanDgc);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taiSanDgc);
      });

      it('should add only unique TaiSanDgc to an array', () => {
        const taiSanDgcArray: ITaiSanDgc[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taiSanDgcCollection: ITaiSanDgc[] = [sampleWithRequiredData];
        expectedResult = service.addTaiSanDgcToCollectionIfMissing(taiSanDgcCollection, ...taiSanDgcArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taiSanDgc: ITaiSanDgc = sampleWithRequiredData;
        const taiSanDgc2: ITaiSanDgc = sampleWithPartialData;
        expectedResult = service.addTaiSanDgcToCollectionIfMissing([], taiSanDgc, taiSanDgc2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taiSanDgc);
        expect(expectedResult).toContain(taiSanDgc2);
      });

      it('should accept null and undefined values', () => {
        const taiSanDgc: ITaiSanDgc = sampleWithRequiredData;
        expectedResult = service.addTaiSanDgcToCollectionIfMissing([], null, taiSanDgc, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taiSanDgc);
      });

      it('should return initial array if no TaiSanDgc is added', () => {
        const taiSanDgcCollection: ITaiSanDgc[] = [sampleWithRequiredData];
        expectedResult = service.addTaiSanDgcToCollectionIfMissing(taiSanDgcCollection, undefined, null);
        expect(expectedResult).toEqual(taiSanDgcCollection);
      });
    });

    describe('compareTaiSanDgc', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaiSanDgc(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaiSanDgc(entity1, entity2);
        const compareResult2 = service.compareTaiSanDgc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaiSanDgc(entity1, entity2);
        const compareResult2 = service.compareTaiSanDgc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaiSanDgc(entity1, entity2);
        const compareResult2 = service.compareTaiSanDgc(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
