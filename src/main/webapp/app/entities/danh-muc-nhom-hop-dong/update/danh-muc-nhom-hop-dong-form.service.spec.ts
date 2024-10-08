import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../danh-muc-nhom-hop-dong.test-samples';

import { DanhMucNhomHopDongFormService } from './danh-muc-nhom-hop-dong-form.service';

describe('DanhMucNhomHopDong Form Service', () => {
  let service: DanhMucNhomHopDongFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucNhomHopDongFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucNhomHopDongFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucNhomHopDongFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idNhom: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucNhomHopDong should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucNhomHopDongFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idNhom: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucNhomHopDong', () => {
      it('should return NewDanhMucNhomHopDong for default DanhMucNhomHopDong initial value', () => {
        const formGroup = service.createDanhMucNhomHopDongFormGroup(sampleWithNewData);

        const danhMucNhomHopDong = service.getDanhMucNhomHopDong(formGroup) as any;

        expect(danhMucNhomHopDong).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucNhomHopDong for empty DanhMucNhomHopDong initial value', () => {
        const formGroup = service.createDanhMucNhomHopDongFormGroup();

        const danhMucNhomHopDong = service.getDanhMucNhomHopDong(formGroup) as any;

        expect(danhMucNhomHopDong).toMatchObject({});
      });

      it('should return IDanhMucNhomHopDong', () => {
        const formGroup = service.createDanhMucNhomHopDongFormGroup(sampleWithRequiredData);

        const danhMucNhomHopDong = service.getDanhMucNhomHopDong(formGroup) as any;

        expect(danhMucNhomHopDong).toMatchObject(sampleWithRequiredData);
      });
    });
  });
});
