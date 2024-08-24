import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dm-xa-tmp.test-samples';

import { DmXaTmpFormService } from './dm-xa-tmp-form.service';

describe('DmXaTmp Form Service', () => {
  let service: DmXaTmpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmXaTmpFormService);
  });

  describe('Service methods', () => {
    describe('createDmXaTmpFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDmXaTmpFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maXa: expect.any(Object),
            tenXa: expect.any(Object),
            maHuyen: expect.any(Object),
          }),
        );
      });

      it('passing IDmXaTmp should create a new form with FormGroup', () => {
        const formGroup = service.createDmXaTmpFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maXa: expect.any(Object),
            tenXa: expect.any(Object),
            maHuyen: expect.any(Object),
          }),
        );
      });
    });

    describe('getDmXaTmp', () => {
      it('should return NewDmXaTmp for default DmXaTmp initial value', () => {
        const formGroup = service.createDmXaTmpFormGroup(sampleWithNewData);

        const dmXaTmp = service.getDmXaTmp(formGroup) as any;

        expect(dmXaTmp).toMatchObject(sampleWithNewData);
      });

      it('should return NewDmXaTmp for empty DmXaTmp initial value', () => {
        const formGroup = service.createDmXaTmpFormGroup();

        const dmXaTmp = service.getDmXaTmp(formGroup) as any;

        expect(dmXaTmp).toMatchObject({});
      });

      it('should return IDmXaTmp', () => {
        const formGroup = service.createDmXaTmpFormGroup(sampleWithRequiredData);

        const dmXaTmp = service.getDmXaTmp(formGroup) as any;

        expect(dmXaTmp).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDmXaTmp should not enable id FormControl', () => {
        const formGroup = service.createDmXaTmpFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDmXaTmp should disable id FormControl', () => {
        const formGroup = service.createDmXaTmpFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
