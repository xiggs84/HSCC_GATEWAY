import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../danh-muc-loai-so-cong-chung.test-samples';

import { DanhMucLoaiSoCongChungFormService } from './danh-muc-loai-so-cong-chung-form.service';

describe('DanhMucLoaiSoCongChung Form Service', () => {
  let service: DanhMucLoaiSoCongChungFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucLoaiSoCongChungFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucLoaiSoCongChungFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucLoaiSoCongChungFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idLoai: expect.any(Object),
            tenLoai: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucLoaiSoCongChung should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucLoaiSoCongChungFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idLoai: expect.any(Object),
            tenLoai: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucLoaiSoCongChung', () => {
      it('should return NewDanhMucLoaiSoCongChung for default DanhMucLoaiSoCongChung initial value', () => {
        const formGroup = service.createDanhMucLoaiSoCongChungFormGroup(sampleWithNewData);

        const danhMucLoaiSoCongChung = service.getDanhMucLoaiSoCongChung(formGroup) as any;

        expect(danhMucLoaiSoCongChung).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucLoaiSoCongChung for empty DanhMucLoaiSoCongChung initial value', () => {
        const formGroup = service.createDanhMucLoaiSoCongChungFormGroup();

        const danhMucLoaiSoCongChung = service.getDanhMucLoaiSoCongChung(formGroup) as any;

        expect(danhMucLoaiSoCongChung).toMatchObject({});
      });

      it('should return IDanhMucLoaiSoCongChung', () => {
        const formGroup = service.createDanhMucLoaiSoCongChungFormGroup(sampleWithRequiredData);

        const danhMucLoaiSoCongChung = service.getDanhMucLoaiSoCongChung(formGroup) as any;

        expect(danhMucLoaiSoCongChung).toMatchObject(sampleWithRequiredData);
      });
    });
  });
});
