import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../taisannhadatid.test-samples';

import { TaisannhadatidFormService } from './taisannhadatid-form.service';

describe('Taisannhadatid Form Service', () => {
  let service: TaisannhadatidFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaisannhadatidFormService);
  });

  describe('Service methods', () => {
    describe('createTaisannhadatidFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaisannhadatidFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idTaiSan: expect.any(Object),
            thongTinTs: expect.any(Object),
          }),
        );
      });

      it('passing ITaisannhadatid should create a new form with FormGroup', () => {
        const formGroup = service.createTaisannhadatidFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idTaiSan: expect.any(Object),
            thongTinTs: expect.any(Object),
          }),
        );
      });
    });

    describe('getTaisannhadatid', () => {
      it('should return NewTaisannhadatid for default Taisannhadatid initial value', () => {
        const formGroup = service.createTaisannhadatidFormGroup(sampleWithNewData);

        const taisannhadatid = service.getTaisannhadatid(formGroup) as any;

        expect(taisannhadatid).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaisannhadatid for empty Taisannhadatid initial value', () => {
        const formGroup = service.createTaisannhadatidFormGroup();

        const taisannhadatid = service.getTaisannhadatid(formGroup) as any;

        expect(taisannhadatid).toMatchObject({});
      });

      it('should return ITaisannhadatid', () => {
        const formGroup = service.createTaisannhadatidFormGroup(sampleWithRequiredData);

        const taisannhadatid = service.getTaisannhadatid(formGroup) as any;

        expect(taisannhadatid).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaisannhadatid should not enable idTaiSan FormControl', () => {
        const formGroup = service.createTaisannhadatidFormGroup();
        expect(formGroup.controls.idTaiSan.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.idTaiSan.disabled).toBe(true);
      });

      it('passing NewTaisannhadatid should disable idTaiSan FormControl', () => {
        const formGroup = service.createTaisannhadatidFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.idTaiSan.disabled).toBe(true);

        service.resetForm(formGroup, { idTaiSan: null });

        expect(formGroup.controls.idTaiSan.disabled).toBe(true);
      });
    });
  });
});
