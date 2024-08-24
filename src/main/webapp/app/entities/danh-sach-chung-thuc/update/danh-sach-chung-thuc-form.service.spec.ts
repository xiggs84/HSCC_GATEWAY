import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-sach-chung-thuc.test-samples';

import { DanhSachChungThucFormService } from './danh-sach-chung-thuc-form.service';

describe('DanhSachChungThuc Form Service', () => {
  let service: DanhSachChungThucFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhSachChungThucFormService);
  });

  describe('Service methods', () => {
    describe('createDanhSachChungThucFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhSachChungThucFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idChungThuc: expect.any(Object),
            idDonVi: expect.any(Object),
            nguoiChungThuc: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayChungThuc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiGiayTo: expect.any(Object),
            quyenSo: expect.any(Object),
            srcChungThuc: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            ngayText: expect.any(Object),
            strSearch: expect.any(Object),
            soTienThu: expect.any(Object),
            ldPheDuyet: expect.any(Object),
          }),
        );
      });

      it('passing IDanhSachChungThuc should create a new form with FormGroup', () => {
        const formGroup = service.createDanhSachChungThucFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idChungThuc: expect.any(Object),
            idDonVi: expect.any(Object),
            nguoiChungThuc: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayChungThuc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiGiayTo: expect.any(Object),
            quyenSo: expect.any(Object),
            srcChungThuc: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            ngayText: expect.any(Object),
            strSearch: expect.any(Object),
            soTienThu: expect.any(Object),
            ldPheDuyet: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhSachChungThuc', () => {
      it('should return NewDanhSachChungThuc for default DanhSachChungThuc initial value', () => {
        const formGroup = service.createDanhSachChungThucFormGroup(sampleWithNewData);

        const danhSachChungThuc = service.getDanhSachChungThuc(formGroup) as any;

        expect(danhSachChungThuc).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhSachChungThuc for empty DanhSachChungThuc initial value', () => {
        const formGroup = service.createDanhSachChungThucFormGroup();

        const danhSachChungThuc = service.getDanhSachChungThuc(formGroup) as any;

        expect(danhSachChungThuc).toMatchObject({});
      });

      it('should return IDanhSachChungThuc', () => {
        const formGroup = service.createDanhSachChungThucFormGroup(sampleWithRequiredData);

        const danhSachChungThuc = service.getDanhSachChungThuc(formGroup) as any;

        expect(danhSachChungThuc).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhSachChungThuc should not enable id FormControl', () => {
        const formGroup = service.createDanhSachChungThucFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhSachChungThuc should disable id FormControl', () => {
        const formGroup = service.createDanhSachChungThucFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
