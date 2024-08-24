import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dm-huyen-tmp.test-samples';

import { DmHuyenTmpFormService } from './dm-huyen-tmp-form.service';

describe('DmHuyenTmp Form Service', () => {
  let service: DmHuyenTmpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmHuyenTmpFormService);
  });

  describe('Service methods', () => {
    describe('createDmHuyenTmpFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDmHuyenTmpFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maHuyen: expect.any(Object),
            tenHuyen: expect.any(Object),
            maTinh: expect.any(Object),
          }),
        );
      });

      it('passing IDmHuyenTmp should create a new form with FormGroup', () => {
        const formGroup = service.createDmHuyenTmpFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maHuyen: expect.any(Object),
            tenHuyen: expect.any(Object),
            maTinh: expect.any(Object),
          }),
        );
      });
    });

    describe('getDmHuyenTmp', () => {
      it('should return NewDmHuyenTmp for default DmHuyenTmp initial value', () => {
        const formGroup = service.createDmHuyenTmpFormGroup(sampleWithNewData);

        const dmHuyenTmp = service.getDmHuyenTmp(formGroup) as any;

        expect(dmHuyenTmp).toMatchObject(sampleWithNewData);
      });

      it('should return NewDmHuyenTmp for empty DmHuyenTmp initial value', () => {
        const formGroup = service.createDmHuyenTmpFormGroup();

        const dmHuyenTmp = service.getDmHuyenTmp(formGroup) as any;

        expect(dmHuyenTmp).toMatchObject({});
      });

      it('should return IDmHuyenTmp', () => {
        const formGroup = service.createDmHuyenTmpFormGroup(sampleWithRequiredData);

        const dmHuyenTmp = service.getDmHuyenTmp(formGroup) as any;

        expect(dmHuyenTmp).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDmHuyenTmp should not enable id FormControl', () => {
        const formGroup = service.createDmHuyenTmpFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDmHuyenTmp should disable id FormControl', () => {
        const formGroup = service.createDmHuyenTmpFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
