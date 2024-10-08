import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../duong-su.test-samples';

import { DuongSuFormService } from './duong-su-form.service';

describe('DuongSu Form Service', () => {
  let service: DuongSuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuongSuFormService);
  });

  describe('Service methods', () => {
    describe('createDuongSuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDuongSuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idDuongSu: expect.any(Object),
            tenDuongSu: expect.any(Object),
            diaChi: expect.any(Object),
            soDienThoai: expect.any(Object),
            email: expect.any(Object),
            fax: expect.any(Object),
            website: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinDs: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDsGoc: expect.any(Object),
            idMaster: expect.any(Object),
            idDonVi: expect.any(Object),
            strSearch: expect.any(Object),
            soGiayTo: expect.any(Object),
            ghiChu: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
            syncStatus: expect.any(Object),
            loaiDuongSu: expect.any(Object),
            loaiGiayTo: expect.any(Object),
          }),
        );
      });

      it('passing IDuongSu should create a new form with FormGroup', () => {
        const formGroup = service.createDuongSuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idDuongSu: expect.any(Object),
            tenDuongSu: expect.any(Object),
            diaChi: expect.any(Object),
            soDienThoai: expect.any(Object),
            email: expect.any(Object),
            fax: expect.any(Object),
            website: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinDs: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDsGoc: expect.any(Object),
            idMaster: expect.any(Object),
            idDonVi: expect.any(Object),
            strSearch: expect.any(Object),
            soGiayTo: expect.any(Object),
            ghiChu: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
            syncStatus: expect.any(Object),
            loaiDuongSu: expect.any(Object),
            loaiGiayTo: expect.any(Object),
          }),
        );
      });
    });

    describe('getDuongSu', () => {
      it('should return NewDuongSu for default DuongSu initial value', () => {
        const formGroup = service.createDuongSuFormGroup(sampleWithNewData);

        const duongSu = service.getDuongSu(formGroup) as any;

        expect(duongSu).toMatchObject(sampleWithNewData);
      });

      it('should return NewDuongSu for empty DuongSu initial value', () => {
        const formGroup = service.createDuongSuFormGroup();

        const duongSu = service.getDuongSu(formGroup) as any;

        expect(duongSu).toMatchObject({});
      });

      it('should return IDuongSu', () => {
        const formGroup = service.createDuongSuFormGroup(sampleWithRequiredData);

        const duongSu = service.getDuongSu(formGroup) as any;

        expect(duongSu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDuongSu should not enable idDuongSu FormControl', () => {
        const formGroup = service.createDuongSuFormGroup();
        expect(formGroup.controls.idDuongSu.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.idDuongSu.disabled).toBe(true);
      });

      it('passing NewDuongSu should disable idDuongSu FormControl', () => {
        const formGroup = service.createDuongSuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.idDuongSu.disabled).toBe(true);

        service.resetForm(formGroup, { idDuongSu: null });

        expect(formGroup.controls.idDuongSu.disabled).toBe(true);
      });
    });
  });
});
