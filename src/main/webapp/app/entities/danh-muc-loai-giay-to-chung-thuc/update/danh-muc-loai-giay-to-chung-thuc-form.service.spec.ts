import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-loai-giay-to-chung-thuc.test-samples';

import { DanhMucLoaiGiayToChungThucFormService } from './danh-muc-loai-giay-to-chung-thuc-form.service';

describe('DanhMucLoaiGiayToChungThuc Form Service', () => {
  let service: DanhMucLoaiGiayToChungThucFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucLoaiGiayToChungThucFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucLoaiGiayToChungThucFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucLoaiGiayToChungThucFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiGiayTo: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucLoaiGiayToChungThuc should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucLoaiGiayToChungThucFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiGiayTo: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucLoaiGiayToChungThuc', () => {
      it('should return NewDanhMucLoaiGiayToChungThuc for default DanhMucLoaiGiayToChungThuc initial value', () => {
        const formGroup = service.createDanhMucLoaiGiayToChungThucFormGroup(sampleWithNewData);

        const danhMucLoaiGiayToChungThuc = service.getDanhMucLoaiGiayToChungThuc(formGroup) as any;

        expect(danhMucLoaiGiayToChungThuc).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucLoaiGiayToChungThuc for empty DanhMucLoaiGiayToChungThuc initial value', () => {
        const formGroup = service.createDanhMucLoaiGiayToChungThucFormGroup();

        const danhMucLoaiGiayToChungThuc = service.getDanhMucLoaiGiayToChungThuc(formGroup) as any;

        expect(danhMucLoaiGiayToChungThuc).toMatchObject({});
      });

      it('should return IDanhMucLoaiGiayToChungThuc', () => {
        const formGroup = service.createDanhMucLoaiGiayToChungThucFormGroup(sampleWithRequiredData);

        const danhMucLoaiGiayToChungThuc = service.getDanhMucLoaiGiayToChungThuc(formGroup) as any;

        expect(danhMucLoaiGiayToChungThuc).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucLoaiGiayToChungThuc should not enable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiGiayToChungThucFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucLoaiGiayToChungThuc should disable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiGiayToChungThucFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
