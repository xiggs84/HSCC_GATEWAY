import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../chung-thuc.test-samples';

import { ChungThucFormService } from './chung-thuc-form.service';

describe('ChungThuc Form Service', () => {
  let service: ChungThucFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChungThucFormService);
  });

  describe('Service methods', () => {
    describe('createChungThucFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createChungThucFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idChungThuc: expect.any(Object),
            idDonVi: expect.any(Object),
            nguoiYeuCau: expect.any(Object),
            nguoiChungThuc: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayChungThuc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            soTienThu: expect.any(Object),
            soBanSao: expect.any(Object),
            vanBan: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiGiayTo: expect.any(Object),
            quyenSo: expect.any(Object),
            duongSu: expect.any(Object),
            taiSan: expect.any(Object),
            strSearch: expect.any(Object),
            srcChungThuc: expect.any(Object),
            thongTinChungThuc: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            idCtGoc: expect.any(Object),
            ngayText: expect.any(Object),
            chucDanhCanBo: expect.any(Object),
            ldPheDuyet: expect.any(Object),
            chucDanhLd: expect.any(Object),
          }),
        );
      });

      it('passing IChungThuc should create a new form with FormGroup', () => {
        const formGroup = service.createChungThucFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idChungThuc: expect.any(Object),
            idDonVi: expect.any(Object),
            nguoiYeuCau: expect.any(Object),
            nguoiChungThuc: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayChungThuc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            soTienThu: expect.any(Object),
            soBanSao: expect.any(Object),
            vanBan: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiGiayTo: expect.any(Object),
            quyenSo: expect.any(Object),
            duongSu: expect.any(Object),
            taiSan: expect.any(Object),
            strSearch: expect.any(Object),
            srcChungThuc: expect.any(Object),
            thongTinChungThuc: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            idCtGoc: expect.any(Object),
            ngayText: expect.any(Object),
            chucDanhCanBo: expect.any(Object),
            ldPheDuyet: expect.any(Object),
            chucDanhLd: expect.any(Object),
          }),
        );
      });
    });

    describe('getChungThuc', () => {
      it('should return NewChungThuc for default ChungThuc initial value', () => {
        const formGroup = service.createChungThucFormGroup(sampleWithNewData);

        const chungThuc = service.getChungThuc(formGroup) as any;

        expect(chungThuc).toMatchObject(sampleWithNewData);
      });

      it('should return NewChungThuc for empty ChungThuc initial value', () => {
        const formGroup = service.createChungThucFormGroup();

        const chungThuc = service.getChungThuc(formGroup) as any;

        expect(chungThuc).toMatchObject({});
      });

      it('should return IChungThuc', () => {
        const formGroup = service.createChungThucFormGroup(sampleWithRequiredData);

        const chungThuc = service.getChungThuc(formGroup) as any;

        expect(chungThuc).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IChungThuc should not enable id FormControl', () => {
        const formGroup = service.createChungThucFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewChungThuc should disable id FormControl', () => {
        const formGroup = service.createChungThucFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
