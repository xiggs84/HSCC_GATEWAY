import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IThuaTach, NewThuaTach } from '../thua-tach.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idThuaTach: unknown }> = Partial<Omit<T, 'idThuaTach'>> & { idThuaTach: T['idThuaTach'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IThuaTach for edit and NewThuaTachFormGroupInput for create.
 */
type ThuaTachFormGroupInput = IThuaTach | PartialWithRequiredKeyOf<NewThuaTach>;

type ThuaTachFormDefaults = Pick<NewThuaTach, 'idThuaTach'>;

type ThuaTachFormGroupContent = {
  idThuaTach: FormControl<IThuaTach['idThuaTach'] | NewThuaTach['idThuaTach']>;
  thongTinThuaTach: FormControl<IThuaTach['thongTinThuaTach']>;
  trangThai: FormControl<IThuaTach['trangThai']>;
};

export type ThuaTachFormGroup = FormGroup<ThuaTachFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ThuaTachFormService {
  createThuaTachFormGroup(thuaTach: ThuaTachFormGroupInput = { idThuaTach: null }): ThuaTachFormGroup {
    const thuaTachRawValue = {
      ...this.getFormDefaults(),
      ...thuaTach,
    };
    return new FormGroup<ThuaTachFormGroupContent>({
      idThuaTach: new FormControl(
        { value: thuaTachRawValue.idThuaTach, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      thongTinThuaTach: new FormControl(thuaTachRawValue.thongTinThuaTach),
      trangThai: new FormControl(thuaTachRawValue.trangThai),
    });
  }

  getThuaTach(form: ThuaTachFormGroup): IThuaTach | NewThuaTach {
    return form.getRawValue() as IThuaTach | NewThuaTach;
  }

  resetForm(form: ThuaTachFormGroup, thuaTach: ThuaTachFormGroupInput): void {
    const thuaTachRawValue = { ...this.getFormDefaults(), ...thuaTach };
    form.reset(
      {
        ...thuaTachRawValue,
        idThuaTach: { value: thuaTachRawValue.idThuaTach, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ThuaTachFormDefaults {
    return {
      idThuaTach: null,
    };
  }
}
