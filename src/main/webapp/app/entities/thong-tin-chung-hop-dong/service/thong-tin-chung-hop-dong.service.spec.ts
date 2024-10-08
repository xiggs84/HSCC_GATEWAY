import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../thong-tin-chung-hop-dong.test-samples';

import { RestThongTinChungHopDong, ThongTinChungHopDongService } from './thong-tin-chung-hop-dong.service';

const requireRestSample: RestThongTinChungHopDong = {
  ...sampleWithRequiredData,
  ngayLapHd: sampleWithRequiredData.ngayLapHd?.format(DATE_FORMAT),
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayHen: sampleWithRequiredData.ngayHen?.format(DATE_FORMAT),
  ngayKyHd: sampleWithRequiredData.ngayKyHd?.format(DATE_FORMAT),
  ngayRutTrich: sampleWithRequiredData.ngayRutTrich?.format(DATE_FORMAT),
};

describe('ThongTinChungHopDong Service', () => {
  let service: ThongTinChungHopDongService;
  let httpMock: HttpTestingController;
  let expectedResult: IThongTinChungHopDong | IThongTinChungHopDong[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ThongTinChungHopDongService);
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

    it('should create a ThongTinChungHopDong', () => {
      const thongTinChungHopDong = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(thongTinChungHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ThongTinChungHopDong', () => {
      const thongTinChungHopDong = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(thongTinChungHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ThongTinChungHopDong', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ThongTinChungHopDong', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ThongTinChungHopDong', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addThongTinChungHopDongToCollectionIfMissing', () => {
      it('should add a ThongTinChungHopDong to an empty array', () => {
        const thongTinChungHopDong: IThongTinChungHopDong = sampleWithRequiredData;
        expectedResult = service.addThongTinChungHopDongToCollectionIfMissing([], thongTinChungHopDong);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thongTinChungHopDong);
      });

      it('should not add a ThongTinChungHopDong to an array that contains it', () => {
        const thongTinChungHopDong: IThongTinChungHopDong = sampleWithRequiredData;
        const thongTinChungHopDongCollection: IThongTinChungHopDong[] = [
          {
            ...thongTinChungHopDong,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addThongTinChungHopDongToCollectionIfMissing(thongTinChungHopDongCollection, thongTinChungHopDong);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ThongTinChungHopDong to an array that doesn't contain it", () => {
        const thongTinChungHopDong: IThongTinChungHopDong = sampleWithRequiredData;
        const thongTinChungHopDongCollection: IThongTinChungHopDong[] = [sampleWithPartialData];
        expectedResult = service.addThongTinChungHopDongToCollectionIfMissing(thongTinChungHopDongCollection, thongTinChungHopDong);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thongTinChungHopDong);
      });

      it('should add only unique ThongTinChungHopDong to an array', () => {
        const thongTinChungHopDongArray: IThongTinChungHopDong[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const thongTinChungHopDongCollection: IThongTinChungHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addThongTinChungHopDongToCollectionIfMissing(thongTinChungHopDongCollection, ...thongTinChungHopDongArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const thongTinChungHopDong: IThongTinChungHopDong = sampleWithRequiredData;
        const thongTinChungHopDong2: IThongTinChungHopDong = sampleWithPartialData;
        expectedResult = service.addThongTinChungHopDongToCollectionIfMissing([], thongTinChungHopDong, thongTinChungHopDong2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thongTinChungHopDong);
        expect(expectedResult).toContain(thongTinChungHopDong2);
      });

      it('should accept null and undefined values', () => {
        const thongTinChungHopDong: IThongTinChungHopDong = sampleWithRequiredData;
        expectedResult = service.addThongTinChungHopDongToCollectionIfMissing([], null, thongTinChungHopDong, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thongTinChungHopDong);
      });

      it('should return initial array if no ThongTinChungHopDong is added', () => {
        const thongTinChungHopDongCollection: IThongTinChungHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addThongTinChungHopDongToCollectionIfMissing(thongTinChungHopDongCollection, undefined, null);
        expect(expectedResult).toEqual(thongTinChungHopDongCollection);
      });
    });

    describe('compareThongTinChungHopDong', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareThongTinChungHopDong(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareThongTinChungHopDong(entity1, entity2);
        const compareResult2 = service.compareThongTinChungHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareThongTinChungHopDong(entity1, entity2);
        const compareResult2 = service.compareThongTinChungHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareThongTinChungHopDong(entity1, entity2);
        const compareResult2 = service.compareThongTinChungHopDong(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
