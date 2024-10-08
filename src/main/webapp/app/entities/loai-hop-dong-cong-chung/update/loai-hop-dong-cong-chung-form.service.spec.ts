import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../loai-hop-dong-cong-chung.test-samples';

import { LoaiHopDongCongChungFormService } from './loai-hop-dong-cong-chung-form.service';

describe('LoaiHopDongCongChung Form Service', () => {
  let service: LoaiHopDongCongChungFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiHopDongCongChungFormService);
  });

  describe('Service methods', () => {
    describe('createLoaiHopDongCongChungFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLoaiHopDongCongChungFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idLoaiHopDongCongChung: expect.any(Object),
            dienGiai: expect.any(Object),
            giaTri: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing ILoaiHopDongCongChung should create a new form with FormGroup', () => {
        const formGroup = service.createLoaiHopDongCongChungFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idLoaiHopDongCongChung: expect.any(Object),
            dienGiai: expect.any(Object),
            giaTri: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getLoaiHopDongCongChung', () => {
      it('should return NewLoaiHopDongCongChung for default LoaiHopDongCongChung initial value', () => {
        const formGroup = service.createLoaiHopDongCongChungFormGroup(sampleWithNewData);

        const loaiHopDongCongChung = service.getLoaiHopDongCongChung(formGroup) as any;

        expect(loaiHopDongCongChung).toMatchObject(sampleWithNewData);
      });

      it('should return NewLoaiHopDongCongChung for empty LoaiHopDongCongChung initial value', () => {
        const formGroup = service.createLoaiHopDongCongChungFormGroup();

        const loaiHopDongCongChung = service.getLoaiHopDongCongChung(formGroup) as any;

        expect(loaiHopDongCongChung).toMatchObject({});
      });

      it('should return ILoaiHopDongCongChung', () => {
        const formGroup = service.createLoaiHopDongCongChungFormGroup(sampleWithRequiredData);

        const loaiHopDongCongChung = service.getLoaiHopDongCongChung(formGroup) as any;

        expect(loaiHopDongCongChung).toMatchObject(sampleWithRequiredData);
      });
    });
  });
});
