import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../don-vi-scan-qr.test-samples';

import { DonViScanQrFormService } from './don-vi-scan-qr-form.service';

describe('DonViScanQr Form Service', () => {
  let service: DonViScanQrFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonViScanQrFormService);
  });

  describe('Service methods', () => {
    describe('createDonViScanQrFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDonViScanQrFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLuotQuet: expect.any(Object),
            idDonVi: expect.any(Object),
            idCongDan: expect.any(Object),
            ngayThaoTac: expect.any(Object),
          }),
        );
      });

      it('passing IDonViScanQr should create a new form with FormGroup', () => {
        const formGroup = service.createDonViScanQrFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLuotQuet: expect.any(Object),
            idDonVi: expect.any(Object),
            idCongDan: expect.any(Object),
            ngayThaoTac: expect.any(Object),
          }),
        );
      });
    });

    describe('getDonViScanQr', () => {
      it('should return NewDonViScanQr for default DonViScanQr initial value', () => {
        const formGroup = service.createDonViScanQrFormGroup(sampleWithNewData);

        const donViScanQr = service.getDonViScanQr(formGroup) as any;

        expect(donViScanQr).toMatchObject(sampleWithNewData);
      });

      it('should return NewDonViScanQr for empty DonViScanQr initial value', () => {
        const formGroup = service.createDonViScanQrFormGroup();

        const donViScanQr = service.getDonViScanQr(formGroup) as any;

        expect(donViScanQr).toMatchObject({});
      });

      it('should return IDonViScanQr', () => {
        const formGroup = service.createDonViScanQrFormGroup(sampleWithRequiredData);

        const donViScanQr = service.getDonViScanQr(formGroup) as any;

        expect(donViScanQr).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDonViScanQr should not enable id FormControl', () => {
        const formGroup = service.createDonViScanQrFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDonViScanQr should disable id FormControl', () => {
        const formGroup = service.createDonViScanQrFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
