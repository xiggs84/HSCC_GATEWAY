import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dm-tinh-tmp.test-samples';

import { DmTinhTmpFormService } from './dm-tinh-tmp-form.service';

describe('DmTinhTmp Form Service', () => {
  let service: DmTinhTmpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmTinhTmpFormService);
  });

  describe('Service methods', () => {
    describe('createDmTinhTmpFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDmTinhTmpFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maTinh: expect.any(Object),
            tenTinh: expect.any(Object),
          }),
        );
      });

      it('passing IDmTinhTmp should create a new form with FormGroup', () => {
        const formGroup = service.createDmTinhTmpFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maTinh: expect.any(Object),
            tenTinh: expect.any(Object),
          }),
        );
      });
    });

    describe('getDmTinhTmp', () => {
      it('should return NewDmTinhTmp for default DmTinhTmp initial value', () => {
        const formGroup = service.createDmTinhTmpFormGroup(sampleWithNewData);

        const dmTinhTmp = service.getDmTinhTmp(formGroup) as any;

        expect(dmTinhTmp).toMatchObject(sampleWithNewData);
      });

      it('should return NewDmTinhTmp for empty DmTinhTmp initial value', () => {
        const formGroup = service.createDmTinhTmpFormGroup();

        const dmTinhTmp = service.getDmTinhTmp(formGroup) as any;

        expect(dmTinhTmp).toMatchObject({});
      });

      it('should return IDmTinhTmp', () => {
        const formGroup = service.createDmTinhTmpFormGroup(sampleWithRequiredData);

        const dmTinhTmp = service.getDmTinhTmp(formGroup) as any;

        expect(dmTinhTmp).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDmTinhTmp should not enable id FormControl', () => {
        const formGroup = service.createDmTinhTmpFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDmTinhTmp should disable id FormControl', () => {
        const formGroup = service.createDmTinhTmpFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
