import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhMucXa, NewDanhMucXa } from '../danh-muc-xa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { maXa: unknown }> = Partial<Omit<T, 'maXa'>> & { maXa: T['maXa'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucXa for edit and NewDanhMucXaFormGroupInput for create.
 */
type DanhMucXaFormGroupInput = IDanhMucXa | PartialWithRequiredKeyOf<NewDanhMucXa>;

type DanhMucXaFormDefaults = Pick<NewDanhMucXa, 'maXa'>;

type DanhMucXaFormGroupContent = {
  maXa: FormControl<IDanhMucXa['maXa'] | NewDanhMucXa['maXa']>;
  tenXa: FormControl<IDanhMucXa['tenXa']>;
  maHuyen: FormControl<IDanhMucXa['maHuyen']>;
};

export type DanhMucXaFormGroup = FormGroup<DanhMucXaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucXaFormService {
  createDanhMucXaFormGroup(danhMucXa: DanhMucXaFormGroupInput = { maXa: null }): DanhMucXaFormGroup {
    const danhMucXaRawValue = {
      ...this.getFormDefaults(),
      ...danhMucXa,
    };
    return new FormGroup<DanhMucXaFormGroupContent>({
      maXa: new FormControl(
        { value: danhMucXaRawValue.maXa, disabled: danhMucXaRawValue.maXa !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenXa: new FormControl(danhMucXaRawValue.tenXa),
      maHuyen: new FormControl(danhMucXaRawValue.maHuyen),
    });
  }

  getDanhMucXa(form: DanhMucXaFormGroup): IDanhMucXa | NewDanhMucXa {
    return form.getRawValue() as IDanhMucXa | NewDanhMucXa;
  }

  resetForm(form: DanhMucXaFormGroup, danhMucXa: DanhMucXaFormGroupInput): void {
    const danhMucXaRawValue = { ...this.getFormDefaults(), ...danhMucXa };
    form.reset(
      {
        ...danhMucXaRawValue,
        maXa: { value: danhMucXaRawValue.maXa, disabled: danhMucXaRawValue.maXa !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucXaFormDefaults {
    return {
      maXa: null,
    };
  }
}
