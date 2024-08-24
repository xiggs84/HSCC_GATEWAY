import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dm-duong-su.test-samples';

import { DmDuongSuFormService } from './dm-duong-su-form.service';

describe('DmDuongSu Form Service', () => {
  let service: DmDuongSuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmDuongSuFormService);
  });

  describe('Service methods', () => {
    describe('createDmDuongSuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDmDuongSuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDuongSu: expect.any(Object),
            tenDuongSu: expect.any(Object),
            idLoaiDs: expect.any(Object),
            diaChi: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinDs: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDsGoc: expect.any(Object),
            idTinhTrang: expect.any(Object),
            idMaster: expect.any(Object),
            idDonVi: expect.any(Object),
            strSearch: expect.any(Object),
            soGiayTo: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
          }),
        );
      });

      it('passing IDmDuongSu should create a new form with FormGroup', () => {
        const formGroup = service.createDmDuongSuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDuongSu: expect.any(Object),
            tenDuongSu: expect.any(Object),
            idLoaiDs: expect.any(Object),
            diaChi: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinDs: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDsGoc: expect.any(Object),
            idTinhTrang: expect.any(Object),
            idMaster: expect.any(Object),
            idDonVi: expect.any(Object),
            strSearch: expect.any(Object),
            soGiayTo: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
          }),
        );
      });
    });

    describe('getDmDuongSu', () => {
      it('should return NewDmDuongSu for default DmDuongSu initial value', () => {
        const formGroup = service.createDmDuongSuFormGroup(sampleWithNewData);

        const dmDuongSu = service.getDmDuongSu(formGroup) as any;

        expect(dmDuongSu).toMatchObject(sampleWithNewData);
      });

      it('should return NewDmDuongSu for empty DmDuongSu initial value', () => {
        const formGroup = service.createDmDuongSuFormGroup();

        const dmDuongSu = service.getDmDuongSu(formGroup) as any;

        expect(dmDuongSu).toMatchObject({});
      });

      it('should return IDmDuongSu', () => {
        const formGroup = service.createDmDuongSuFormGroup(sampleWithRequiredData);

        const dmDuongSu = service.getDmDuongSu(formGroup) as any;

        expect(dmDuongSu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDmDuongSu should not enable id FormControl', () => {
        const formGroup = service.createDmDuongSuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDmDuongSu should disable id FormControl', () => {
        const formGroup = service.createDmDuongSuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
