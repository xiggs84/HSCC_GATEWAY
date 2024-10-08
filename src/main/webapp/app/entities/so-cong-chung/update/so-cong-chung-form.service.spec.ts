import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../so-cong-chung.test-samples';

import { SoCongChungFormService } from './so-cong-chung-form.service';

describe('SoCongChung Form Service', () => {
  let service: SoCongChungFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoCongChungFormService);
  });

  describe('Service methods', () => {
    describe('createSoCongChungFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSoCongChungFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idSo: expect.any(Object),
            idDonVi: expect.any(Object),
            tenSo: expect.any(Object),
            giaTri: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            trangThai: expect.any(Object),
            danhMucLoaiSoCongChung: expect.any(Object),
          }),
        );
      });

      it('passing ISoCongChung should create a new form with FormGroup', () => {
        const formGroup = service.createSoCongChungFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idSo: expect.any(Object),
            idDonVi: expect.any(Object),
            tenSo: expect.any(Object),
            giaTri: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            trangThai: expect.any(Object),
            danhMucLoaiSoCongChung: expect.any(Object),
          }),
        );
      });
    });

    describe('getSoCongChung', () => {
      it('should return NewSoCongChung for default SoCongChung initial value', () => {
        const formGroup = service.createSoCongChungFormGroup(sampleWithNewData);

        const soCongChung = service.getSoCongChung(formGroup) as any;

        expect(soCongChung).toMatchObject(sampleWithNewData);
      });

      it('should return NewSoCongChung for empty SoCongChung initial value', () => {
        const formGroup = service.createSoCongChungFormGroup();

        const soCongChung = service.getSoCongChung(formGroup) as any;

        expect(soCongChung).toMatchObject({});
      });

      it('should return ISoCongChung', () => {
        const formGroup = service.createSoCongChungFormGroup(sampleWithRequiredData);

        const soCongChung = service.getSoCongChung(formGroup) as any;

        expect(soCongChung).toMatchObject(sampleWithRequiredData);
      });
    });
  });
});
