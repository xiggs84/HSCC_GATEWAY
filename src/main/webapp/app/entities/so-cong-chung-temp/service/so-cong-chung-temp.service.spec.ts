import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ISoCongChungTemp } from '../so-cong-chung-temp.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../so-cong-chung-temp.test-samples';

import { SoCongChungTempService, RestSoCongChungTemp } from './so-cong-chung-temp.service';

const requireRestSample: RestSoCongChungTemp = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('SoCongChungTemp Service', () => {
  let service: SoCongChungTempService;
  let httpMock: HttpTestingController;
  let expectedResult: ISoCongChungTemp | ISoCongChungTemp[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SoCongChungTempService);
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

    it('should create a SoCongChungTemp', () => {
      const soCongChungTemp = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(soCongChungTemp).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SoCongChungTemp', () => {
      const soCongChungTemp = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(soCongChungTemp).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SoCongChungTemp', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SoCongChungTemp', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SoCongChungTemp', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSoCongChungTempToCollectionIfMissing', () => {
      it('should add a SoCongChungTemp to an empty array', () => {
        const soCongChungTemp: ISoCongChungTemp = sampleWithRequiredData;
        expectedResult = service.addSoCongChungTempToCollectionIfMissing([], soCongChungTemp);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soCongChungTemp);
      });

      it('should not add a SoCongChungTemp to an array that contains it', () => {
        const soCongChungTemp: ISoCongChungTemp = sampleWithRequiredData;
        const soCongChungTempCollection: ISoCongChungTemp[] = [
          {
            ...soCongChungTemp,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSoCongChungTempToCollectionIfMissing(soCongChungTempCollection, soCongChungTemp);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SoCongChungTemp to an array that doesn't contain it", () => {
        const soCongChungTemp: ISoCongChungTemp = sampleWithRequiredData;
        const soCongChungTempCollection: ISoCongChungTemp[] = [sampleWithPartialData];
        expectedResult = service.addSoCongChungTempToCollectionIfMissing(soCongChungTempCollection, soCongChungTemp);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soCongChungTemp);
      });

      it('should add only unique SoCongChungTemp to an array', () => {
        const soCongChungTempArray: ISoCongChungTemp[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const soCongChungTempCollection: ISoCongChungTemp[] = [sampleWithRequiredData];
        expectedResult = service.addSoCongChungTempToCollectionIfMissing(soCongChungTempCollection, ...soCongChungTempArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const soCongChungTemp: ISoCongChungTemp = sampleWithRequiredData;
        const soCongChungTemp2: ISoCongChungTemp = sampleWithPartialData;
        expectedResult = service.addSoCongChungTempToCollectionIfMissing([], soCongChungTemp, soCongChungTemp2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soCongChungTemp);
        expect(expectedResult).toContain(soCongChungTemp2);
      });

      it('should accept null and undefined values', () => {
        const soCongChungTemp: ISoCongChungTemp = sampleWithRequiredData;
        expectedResult = service.addSoCongChungTempToCollectionIfMissing([], null, soCongChungTemp, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soCongChungTemp);
      });

      it('should return initial array if no SoCongChungTemp is added', () => {
        const soCongChungTempCollection: ISoCongChungTemp[] = [sampleWithRequiredData];
        expectedResult = service.addSoCongChungTempToCollectionIfMissing(soCongChungTempCollection, undefined, null);
        expect(expectedResult).toEqual(soCongChungTempCollection);
      });
    });

    describe('compareSoCongChungTemp', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSoCongChungTemp(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSoCongChungTemp(entity1, entity2);
        const compareResult2 = service.compareSoCongChungTemp(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSoCongChungTemp(entity1, entity2);
        const compareResult2 = service.compareSoCongChungTemp(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSoCongChungTemp(entity1, entity2);
        const compareResult2 = service.compareSoCongChungTemp(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
