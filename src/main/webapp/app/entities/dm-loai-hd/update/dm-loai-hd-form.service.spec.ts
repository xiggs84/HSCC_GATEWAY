import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dm-loai-hd.test-samples';

import { DmLoaiHdFormService } from './dm-loai-hd-form.service';

describe('DmLoaiHd Form Service', () => {
  let service: DmLoaiHdFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmLoaiHdFormService);
  });

  describe('Service methods', () => {
    describe('createDmLoaiHdFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDmLoaiHdFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dienGiai: expect.any(Object),
            idVaiTro1: expect.any(Object),
            idVaiTro2: expect.any(Object),
            fileHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            dieuKhoan: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            srcLoiChung: expect.any(Object),
            idNhom: expect.any(Object),
            fileLoiChung: expect.any(Object),
            chuyenTaiSan: expect.any(Object),
            loaiSuaDoi: expect.any(Object),
            loaiHuyBo: expect.any(Object),
            trangThaiDuyet: expect.any(Object),
            idPhanLoaiHopDong: expect.any(Object),
            srcCv: expect.any(Object),
            srcTb: expect.any(Object),
            srcTtpc: expect.any(Object),
            dgTen: expect.any(Object),
            nhomTen: expect.any(Object),
            idVaiTro3: expect.any(Object),
          }),
        );
      });

      it('passing IDmLoaiHd should create a new form with FormGroup', () => {
        const formGroup = service.createDmLoaiHdFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dienGiai: expect.any(Object),
            idVaiTro1: expect.any(Object),
            idVaiTro2: expect.any(Object),
            fileHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            dieuKhoan: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            srcLoiChung: expect.any(Object),
            idNhom: expect.any(Object),
            fileLoiChung: expect.any(Object),
            chuyenTaiSan: expect.any(Object),
            loaiSuaDoi: expect.any(Object),
            loaiHuyBo: expect.any(Object),
            trangThaiDuyet: expect.any(Object),
            idPhanLoaiHopDong: expect.any(Object),
            srcCv: expect.any(Object),
            srcTb: expect.any(Object),
            srcTtpc: expect.any(Object),
            dgTen: expect.any(Object),
            nhomTen: expect.any(Object),
            idVaiTro3: expect.any(Object),
          }),
        );
      });
    });

    describe('getDmLoaiHd', () => {
      it('should return NewDmLoaiHd for default DmLoaiHd initial value', () => {
        const formGroup = service.createDmLoaiHdFormGroup(sampleWithNewData);

        const dmLoaiHd = service.getDmLoaiHd(formGroup) as any;

        expect(dmLoaiHd).toMatchObject(sampleWithNewData);
      });

      it('should return NewDmLoaiHd for empty DmLoaiHd initial value', () => {
        const formGroup = service.createDmLoaiHdFormGroup();

        const dmLoaiHd = service.getDmLoaiHd(formGroup) as any;

        expect(dmLoaiHd).toMatchObject({});
      });

      it('should return IDmLoaiHd', () => {
        const formGroup = service.createDmLoaiHdFormGroup(sampleWithRequiredData);

        const dmLoaiHd = service.getDmLoaiHd(formGroup) as any;

        expect(dmLoaiHd).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDmLoaiHd should not enable id FormControl', () => {
        const formGroup = service.createDmLoaiHdFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDmLoaiHd should disable id FormControl', () => {
        const formGroup = service.createDmLoaiHdFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
