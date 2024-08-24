import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dm-hop-dong.test-samples';

import { DmHopDongFormService } from './dm-hop-dong-form.service';

describe('DmHopDong Form Service', () => {
  let service: DmHopDongFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmHopDongFormService);
  });

  describe('Service methods', () => {
    describe('createDmHopDongFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDmHopDongFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idHopDong: expect.any(Object),
            ngayLapHd: expect.any(Object),
            nguoiLapHd: expect.any(Object),
            thongTinDuongSu: expect.any(Object),
            thongTinTaiSan: expect.any(Object),
            thongTinVanBan: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dieuKhoanHd: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idHdGoc: expect.any(Object),
            thongTinChuyenNhuong: expect.any(Object),
            maHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            ngayHen: expect.any(Object),
            idSoCongChung: expect.any(Object),
            soCongChung: expect.any(Object),
            congChungVien: expect.any(Object),
            ngayKyHd: expect.any(Object),
            nguoiRutTrich: expect.any(Object),
            soTienRutTrich: expect.any(Object),
            ngayRutTrich: expect.any(Object),
            hdThuCong: expect.any(Object),
            trangThaiRutTrich: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            strSearch: expect.any(Object),
            idMaster: expect.any(Object),
            idHdSdHb: expect.any(Object),
            srcDmMaster: expect.any(Object),
            repRefUnique: expect.any(Object),
            ngayText: expect.any(Object),
            ngayNum: expect.any(Object),
            ngayThaoTacRutTrich: expect.any(Object),
            thuLaoCongChung: expect.any(Object),
          }),
        );
      });

      it('passing IDmHopDong should create a new form with FormGroup', () => {
        const formGroup = service.createDmHopDongFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idHopDong: expect.any(Object),
            ngayLapHd: expect.any(Object),
            nguoiLapHd: expect.any(Object),
            thongTinDuongSu: expect.any(Object),
            thongTinTaiSan: expect.any(Object),
            thongTinVanBan: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dieuKhoanHd: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idHdGoc: expect.any(Object),
            thongTinChuyenNhuong: expect.any(Object),
            maHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            ngayHen: expect.any(Object),
            idSoCongChung: expect.any(Object),
            soCongChung: expect.any(Object),
            congChungVien: expect.any(Object),
            ngayKyHd: expect.any(Object),
            nguoiRutTrich: expect.any(Object),
            soTienRutTrich: expect.any(Object),
            ngayRutTrich: expect.any(Object),
            hdThuCong: expect.any(Object),
            trangThaiRutTrich: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            strSearch: expect.any(Object),
            idMaster: expect.any(Object),
            idHdSdHb: expect.any(Object),
            srcDmMaster: expect.any(Object),
            repRefUnique: expect.any(Object),
            ngayText: expect.any(Object),
            ngayNum: expect.any(Object),
            ngayThaoTacRutTrich: expect.any(Object),
            thuLaoCongChung: expect.any(Object),
          }),
        );
      });
    });

    describe('getDmHopDong', () => {
      it('should return NewDmHopDong for default DmHopDong initial value', () => {
        const formGroup = service.createDmHopDongFormGroup(sampleWithNewData);

        const dmHopDong = service.getDmHopDong(formGroup) as any;

        expect(dmHopDong).toMatchObject(sampleWithNewData);
      });

      it('should return NewDmHopDong for empty DmHopDong initial value', () => {
        const formGroup = service.createDmHopDongFormGroup();

        const dmHopDong = service.getDmHopDong(formGroup) as any;

        expect(dmHopDong).toMatchObject({});
      });

      it('should return IDmHopDong', () => {
        const formGroup = service.createDmHopDongFormGroup(sampleWithRequiredData);

        const dmHopDong = service.getDmHopDong(formGroup) as any;

        expect(dmHopDong).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDmHopDong should not enable id FormControl', () => {
        const formGroup = service.createDmHopDongFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDmHopDong should disable id FormControl', () => {
        const formGroup = service.createDmHopDongFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
