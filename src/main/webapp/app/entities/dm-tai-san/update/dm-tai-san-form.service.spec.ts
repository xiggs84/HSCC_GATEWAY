import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../dm-tai-san.test-samples';

import { DmTaiSanFormService } from './dm-tai-san-form.service';

describe('DmTaiSan Form Service', () => {
  let service: DmTaiSanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmTaiSanFormService);
  });

  describe('Service methods', () => {
    describe('createDmTaiSanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDmTaiSanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idTaiSan: expect.any(Object),
            tenTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinTs: expect.any(Object),
            ghiChu: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDuongSu: expect.any(Object),
            idTsGoc: expect.any(Object),
            maTaiSan: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
            ngayBdNganChan: expect.any(Object),
            ngayKtNganChan: expect.any(Object),
            idMaster: expect.any(Object),
            strSearch: expect.any(Object),
            idDonVi: expect.any(Object),
            soHsCv: expect.any(Object),
            soCc: expect.any(Object),
            soVaoSo: expect.any(Object),
            moTa: expect.any(Object),
            loaiNganChan: expect.any(Object),
          }),
        );
      });

      it('passing IDmTaiSan should create a new form with FormGroup', () => {
        const formGroup = service.createDmTaiSanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idTaiSan: expect.any(Object),
            tenTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinTs: expect.any(Object),
            ghiChu: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDuongSu: expect.any(Object),
            idTsGoc: expect.any(Object),
            maTaiSan: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
            ngayBdNganChan: expect.any(Object),
            ngayKtNganChan: expect.any(Object),
            idMaster: expect.any(Object),
            strSearch: expect.any(Object),
            idDonVi: expect.any(Object),
            soHsCv: expect.any(Object),
            soCc: expect.any(Object),
            soVaoSo: expect.any(Object),
            moTa: expect.any(Object),
            loaiNganChan: expect.any(Object),
          }),
        );
      });
    });

    describe('getDmTaiSan', () => {
      it('should return NewDmTaiSan for default DmTaiSan initial value', () => {
        const formGroup = service.createDmTaiSanFormGroup(sampleWithNewData);

        const dmTaiSan = service.getDmTaiSan(formGroup) as any;

        expect(dmTaiSan).toMatchObject(sampleWithNewData);
      });

      it('should return NewDmTaiSan for empty DmTaiSan initial value', () => {
        const formGroup = service.createDmTaiSanFormGroup();

        const dmTaiSan = service.getDmTaiSan(formGroup) as any;

        expect(dmTaiSan).toMatchObject({});
      });

      it('should return IDmTaiSan', () => {
        const formGroup = service.createDmTaiSanFormGroup(sampleWithRequiredData);

        const dmTaiSan = service.getDmTaiSan(formGroup) as any;

        expect(dmTaiSan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDmTaiSan should not enable idTaiSan FormControl', () => {
        const formGroup = service.createDmTaiSanFormGroup();
        expect(formGroup.controls.idTaiSan.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.idTaiSan.disabled).toBe(true);
      });

      it('passing NewDmTaiSan should disable idTaiSan FormControl', () => {
        const formGroup = service.createDmTaiSanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.idTaiSan.disabled).toBe(true);

        service.resetForm(formGroup, { idTaiSan: null });

        expect(formGroup.controls.idTaiSan.disabled).toBe(true);
      });
    });
  });
});
