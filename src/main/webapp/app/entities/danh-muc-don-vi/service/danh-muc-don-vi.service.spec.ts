import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDanhMucDonVi } from '../danh-muc-don-vi.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../danh-muc-don-vi.test-samples';

import { DanhMucDonViService, RestDanhMucDonVi } from './danh-muc-don-vi.service';

const requireRestSample: RestDanhMucDonVi = {
  ...sampleWithRequiredData,
  ngayKhaiBao: sampleWithRequiredData.ngayKhaiBao?.format(DATE_FORMAT),
};

describe('DanhMucDonVi Service', () => {
  let service: DanhMucDonViService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucDonVi | IDanhMucDonVi[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucDonViService);
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

    it('should create a DanhMucDonVi', () => {
      const danhMucDonVi = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucDonVi).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucDonVi', () => {
      const danhMucDonVi = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucDonVi).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucDonVi', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucDonVi', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucDonVi', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucDonViToCollectionIfMissing', () => {
      it('should add a DanhMucDonVi to an empty array', () => {
        const danhMucDonVi: IDanhMucDonVi = sampleWithRequiredData;
        expectedResult = service.addDanhMucDonViToCollectionIfMissing([], danhMucDonVi);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucDonVi);
      });

      it('should not add a DanhMucDonVi to an array that contains it', () => {
        const danhMucDonVi: IDanhMucDonVi = sampleWithRequiredData;
        const danhMucDonViCollection: IDanhMucDonVi[] = [
          {
            ...danhMucDonVi,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucDonViToCollectionIfMissing(danhMucDonViCollection, danhMucDonVi);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucDonVi to an array that doesn't contain it", () => {
        const danhMucDonVi: IDanhMucDonVi = sampleWithRequiredData;
        const danhMucDonViCollection: IDanhMucDonVi[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucDonViToCollectionIfMissing(danhMucDonViCollection, danhMucDonVi);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucDonVi);
      });

      it('should add only unique DanhMucDonVi to an array', () => {
        const danhMucDonViArray: IDanhMucDonVi[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucDonViCollection: IDanhMucDonVi[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucDonViToCollectionIfMissing(danhMucDonViCollection, ...danhMucDonViArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucDonVi: IDanhMucDonVi = sampleWithRequiredData;
        const danhMucDonVi2: IDanhMucDonVi = sampleWithPartialData;
        expectedResult = service.addDanhMucDonViToCollectionIfMissing([], danhMucDonVi, danhMucDonVi2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucDonVi);
        expect(expectedResult).toContain(danhMucDonVi2);
      });

      it('should accept null and undefined values', () => {
        const danhMucDonVi: IDanhMucDonVi = sampleWithRequiredData;
        expectedResult = service.addDanhMucDonViToCollectionIfMissing([], null, danhMucDonVi, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucDonVi);
      });

      it('should return initial array if no DanhMucDonVi is added', () => {
        const danhMucDonViCollection: IDanhMucDonVi[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucDonViToCollectionIfMissing(danhMucDonViCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucDonViCollection);
      });
    });

    describe('compareDanhMucDonVi', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucDonVi(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { idDonVi: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucDonVi(entity1, entity2);
        const compareResult2 = service.compareDanhMucDonVi(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { idDonVi: 123 };
        const entity2 = { idDonVi: 456 };

        const compareResult1 = service.compareDanhMucDonVi(entity1, entity2);
        const compareResult2 = service.compareDanhMucDonVi(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { idDonVi: 123 };
        const entity2 = { idDonVi: 123 };

        const compareResult1 = service.compareDanhMucDonVi(entity1, entity2);
        const compareResult2 = service.compareDanhMucDonVi(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
