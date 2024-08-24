import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../duong-su-trung-cmnd-bak.test-samples';

import { DuongSuTrungCmndBakFormService } from './duong-su-trung-cmnd-bak-form.service';

describe('DuongSuTrungCmndBak Form Service', () => {
  let service: DuongSuTrungCmndBakFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuongSuTrungCmndBakFormService);
  });

  describe('Service methods', () => {
    describe('createDuongSuTrungCmndBakFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDuongSuTrungCmndBakFormGroup();

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
          }),
        );
      });

      it('passing IDuongSuTrungCmndBak should create a new form with FormGroup', () => {
        const formGroup = service.createDuongSuTrungCmndBakFormGroup(sampleWithRequiredData);

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
          }),
        );
      });
    });

    describe('getDuongSuTrungCmndBak', () => {
      it('should return NewDuongSuTrungCmndBak for default DuongSuTrungCmndBak initial value', () => {
        const formGroup = service.createDuongSuTrungCmndBakFormGroup(sampleWithNewData);

        const duongSuTrungCmndBak = service.getDuongSuTrungCmndBak(formGroup) as any;

        expect(duongSuTrungCmndBak).toMatchObject(sampleWithNewData);
      });

      it('should return NewDuongSuTrungCmndBak for empty DuongSuTrungCmndBak initial value', () => {
        const formGroup = service.createDuongSuTrungCmndBakFormGroup();

        const duongSuTrungCmndBak = service.getDuongSuTrungCmndBak(formGroup) as any;

        expect(duongSuTrungCmndBak).toMatchObject({});
      });

      it('should return IDuongSuTrungCmndBak', () => {
        const formGroup = service.createDuongSuTrungCmndBakFormGroup(sampleWithRequiredData);

        const duongSuTrungCmndBak = service.getDuongSuTrungCmndBak(formGroup) as any;

        expect(duongSuTrungCmndBak).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDuongSuTrungCmndBak should not enable id FormControl', () => {
        const formGroup = service.createDuongSuTrungCmndBakFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDuongSuTrungCmndBak should disable id FormControl', () => {
        const formGroup = service.createDuongSuTrungCmndBakFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
