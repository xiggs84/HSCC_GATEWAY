import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhMucTinh, NewDanhMucTinh } from '../danh-muc-tinh.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { maTinh: unknown }> = Partial<Omit<T, 'maTinh'>> & { maTinh: T['maTinh'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucTinh for edit and NewDanhMucTinhFormGroupInput for create.
 */
type DanhMucTinhFormGroupInput = IDanhMucTinh | PartialWithRequiredKeyOf<NewDanhMucTinh>;

type DanhMucTinhFormDefaults = Pick<NewDanhMucTinh, 'maTinh'>;

type DanhMucTinhFormGroupContent = {
  maTinh: FormControl<IDanhMucTinh['maTinh'] | NewDanhMucTinh['maTinh']>;
  tenTinh: FormControl<IDanhMucTinh['tenTinh']>;
};

export type DanhMucTinhFormGroup = FormGroup<DanhMucTinhFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucTinhFormService {
  createDanhMucTinhFormGroup(danhMucTinh: DanhMucTinhFormGroupInput = { maTinh: null }): DanhMucTinhFormGroup {
    const danhMucTinhRawValue = {
      ...this.getFormDefaults(),
      ...danhMucTinh,
    };
    return new FormGroup<DanhMucTinhFormGroupContent>({
      maTinh: new FormControl(
        { value: danhMucTinhRawValue.maTinh, disabled: danhMucTinhRawValue.maTinh !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenTinh: new FormControl(danhMucTinhRawValue.tenTinh),
    });
  }

  getDanhMucTinh(form: DanhMucTinhFormGroup): IDanhMucTinh | NewDanhMucTinh {
    return form.getRawValue() as IDanhMucTinh | NewDanhMucTinh;
  }

  resetForm(form: DanhMucTinhFormGroup, danhMucTinh: DanhMucTinhFormGroupInput): void {
    const danhMucTinhRawValue = { ...this.getFormDefaults(), ...danhMucTinh };
    form.reset(
      {
        ...danhMucTinhRawValue,
        maTinh: { value: danhMucTinhRawValue.maTinh, disabled: danhMucTinhRawValue.maTinh !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucTinhFormDefaults {
    return {
      maTinh: null,
    };
  }
}
