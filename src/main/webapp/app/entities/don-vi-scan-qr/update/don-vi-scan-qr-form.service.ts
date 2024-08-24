import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDonViScanQr, NewDonViScanQr } from '../don-vi-scan-qr.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDonViScanQr for edit and NewDonViScanQrFormGroupInput for create.
 */
type DonViScanQrFormGroupInput = IDonViScanQr | PartialWithRequiredKeyOf<NewDonViScanQr>;

type DonViScanQrFormDefaults = Pick<NewDonViScanQr, 'id'>;

type DonViScanQrFormGroupContent = {
  id: FormControl<IDonViScanQr['id'] | NewDonViScanQr['id']>;
  idLuotQuet: FormControl<IDonViScanQr['idLuotQuet']>;
  idDonVi: FormControl<IDonViScanQr['idDonVi']>;
  idCongDan: FormControl<IDonViScanQr['idCongDan']>;
  ngayThaoTac: FormControl<IDonViScanQr['ngayThaoTac']>;
};

export type DonViScanQrFormGroup = FormGroup<DonViScanQrFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DonViScanQrFormService {
  createDonViScanQrFormGroup(donViScanQr: DonViScanQrFormGroupInput = { id: null }): DonViScanQrFormGroup {
    const donViScanQrRawValue = {
      ...this.getFormDefaults(),
      ...donViScanQr,
    };
    return new FormGroup<DonViScanQrFormGroupContent>({
      id: new FormControl(
        { value: donViScanQrRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLuotQuet: new FormControl(donViScanQrRawValue.idLuotQuet),
      idDonVi: new FormControl(donViScanQrRawValue.idDonVi),
      idCongDan: new FormControl(donViScanQrRawValue.idCongDan),
      ngayThaoTac: new FormControl(donViScanQrRawValue.ngayThaoTac),
    });
  }

  getDonViScanQr(form: DonViScanQrFormGroup): IDonViScanQr | NewDonViScanQr {
    return form.getRawValue() as IDonViScanQr | NewDonViScanQr;
  }

  resetForm(form: DonViScanQrFormGroup, donViScanQr: DonViScanQrFormGroupInput): void {
    const donViScanQrRawValue = { ...this.getFormDefaults(), ...donViScanQr };
    form.reset(
      {
        ...donViScanQrRawValue,
        id: { value: donViScanQrRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DonViScanQrFormDefaults {
    return {
      id: null,
    };
  }
}
