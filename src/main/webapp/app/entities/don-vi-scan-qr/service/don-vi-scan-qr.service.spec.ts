import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDonViScanQr } from '../don-vi-scan-qr.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../don-vi-scan-qr.test-samples';

import { DonViScanQrService, RestDonViScanQr } from './don-vi-scan-qr.service';

const requireRestSample: RestDonViScanQr = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('DonViScanQr Service', () => {
  let service: DonViScanQrService;
  let httpMock: HttpTestingController;
  let expectedResult: IDonViScanQr | IDonViScanQr[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DonViScanQrService);
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

    it('should create a DonViScanQr', () => {
      const donViScanQr = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(donViScanQr).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DonViScanQr', () => {
      const donViScanQr = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(donViScanQr).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DonViScanQr', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DonViScanQr', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DonViScanQr', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDonViScanQrToCollectionIfMissing', () => {
      it('should add a DonViScanQr to an empty array', () => {
        const donViScanQr: IDonViScanQr = sampleWithRequiredData;
        expectedResult = service.addDonViScanQrToCollectionIfMissing([], donViScanQr);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(donViScanQr);
      });

      it('should not add a DonViScanQr to an array that contains it', () => {
        const donViScanQr: IDonViScanQr = sampleWithRequiredData;
        const donViScanQrCollection: IDonViScanQr[] = [
          {
            ...donViScanQr,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDonViScanQrToCollectionIfMissing(donViScanQrCollection, donViScanQr);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DonViScanQr to an array that doesn't contain it", () => {
        const donViScanQr: IDonViScanQr = sampleWithRequiredData;
        const donViScanQrCollection: IDonViScanQr[] = [sampleWithPartialData];
        expectedResult = service.addDonViScanQrToCollectionIfMissing(donViScanQrCollection, donViScanQr);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(donViScanQr);
      });

      it('should add only unique DonViScanQr to an array', () => {
        const donViScanQrArray: IDonViScanQr[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const donViScanQrCollection: IDonViScanQr[] = [sampleWithRequiredData];
        expectedResult = service.addDonViScanQrToCollectionIfMissing(donViScanQrCollection, ...donViScanQrArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const donViScanQr: IDonViScanQr = sampleWithRequiredData;
        const donViScanQr2: IDonViScanQr = sampleWithPartialData;
        expectedResult = service.addDonViScanQrToCollectionIfMissing([], donViScanQr, donViScanQr2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(donViScanQr);
        expect(expectedResult).toContain(donViScanQr2);
      });

      it('should accept null and undefined values', () => {
        const donViScanQr: IDonViScanQr = sampleWithRequiredData;
        expectedResult = service.addDonViScanQrToCollectionIfMissing([], null, donViScanQr, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(donViScanQr);
      });

      it('should return initial array if no DonViScanQr is added', () => {
        const donViScanQrCollection: IDonViScanQr[] = [sampleWithRequiredData];
        expectedResult = service.addDonViScanQrToCollectionIfMissing(donViScanQrCollection, undefined, null);
        expect(expectedResult).toEqual(donViScanQrCollection);
      });
    });

    describe('compareDonViScanQr', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDonViScanQr(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDonViScanQr(entity1, entity2);
        const compareResult2 = service.compareDonViScanQr(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDonViScanQr(entity1, entity2);
        const compareResult2 = service.compareDonViScanQr(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDonViScanQr(entity1, entity2);
        const compareResult2 = service.compareDonViScanQr(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
