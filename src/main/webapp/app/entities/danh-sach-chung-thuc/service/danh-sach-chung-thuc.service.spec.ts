import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDanhSachChungThuc } from '../danh-sach-chung-thuc.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../danh-sach-chung-thuc.test-samples';

import { DanhSachChungThucService, RestDanhSachChungThuc } from './danh-sach-chung-thuc.service';

const requireRestSample: RestDanhSachChungThuc = {
  ...sampleWithRequiredData,
  ngayChungThuc: sampleWithRequiredData.ngayChungThuc?.format(DATE_FORMAT),
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('DanhSachChungThuc Service', () => {
  let service: DanhSachChungThucService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhSachChungThuc | IDanhSachChungThuc[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhSachChungThucService);
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

    it('should create a DanhSachChungThuc', () => {
      const danhSachChungThuc = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhSachChungThuc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhSachChungThuc', () => {
      const danhSachChungThuc = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhSachChungThuc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhSachChungThuc', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhSachChungThuc', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhSachChungThuc', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhSachChungThucToCollectionIfMissing', () => {
      it('should add a DanhSachChungThuc to an empty array', () => {
        const danhSachChungThuc: IDanhSachChungThuc = sampleWithRequiredData;
        expectedResult = service.addDanhSachChungThucToCollectionIfMissing([], danhSachChungThuc);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhSachChungThuc);
      });

      it('should not add a DanhSachChungThuc to an array that contains it', () => {
        const danhSachChungThuc: IDanhSachChungThuc = sampleWithRequiredData;
        const danhSachChungThucCollection: IDanhSachChungThuc[] = [
          {
            ...danhSachChungThuc,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhSachChungThucToCollectionIfMissing(danhSachChungThucCollection, danhSachChungThuc);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhSachChungThuc to an array that doesn't contain it", () => {
        const danhSachChungThuc: IDanhSachChungThuc = sampleWithRequiredData;
        const danhSachChungThucCollection: IDanhSachChungThuc[] = [sampleWithPartialData];
        expectedResult = service.addDanhSachChungThucToCollectionIfMissing(danhSachChungThucCollection, danhSachChungThuc);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhSachChungThuc);
      });

      it('should add only unique DanhSachChungThuc to an array', () => {
        const danhSachChungThucArray: IDanhSachChungThuc[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhSachChungThucCollection: IDanhSachChungThuc[] = [sampleWithRequiredData];
        expectedResult = service.addDanhSachChungThucToCollectionIfMissing(danhSachChungThucCollection, ...danhSachChungThucArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhSachChungThuc: IDanhSachChungThuc = sampleWithRequiredData;
        const danhSachChungThuc2: IDanhSachChungThuc = sampleWithPartialData;
        expectedResult = service.addDanhSachChungThucToCollectionIfMissing([], danhSachChungThuc, danhSachChungThuc2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhSachChungThuc);
        expect(expectedResult).toContain(danhSachChungThuc2);
      });

      it('should accept null and undefined values', () => {
        const danhSachChungThuc: IDanhSachChungThuc = sampleWithRequiredData;
        expectedResult = service.addDanhSachChungThucToCollectionIfMissing([], null, danhSachChungThuc, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhSachChungThuc);
      });

      it('should return initial array if no DanhSachChungThuc is added', () => {
        const danhSachChungThucCollection: IDanhSachChungThuc[] = [sampleWithRequiredData];
        expectedResult = service.addDanhSachChungThucToCollectionIfMissing(danhSachChungThucCollection, undefined, null);
        expect(expectedResult).toEqual(danhSachChungThucCollection);
      });
    });

    describe('compareDanhSachChungThuc', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhSachChungThuc(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { idChungThuc: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareDanhSachChungThuc(entity1, entity2);
        const compareResult2 = service.compareDanhSachChungThuc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { idChungThuc: 'ABC' };
        const entity2 = { idChungThuc: 'CBA' };

        const compareResult1 = service.compareDanhSachChungThuc(entity1, entity2);
        const compareResult2 = service.compareDanhSachChungThuc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { idChungThuc: 'ABC' };
        const entity2 = { idChungThuc: 'ABC' };

        const compareResult1 = service.compareDanhSachChungThuc(entity1, entity2);
        const compareResult2 = service.compareDanhSachChungThuc(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
