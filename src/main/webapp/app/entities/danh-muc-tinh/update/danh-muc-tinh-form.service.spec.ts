import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../danh-muc-tinh.test-samples';

import { DanhMucTinhFormService } from './danh-muc-tinh-form.service';

describe('DanhMucTinh Form Service', () => {
  let service: DanhMucTinhFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucTinhFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucTinhFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucTinhFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            maTinh: expect.any(Object),
            tenTinh: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucTinh should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucTinhFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            maTinh: expect.any(Object),
            tenTinh: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucTinh', () => {
      it('should return NewDanhMucTinh for default DanhMucTinh initial value', () => {
        const formGroup = service.createDanhMucTinhFormGroup(sampleWithNewData);

        const danhMucTinh = service.getDanhMucTinh(formGroup) as any;

        expect(danhMucTinh).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucTinh for empty DanhMucTinh initial value', () => {
        const formGroup = service.createDanhMucTinhFormGroup();

        const danhMucTinh = service.getDanhMucTinh(formGroup) as any;

        expect(danhMucTinh).toMatchObject({});
      });

      it('should return IDanhMucTinh', () => {
        const formGroup = service.createDanhMucTinhFormGroup(sampleWithRequiredData);

        const danhMucTinh = service.getDanhMucTinh(formGroup) as any;

        expect(danhMucTinh).toMatchObject(sampleWithRequiredData);
      });
    });
  });
});
