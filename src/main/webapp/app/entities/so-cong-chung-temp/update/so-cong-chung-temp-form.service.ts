import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISoCongChungTemp, NewSoCongChungTemp } from '../so-cong-chung-temp.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISoCongChungTemp for edit and NewSoCongChungTempFormGroupInput for create.
 */
type SoCongChungTempFormGroupInput = ISoCongChungTemp | PartialWithRequiredKeyOf<NewSoCongChungTemp>;

type SoCongChungTempFormDefaults = Pick<NewSoCongChungTemp, 'id'>;

type SoCongChungTempFormGroupContent = {
  id: FormControl<ISoCongChungTemp['id'] | NewSoCongChungTemp['id']>;
  idHopDong: FormControl<ISoCongChungTemp['idHopDong']>;
  idMaster: FormControl<ISoCongChungTemp['idMaster']>;
  soCc: FormControl<ISoCongChungTemp['soCc']>;
  ngayThaoTac: FormControl<ISoCongChungTemp['ngayThaoTac']>;
};

export type SoCongChungTempFormGroup = FormGroup<SoCongChungTempFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SoCongChungTempFormService {
  createSoCongChungTempFormGroup(soCongChungTemp: SoCongChungTempFormGroupInput = { id: null }): SoCongChungTempFormGroup {
    const soCongChungTempRawValue = {
      ...this.getFormDefaults(),
      ...soCongChungTemp,
    };
    return new FormGroup<SoCongChungTempFormGroupContent>({
      id: new FormControl(
        { value: soCongChungTempRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idHopDong: new FormControl(soCongChungTempRawValue.idHopDong),
      idMaster: new FormControl(soCongChungTempRawValue.idMaster),
      soCc: new FormControl(soCongChungTempRawValue.soCc),
      ngayThaoTac: new FormControl(soCongChungTempRawValue.ngayThaoTac),
    });
  }

  getSoCongChungTemp(form: SoCongChungTempFormGroup): ISoCongChungTemp | NewSoCongChungTemp {
    return form.getRawValue() as ISoCongChungTemp | NewSoCongChungTemp;
  }

  resetForm(form: SoCongChungTempFormGroup, soCongChungTemp: SoCongChungTempFormGroupInput): void {
    const soCongChungTempRawValue = { ...this.getFormDefaults(), ...soCongChungTemp };
    form.reset(
      {
        ...soCongChungTempRawValue,
        id: { value: soCongChungTempRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SoCongChungTempFormDefaults {
    return {
      id: null,
    };
  }
}
