import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhMucLoaiTaiSan, NewDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idLoaiTs: unknown }> = Partial<Omit<T, 'idLoaiTs'>> & { idLoaiTs: T['idLoaiTs'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiTaiSan for edit and NewDanhMucLoaiTaiSanFormGroupInput for create.
 */
type DanhMucLoaiTaiSanFormGroupInput = IDanhMucLoaiTaiSan | PartialWithRequiredKeyOf<NewDanhMucLoaiTaiSan>;

type DanhMucLoaiTaiSanFormDefaults = Pick<NewDanhMucLoaiTaiSan, 'idLoaiTs'>;

type DanhMucLoaiTaiSanFormGroupContent = {
  idLoaiTs: FormControl<IDanhMucLoaiTaiSan['idLoaiTs'] | NewDanhMucLoaiTaiSan['idLoaiTs']>;
  dienGiai: FormControl<IDanhMucLoaiTaiSan['dienGiai']>;
  trangThai: FormControl<IDanhMucLoaiTaiSan['trangThai']>;
};

export type DanhMucLoaiTaiSanFormGroup = FormGroup<DanhMucLoaiTaiSanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiTaiSanFormService {
  createDanhMucLoaiTaiSanFormGroup(danhMucLoaiTaiSan: DanhMucLoaiTaiSanFormGroupInput = { idLoaiTs: null }): DanhMucLoaiTaiSanFormGroup {
    const danhMucLoaiTaiSanRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiTaiSan,
    };
    return new FormGroup<DanhMucLoaiTaiSanFormGroupContent>({
      idLoaiTs: new FormControl(
        { value: danhMucLoaiTaiSanRawValue.idLoaiTs, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(danhMucLoaiTaiSanRawValue.dienGiai),
      trangThai: new FormControl(danhMucLoaiTaiSanRawValue.trangThai),
    });
  }

  getDanhMucLoaiTaiSan(form: DanhMucLoaiTaiSanFormGroup): IDanhMucLoaiTaiSan | NewDanhMucLoaiTaiSan {
    return form.getRawValue() as IDanhMucLoaiTaiSan | NewDanhMucLoaiTaiSan;
  }

  resetForm(form: DanhMucLoaiTaiSanFormGroup, danhMucLoaiTaiSan: DanhMucLoaiTaiSanFormGroupInput): void {
    const danhMucLoaiTaiSanRawValue = { ...this.getFormDefaults(), ...danhMucLoaiTaiSan };
    form.reset(
      {
        ...danhMucLoaiTaiSanRawValue,
        idLoaiTs: { value: danhMucLoaiTaiSanRawValue.idLoaiTs, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiTaiSanFormDefaults {
    return {
      idLoaiTs: null,
    };
  }
}
