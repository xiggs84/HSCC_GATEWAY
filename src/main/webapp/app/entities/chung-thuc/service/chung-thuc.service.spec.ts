import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IChungThuc } from '../chung-thuc.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../chung-thuc.test-samples';

import { ChungThucService, RestChungThuc } from './chung-thuc.service';

const requireRestSample: RestChungThuc = {
  ...sampleWithRequiredData,
  ngayChungThuc: sampleWithRequiredData.ngayChungThuc?.format(DATE_FORMAT),
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('ChungThuc Service', () => {
  let service: ChungThucService;
  let httpMock: HttpTestingController;
  let expectedResult: IChungThuc | IChungThuc[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ChungThucService);
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

    it('should create a ChungThuc', () => {
      const chungThuc = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(chungThuc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChungThuc', () => {
      const chungThuc = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(chungThuc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChungThuc', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChungThuc', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ChungThuc', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addChungThucToCollectionIfMissing', () => {
      it('should add a ChungThuc to an empty array', () => {
        const chungThuc: IChungThuc = sampleWithRequiredData;
        expectedResult = service.addChungThucToCollectionIfMissing([], chungThuc);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chungThuc);
      });

      it('should not add a ChungThuc to an array that contains it', () => {
        const chungThuc: IChungThuc = sampleWithRequiredData;
        const chungThucCollection: IChungThuc[] = [
          {
            ...chungThuc,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addChungThucToCollectionIfMissing(chungThucCollection, chungThuc);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChungThuc to an array that doesn't contain it", () => {
        const chungThuc: IChungThuc = sampleWithRequiredData;
        const chungThucCollection: IChungThuc[] = [sampleWithPartialData];
        expectedResult = service.addChungThucToCollectionIfMissing(chungThucCollection, chungThuc);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chungThuc);
      });

      it('should add only unique ChungThuc to an array', () => {
        const chungThucArray: IChungThuc[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const chungThucCollection: IChungThuc[] = [sampleWithRequiredData];
        expectedResult = service.addChungThucToCollectionIfMissing(chungThucCollection, ...chungThucArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chungThuc: IChungThuc = sampleWithRequiredData;
        const chungThuc2: IChungThuc = sampleWithPartialData;
        expectedResult = service.addChungThucToCollectionIfMissing([], chungThuc, chungThuc2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chungThuc);
        expect(expectedResult).toContain(chungThuc2);
      });

      it('should accept null and undefined values', () => {
        const chungThuc: IChungThuc = sampleWithRequiredData;
        expectedResult = service.addChungThucToCollectionIfMissing([], null, chungThuc, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chungThuc);
      });

      it('should return initial array if no ChungThuc is added', () => {
        const chungThucCollection: IChungThuc[] = [sampleWithRequiredData];
        expectedResult = service.addChungThucToCollectionIfMissing(chungThucCollection, undefined, null);
        expect(expectedResult).toEqual(chungThucCollection);
      });
    });

    describe('compareChungThuc', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareChungThuc(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { idChungThuc: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareChungThuc(entity1, entity2);
        const compareResult2 = service.compareChungThuc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { idChungThuc: 'ABC' };
        const entity2 = { idChungThuc: 'CBA' };

        const compareResult1 = service.compareChungThuc(entity1, entity2);
        const compareResult2 = service.compareChungThuc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { idChungThuc: 'ABC' };
        const entity2 = { idChungThuc: 'ABC' };

        const compareResult1 = service.compareChungThuc(entity1, entity2);
        const compareResult2 = service.compareChungThuc(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
