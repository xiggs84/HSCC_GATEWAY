import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDmLoaiHd } from '../dm-loai-hd.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../dm-loai-hd.test-samples';

import { DmLoaiHdService, RestDmLoaiHd } from './dm-loai-hd.service';

const requireRestSample: RestDmLoaiHd = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('DmLoaiHd Service', () => {
  let service: DmLoaiHdService;
  let httpMock: HttpTestingController;
  let expectedResult: IDmLoaiHd | IDmLoaiHd[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DmLoaiHdService);
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

    it('should create a DmLoaiHd', () => {
      const dmLoaiHd = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dmLoaiHd).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DmLoaiHd', () => {
      const dmLoaiHd = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dmLoaiHd).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DmLoaiHd', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DmLoaiHd', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DmLoaiHd', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDmLoaiHdToCollectionIfMissing', () => {
      it('should add a DmLoaiHd to an empty array', () => {
        const dmLoaiHd: IDmLoaiHd = sampleWithRequiredData;
        expectedResult = service.addDmLoaiHdToCollectionIfMissing([], dmLoaiHd);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmLoaiHd);
      });

      it('should not add a DmLoaiHd to an array that contains it', () => {
        const dmLoaiHd: IDmLoaiHd = sampleWithRequiredData;
        const dmLoaiHdCollection: IDmLoaiHd[] = [
          {
            ...dmLoaiHd,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDmLoaiHdToCollectionIfMissing(dmLoaiHdCollection, dmLoaiHd);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DmLoaiHd to an array that doesn't contain it", () => {
        const dmLoaiHd: IDmLoaiHd = sampleWithRequiredData;
        const dmLoaiHdCollection: IDmLoaiHd[] = [sampleWithPartialData];
        expectedResult = service.addDmLoaiHdToCollectionIfMissing(dmLoaiHdCollection, dmLoaiHd);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmLoaiHd);
      });

      it('should add only unique DmLoaiHd to an array', () => {
        const dmLoaiHdArray: IDmLoaiHd[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dmLoaiHdCollection: IDmLoaiHd[] = [sampleWithRequiredData];
        expectedResult = service.addDmLoaiHdToCollectionIfMissing(dmLoaiHdCollection, ...dmLoaiHdArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dmLoaiHd: IDmLoaiHd = sampleWithRequiredData;
        const dmLoaiHd2: IDmLoaiHd = sampleWithPartialData;
        expectedResult = service.addDmLoaiHdToCollectionIfMissing([], dmLoaiHd, dmLoaiHd2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dmLoaiHd);
        expect(expectedResult).toContain(dmLoaiHd2);
      });

      it('should accept null and undefined values', () => {
        const dmLoaiHd: IDmLoaiHd = sampleWithRequiredData;
        expectedResult = service.addDmLoaiHdToCollectionIfMissing([], null, dmLoaiHd, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dmLoaiHd);
      });

      it('should return initial array if no DmLoaiHd is added', () => {
        const dmLoaiHdCollection: IDmLoaiHd[] = [sampleWithRequiredData];
        expectedResult = service.addDmLoaiHdToCollectionIfMissing(dmLoaiHdCollection, undefined, null);
        expect(expectedResult).toEqual(dmLoaiHdCollection);
      });
    });

    describe('compareDmLoaiHd', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDmLoaiHd(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { idLoaiHd: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareDmLoaiHd(entity1, entity2);
        const compareResult2 = service.compareDmLoaiHd(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { idLoaiHd: 'ABC' };
        const entity2 = { idLoaiHd: 'CBA' };

        const compareResult1 = service.compareDmLoaiHd(entity1, entity2);
        const compareResult2 = service.compareDmLoaiHd(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { idLoaiHd: 'ABC' };
        const entity2 = { idLoaiHd: 'ABC' };

        const compareResult1 = service.compareDmLoaiHd(entity1, entity2);
        const compareResult2 = service.compareDmLoaiHd(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
