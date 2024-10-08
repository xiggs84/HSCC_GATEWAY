import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISoCongChung, NewSoCongChung } from '../so-cong-chung.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idSo: unknown }> = Partial<Omit<T, 'idSo'>> & { idSo: T['idSo'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISoCongChung for edit and NewSoCongChungFormGroupInput for create.
 */
type SoCongChungFormGroupInput = ISoCongChung | PartialWithRequiredKeyOf<NewSoCongChung>;

type SoCongChungFormDefaults = Pick<NewSoCongChung, 'idSo'>;

type SoCongChungFormGroupContent = {
  idSo: FormControl<ISoCongChung['idSo'] | NewSoCongChung['idSo']>;
  idDonVi: FormControl<ISoCongChung['idDonVi']>;
  tenSo: FormControl<ISoCongChung['tenSo']>;
  giaTri: FormControl<ISoCongChung['giaTri']>;
  ngayThaoTac: FormControl<ISoCongChung['ngayThaoTac']>;
  nguoiThaoTac: FormControl<ISoCongChung['nguoiThaoTac']>;
  trangThai: FormControl<ISoCongChung['trangThai']>;
  danhMucLoaiSoCongChung: FormControl<ISoCongChung['danhMucLoaiSoCongChung']>;
};

export type SoCongChungFormGroup = FormGroup<SoCongChungFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SoCongChungFormService {
  createSoCongChungFormGroup(soCongChung: SoCongChungFormGroupInput = { idSo: null }): SoCongChungFormGroup {
    const soCongChungRawValue = {
      ...this.getFormDefaults(),
      ...soCongChung,
    };
    return new FormGroup<SoCongChungFormGroupContent>({
      idSo: new FormControl(
        { value: soCongChungRawValue.idSo, disabled: soCongChungRawValue.idSo !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDonVi: new FormControl(soCongChungRawValue.idDonVi),
      tenSo: new FormControl(soCongChungRawValue.tenSo),
      giaTri: new FormControl(soCongChungRawValue.giaTri),
      ngayThaoTac: new FormControl(soCongChungRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(soCongChungRawValue.nguoiThaoTac),
      trangThai: new FormControl(soCongChungRawValue.trangThai),
      danhMucLoaiSoCongChung: new FormControl(soCongChungRawValue.danhMucLoaiSoCongChung),
    });
  }

  getSoCongChung(form: SoCongChungFormGroup): ISoCongChung | NewSoCongChung {
    return form.getRawValue() as ISoCongChung | NewSoCongChung;
  }

  resetForm(form: SoCongChungFormGroup, soCongChung: SoCongChungFormGroupInput): void {
    const soCongChungRawValue = { ...this.getFormDefaults(), ...soCongChung };
    form.reset(
      {
        ...soCongChungRawValue,
        idSo: { value: soCongChungRawValue.idSo, disabled: soCongChungRawValue.idSo !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SoCongChungFormDefaults {
    return {
      idSo: null,
    };
  }
}
