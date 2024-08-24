import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../so-cong-chung-temp.test-samples';

import { SoCongChungTempFormService } from './so-cong-chung-temp-form.service';

describe('SoCongChungTemp Form Service', () => {
  let service: SoCongChungTempFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoCongChungTempFormService);
  });

  describe('Service methods', () => {
    describe('createSoCongChungTempFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSoCongChungTempFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idHopDong: expect.any(Object),
            idMaster: expect.any(Object),
            soCc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
          }),
        );
      });

      it('passing ISoCongChungTemp should create a new form with FormGroup', () => {
        const formGroup = service.createSoCongChungTempFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idHopDong: expect.any(Object),
            idMaster: expect.any(Object),
            soCc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
          }),
        );
      });
    });

    describe('getSoCongChungTemp', () => {
      it('should return NewSoCongChungTemp for default SoCongChungTemp initial value', () => {
        const formGroup = service.createSoCongChungTempFormGroup(sampleWithNewData);

        const soCongChungTemp = service.getSoCongChungTemp(formGroup) as any;

        expect(soCongChungTemp).toMatchObject(sampleWithNewData);
      });

      it('should return NewSoCongChungTemp for empty SoCongChungTemp initial value', () => {
        const formGroup = service.createSoCongChungTempFormGroup();

        const soCongChungTemp = service.getSoCongChungTemp(formGroup) as any;

        expect(soCongChungTemp).toMatchObject({});
      });

      it('should return ISoCongChungTemp', () => {
        const formGroup = service.createSoCongChungTempFormGroup(sampleWithRequiredData);

        const soCongChungTemp = service.getSoCongChungTemp(formGroup) as any;

        expect(soCongChungTemp).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISoCongChungTemp should not enable id FormControl', () => {
        const formGroup = service.createSoCongChungTempFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSoCongChungTemp should disable id FormControl', () => {
        const formGroup = service.createSoCongChungTempFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
