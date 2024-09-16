import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITinhTrangTaiSan, NewTinhTrangTaiSan } from '../tinh-trang-tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idTinhTrang: unknown }> = Partial<Omit<T, 'idTinhTrang'>> & { idTinhTrang: T['idTinhTrang'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITinhTrangTaiSan for edit and NewTinhTrangTaiSanFormGroupInput for create.
 */
type TinhTrangTaiSanFormGroupInput = ITinhTrangTaiSan | PartialWithRequiredKeyOf<NewTinhTrangTaiSan>;

type TinhTrangTaiSanFormDefaults = Pick<NewTinhTrangTaiSan, 'idTinhTrang'>;

type TinhTrangTaiSanFormGroupContent = {
  idTinhTrang: FormControl<ITinhTrangTaiSan['idTinhTrang'] | NewTinhTrangTaiSan['idTinhTrang']>;
  dienGiai: FormControl<ITinhTrangTaiSan['dienGiai']>;
  trangThai: FormControl<ITinhTrangTaiSan['trangThai']>;
};

export type TinhTrangTaiSanFormGroup = FormGroup<TinhTrangTaiSanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TinhTrangTaiSanFormService {
  createTinhTrangTaiSanFormGroup(tinhTrangTaiSan: TinhTrangTaiSanFormGroupInput = { idTinhTrang: null }): TinhTrangTaiSanFormGroup {
    const tinhTrangTaiSanRawValue = {
      ...this.getFormDefaults(),
      ...tinhTrangTaiSan,
    };
    return new FormGroup<TinhTrangTaiSanFormGroupContent>({
      idTinhTrang: new FormControl(
        { value: tinhTrangTaiSanRawValue.idTinhTrang, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(tinhTrangTaiSanRawValue.dienGiai),
      trangThai: new FormControl(tinhTrangTaiSanRawValue.trangThai),
    });
  }

  getTinhTrangTaiSan(form: TinhTrangTaiSanFormGroup): ITinhTrangTaiSan | NewTinhTrangTaiSan {
    return form.getRawValue() as ITinhTrangTaiSan | NewTinhTrangTaiSan;
  }

  resetForm(form: TinhTrangTaiSanFormGroup, tinhTrangTaiSan: TinhTrangTaiSanFormGroupInput): void {
    const tinhTrangTaiSanRawValue = { ...this.getFormDefaults(), ...tinhTrangTaiSan };
    form.reset(
      {
        ...tinhTrangTaiSanRawValue,
        idTinhTrang: { value: tinhTrangTaiSanRawValue.idTinhTrang, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TinhTrangTaiSanFormDefaults {
    return {
      idTinhTrang: null,
    };
  }
}
