import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-loai-giay-to-chung-thuc.test-samples';

import { DanhMucLoaiGiayToChungThucService } from './danh-muc-loai-giay-to-chung-thuc.service';

const requireRestSample: IDanhMucLoaiGiayToChungThuc = {
  ...sampleWithRequiredData,
};

describe('DanhMucLoaiGiayToChungThuc Service', () => {
  let service: DanhMucLoaiGiayToChungThucService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucLoaiGiayToChungThuc | IDanhMucLoaiGiayToChungThuc[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucLoaiGiayToChungThucService);
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

    it('should create a DanhMucLoaiGiayToChungThuc', () => {
      const danhMucLoaiGiayToChungThuc = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucLoaiGiayToChungThuc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucLoaiGiayToChungThuc', () => {
      const danhMucLoaiGiayToChungThuc = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucLoaiGiayToChungThuc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucLoaiGiayToChungThuc', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucLoaiGiayToChungThuc', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucLoaiGiayToChungThuc', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucLoaiGiayToChungThucToCollectionIfMissing', () => {
      it('should add a DanhMucLoaiGiayToChungThuc to an empty array', () => {
        const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiGiayToChungThucToCollectionIfMissing([], danhMucLoaiGiayToChungThuc);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiGiayToChungThuc);
      });

      it('should not add a DanhMucLoaiGiayToChungThuc to an array that contains it', () => {
        const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = sampleWithRequiredData;
        const danhMucLoaiGiayToChungThucCollection: IDanhMucLoaiGiayToChungThuc[] = [
          {
            ...danhMucLoaiGiayToChungThuc,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucLoaiGiayToChungThucToCollectionIfMissing(
          danhMucLoaiGiayToChungThucCollection,
          danhMucLoaiGiayToChungThuc,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucLoaiGiayToChungThuc to an array that doesn't contain it", () => {
        const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = sampleWithRequiredData;
        const danhMucLoaiGiayToChungThucCollection: IDanhMucLoaiGiayToChungThuc[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucLoaiGiayToChungThucToCollectionIfMissing(
          danhMucLoaiGiayToChungThucCollection,
          danhMucLoaiGiayToChungThuc,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiGiayToChungThuc);
      });

      it('should add only unique DanhMucLoaiGiayToChungThuc to an array', () => {
        const danhMucLoaiGiayToChungThucArray: IDanhMucLoaiGiayToChungThuc[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const danhMucLoaiGiayToChungThucCollection: IDanhMucLoaiGiayToChungThuc[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiGiayToChungThucToCollectionIfMissing(
          danhMucLoaiGiayToChungThucCollection,
          ...danhMucLoaiGiayToChungThucArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = sampleWithRequiredData;
        const danhMucLoaiGiayToChungThuc2: IDanhMucLoaiGiayToChungThuc = sampleWithPartialData;
        expectedResult = service.addDanhMucLoaiGiayToChungThucToCollectionIfMissing(
          [],
          danhMucLoaiGiayToChungThuc,
          danhMucLoaiGiayToChungThuc2,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiGiayToChungThuc);
        expect(expectedResult).toContain(danhMucLoaiGiayToChungThuc2);
      });

      it('should accept null and undefined values', () => {
        const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiGiayToChungThucToCollectionIfMissing([], null, danhMucLoaiGiayToChungThuc, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiGiayToChungThuc);
      });

      it('should return initial array if no DanhMucLoaiGiayToChungThuc is added', () => {
        const danhMucLoaiGiayToChungThucCollection: IDanhMucLoaiGiayToChungThuc[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiGiayToChungThucToCollectionIfMissing(danhMucLoaiGiayToChungThucCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucLoaiGiayToChungThucCollection);
      });
    });

    describe('compareDanhMucLoaiGiayToChungThuc', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucLoaiGiayToChungThuc(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucLoaiGiayToChungThuc(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiGiayToChungThuc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucLoaiGiayToChungThuc(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiGiayToChungThuc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucLoaiGiayToChungThuc(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiGiayToChungThuc(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
