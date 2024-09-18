import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../quan-he-duong-su.test-samples';

import { QuanHeDuongSuFormService } from './quan-he-duong-su-form.service';

describe('QuanHeDuongSu Form Service', () => {
  let service: QuanHeDuongSuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanHeDuongSuFormService);
  });

  describe('Service methods', () => {
    describe('createQuanHeDuongSuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuanHeDuongSuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idQuanHe: expect.any(Object),
            idDuongSuQh: expect.any(Object),
            thongTinQuanHe: expect.any(Object),
            trangThai: expect.any(Object),
            duongSu: expect.any(Object),
          }),
        );
      });

      it('passing IQuanHeDuongSu should create a new form with FormGroup', () => {
        const formGroup = service.createQuanHeDuongSuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idQuanHe: expect.any(Object),
            idDuongSuQh: expect.any(Object),
            thongTinQuanHe: expect.any(Object),
            trangThai: expect.any(Object),
            duongSu: expect.any(Object),
          }),
        );
      });
    });

    describe('getQuanHeDuongSu', () => {
      it('should return NewQuanHeDuongSu for default QuanHeDuongSu initial value', () => {
        const formGroup = service.createQuanHeDuongSuFormGroup(sampleWithNewData);

        const quanHeDuongSu = service.getQuanHeDuongSu(formGroup) as any;

        expect(quanHeDuongSu).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuanHeDuongSu for empty QuanHeDuongSu initial value', () => {
        const formGroup = service.createQuanHeDuongSuFormGroup();

        const quanHeDuongSu = service.getQuanHeDuongSu(formGroup) as any;

        expect(quanHeDuongSu).toMatchObject({});
      });

      it('should return IQuanHeDuongSu', () => {
        const formGroup = service.createQuanHeDuongSuFormGroup(sampleWithRequiredData);

        const quanHeDuongSu = service.getQuanHeDuongSu(formGroup) as any;

        expect(quanHeDuongSu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuanHeDuongSu should not enable idQuanHe FormControl', () => {
        const formGroup = service.createQuanHeDuongSuFormGroup();
        expect(formGroup.controls.idQuanHe.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.idQuanHe.disabled).toBe(true);
      });

      it('passing NewQuanHeDuongSu should disable idQuanHe FormControl', () => {
        const formGroup = service.createQuanHeDuongSuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.idQuanHe.disabled).toBe(true);

        service.resetForm(formGroup, { idQuanHe: null });

        expect(formGroup.controls.idQuanHe.disabled).toBe(true);
      });
    });
  });
});
