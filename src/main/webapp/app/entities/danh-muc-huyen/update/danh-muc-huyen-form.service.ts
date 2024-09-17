import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhMucHuyen, NewDanhMucHuyen } from '../danh-muc-huyen.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { maHuyen: unknown }> = Partial<Omit<T, 'maHuyen'>> & { maHuyen: T['maHuyen'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucHuyen for edit and NewDanhMucHuyenFormGroupInput for create.
 */
type DanhMucHuyenFormGroupInput = IDanhMucHuyen | PartialWithRequiredKeyOf<NewDanhMucHuyen>;

type DanhMucHuyenFormDefaults = Pick<NewDanhMucHuyen, 'maHuyen'>;

type DanhMucHuyenFormGroupContent = {
  maHuyen: FormControl<IDanhMucHuyen['maHuyen'] | NewDanhMucHuyen['maHuyen']>;
  tenHuyen: FormControl<IDanhMucHuyen['tenHuyen']>;
  maTinh: FormControl<IDanhMucHuyen['maTinh']>;
};

export type DanhMucHuyenFormGroup = FormGroup<DanhMucHuyenFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucHuyenFormService {
  createDanhMucHuyenFormGroup(danhMucHuyen: DanhMucHuyenFormGroupInput = { maHuyen: null }): DanhMucHuyenFormGroup {
    const danhMucHuyenRawValue = {
      ...this.getFormDefaults(),
      ...danhMucHuyen,
    };
    return new FormGroup<DanhMucHuyenFormGroupContent>({
      maHuyen: new FormControl(
        { value: danhMucHuyenRawValue.maHuyen, disabled: danhMucHuyenRawValue.maHuyen !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenHuyen: new FormControl(danhMucHuyenRawValue.tenHuyen),
      maTinh: new FormControl(danhMucHuyenRawValue.maTinh),
    });
  }

  getDanhMucHuyen(form: DanhMucHuyenFormGroup): IDanhMucHuyen | NewDanhMucHuyen {
    return form.getRawValue() as IDanhMucHuyen | NewDanhMucHuyen;
  }

  resetForm(form: DanhMucHuyenFormGroup, danhMucHuyen: DanhMucHuyenFormGroupInput): void {
    const danhMucHuyenRawValue = { ...this.getFormDefaults(), ...danhMucHuyen };
    form.reset(
      {
        ...danhMucHuyenRawValue,
        maHuyen: { value: danhMucHuyenRawValue.maHuyen, disabled: danhMucHuyenRawValue.maHuyen !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucHuyenFormDefaults {
    return {
      maHuyen: null,
    };
  }
}
