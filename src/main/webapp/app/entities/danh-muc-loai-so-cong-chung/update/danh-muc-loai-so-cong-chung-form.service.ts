import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhMucLoaiSoCongChung, NewDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idLoai: unknown }> = Partial<Omit<T, 'idLoai'>> & { idLoai: T['idLoai'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiSoCongChung for edit and NewDanhMucLoaiSoCongChungFormGroupInput for create.
 */
type DanhMucLoaiSoCongChungFormGroupInput = IDanhMucLoaiSoCongChung | PartialWithRequiredKeyOf<NewDanhMucLoaiSoCongChung>;

type DanhMucLoaiSoCongChungFormDefaults = Pick<NewDanhMucLoaiSoCongChung, 'idLoai'>;

type DanhMucLoaiSoCongChungFormGroupContent = {
  idLoai: FormControl<IDanhMucLoaiSoCongChung['idLoai'] | NewDanhMucLoaiSoCongChung['idLoai']>;
  tenLoai: FormControl<IDanhMucLoaiSoCongChung['tenLoai']>;
  trangThai: FormControl<IDanhMucLoaiSoCongChung['trangThai']>;
};

export type DanhMucLoaiSoCongChungFormGroup = FormGroup<DanhMucLoaiSoCongChungFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiSoCongChungFormService {
  createDanhMucLoaiSoCongChungFormGroup(
    danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungFormGroupInput = { idLoai: null },
  ): DanhMucLoaiSoCongChungFormGroup {
    const danhMucLoaiSoCongChungRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiSoCongChung,
    };
    return new FormGroup<DanhMucLoaiSoCongChungFormGroupContent>({
      idLoai: new FormControl(
        { value: danhMucLoaiSoCongChungRawValue.idLoai, disabled: danhMucLoaiSoCongChungRawValue.idLoai !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenLoai: new FormControl(danhMucLoaiSoCongChungRawValue.tenLoai),
      trangThai: new FormControl(danhMucLoaiSoCongChungRawValue.trangThai),
    });
  }

  getDanhMucLoaiSoCongChung(form: DanhMucLoaiSoCongChungFormGroup): IDanhMucLoaiSoCongChung | NewDanhMucLoaiSoCongChung {
    return form.getRawValue() as IDanhMucLoaiSoCongChung | NewDanhMucLoaiSoCongChung;
  }

  resetForm(form: DanhMucLoaiSoCongChungFormGroup, danhMucLoaiSoCongChung: DanhMucLoaiSoCongChungFormGroupInput): void {
    const danhMucLoaiSoCongChungRawValue = { ...this.getFormDefaults(), ...danhMucLoaiSoCongChung };
    form.reset(
      {
        ...danhMucLoaiSoCongChungRawValue,
        idLoai: { value: danhMucLoaiSoCongChungRawValue.idLoai, disabled: danhMucLoaiSoCongChungRawValue.idLoai !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiSoCongChungFormDefaults {
    return {
      idLoai: null,
    };
  }
}
