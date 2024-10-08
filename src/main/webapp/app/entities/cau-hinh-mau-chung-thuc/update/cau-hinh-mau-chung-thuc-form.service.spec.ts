import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../cau-hinh-mau-chung-thuc.test-samples';

import { CauHinhMauChungThucFormService } from './cau-hinh-mau-chung-thuc-form.service';

describe('CauHinhMauChungThuc Form Service', () => {
  let service: CauHinhMauChungThucFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CauHinhMauChungThucFormService);
  });

  describe('Service methods', () => {
    describe('createCauHinhMauChungThucFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCauHinhMauChungThucFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoai: expect.any(Object),
            dienGiai: expect.any(Object),
            khungGia: expect.any(Object),
            hasBenB: expect.any(Object),
            hasTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            fileChungThuc: expect.any(Object),
            srcChungThuc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDonVi: expect.any(Object),
            idLoaiSo: expect.any(Object),
          }),
        );
      });

      it('passing ICauHinhMauChungThuc should create a new form with FormGroup', () => {
        const formGroup = service.createCauHinhMauChungThucFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoai: expect.any(Object),
            dienGiai: expect.any(Object),
            khungGia: expect.any(Object),
            hasBenB: expect.any(Object),
            hasTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            fileChungThuc: expect.any(Object),
            srcChungThuc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDonVi: expect.any(Object),
            idLoaiSo: expect.any(Object),
          }),
        );
      });
    });

    describe('getCauHinhMauChungThuc', () => {
      it('should return NewCauHinhMauChungThuc for default CauHinhMauChungThuc initial value', () => {
        const formGroup = service.createCauHinhMauChungThucFormGroup(sampleWithNewData);

        const cauHinhMauChungThuc = service.getCauHinhMauChungThuc(formGroup) as any;

        expect(cauHinhMauChungThuc).toMatchObject(sampleWithNewData);
      });

      it('should return NewCauHinhMauChungThuc for empty CauHinhMauChungThuc initial value', () => {
        const formGroup = service.createCauHinhMauChungThucFormGroup();

        const cauHinhMauChungThuc = service.getCauHinhMauChungThuc(formGroup) as any;

        expect(cauHinhMauChungThuc).toMatchObject({});
      });

      it('should return ICauHinhMauChungThuc', () => {
        const formGroup = service.createCauHinhMauChungThucFormGroup(sampleWithRequiredData);

        const cauHinhMauChungThuc = service.getCauHinhMauChungThuc(formGroup) as any;

        expect(cauHinhMauChungThuc).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICauHinhMauChungThuc should not enable id FormControl', () => {
        const formGroup = service.createCauHinhMauChungThucFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCauHinhMauChungThuc should disable id FormControl', () => {
        const formGroup = service.createCauHinhMauChungThucFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
