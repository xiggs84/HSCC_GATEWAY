import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IPhanLoaiHopDong, NewPhanLoaiHopDong } from '../phan-loai-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idPhanLoaiHopDong: unknown }> = Partial<Omit<T, 'idPhanLoaiHopDong'>> & {
  idPhanLoaiHopDong: T['idPhanLoaiHopDong'];
};

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPhanLoaiHopDong for edit and NewPhanLoaiHopDongFormGroupInput for create.
 */
type PhanLoaiHopDongFormGroupInput = IPhanLoaiHopDong | PartialWithRequiredKeyOf<NewPhanLoaiHopDong>;

type PhanLoaiHopDongFormDefaults = Pick<NewPhanLoaiHopDong, 'idPhanLoaiHopDong'>;

type PhanLoaiHopDongFormGroupContent = {
  idPhanLoaiHopDong: FormControl<IPhanLoaiHopDong['idPhanLoaiHopDong'] | NewPhanLoaiHopDong['idPhanLoaiHopDong']>;
  dienGiai: FormControl<IPhanLoaiHopDong['dienGiai']>;
};

export type PhanLoaiHopDongFormGroup = FormGroup<PhanLoaiHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PhanLoaiHopDongFormService {
  createPhanLoaiHopDongFormGroup(phanLoaiHopDong: PhanLoaiHopDongFormGroupInput = { idPhanLoaiHopDong: null }): PhanLoaiHopDongFormGroup {
    const phanLoaiHopDongRawValue = {
      ...this.getFormDefaults(),
      ...phanLoaiHopDong,
    };
    return new FormGroup<PhanLoaiHopDongFormGroupContent>({
      idPhanLoaiHopDong: new FormControl(
        { value: phanLoaiHopDongRawValue.idPhanLoaiHopDong, disabled: phanLoaiHopDongRawValue.idPhanLoaiHopDong !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(phanLoaiHopDongRawValue.dienGiai),
    });
  }

  getPhanLoaiHopDong(form: PhanLoaiHopDongFormGroup): IPhanLoaiHopDong | NewPhanLoaiHopDong {
    return form.getRawValue() as IPhanLoaiHopDong | NewPhanLoaiHopDong;
  }

  resetForm(form: PhanLoaiHopDongFormGroup, phanLoaiHopDong: PhanLoaiHopDongFormGroupInput): void {
    const phanLoaiHopDongRawValue = { ...this.getFormDefaults(), ...phanLoaiHopDong };
    form.reset(
      {
        ...phanLoaiHopDongRawValue,
        idPhanLoaiHopDong: {
          value: phanLoaiHopDongRawValue.idPhanLoaiHopDong,
          disabled: phanLoaiHopDongRawValue.idPhanLoaiHopDong !== null,
        },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PhanLoaiHopDongFormDefaults {
    return {
      idPhanLoaiHopDong: null,
    };
  }
}
