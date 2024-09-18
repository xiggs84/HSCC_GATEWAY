import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICauHinhThongTinDuongSu, NewCauHinhThongTinDuongSu } from '../cau-hinh-thong-tin-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idCauHinh: unknown }> = Partial<Omit<T, 'idCauHinh'>> & { idCauHinh: T['idCauHinh'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICauHinhThongTinDuongSu for edit and NewCauHinhThongTinDuongSuFormGroupInput for create.
 */
type CauHinhThongTinDuongSuFormGroupInput = ICauHinhThongTinDuongSu | PartialWithRequiredKeyOf<NewCauHinhThongTinDuongSu>;

type CauHinhThongTinDuongSuFormDefaults = Pick<NewCauHinhThongTinDuongSu, 'idCauHinh'>;

type CauHinhThongTinDuongSuFormGroupContent = {
  idCauHinh: FormControl<ICauHinhThongTinDuongSu['idCauHinh'] | NewCauHinhThongTinDuongSu['idCauHinh']>;
  noiDung: FormControl<ICauHinhThongTinDuongSu['noiDung']>;
  javascript: FormControl<ICauHinhThongTinDuongSu['javascript']>;
  css: FormControl<ICauHinhThongTinDuongSu['css']>;
  idLoaiDs: FormControl<ICauHinhThongTinDuongSu['idLoaiDs']>;
  idDonVi: FormControl<ICauHinhThongTinDuongSu['idDonVi']>;
  trangThai: FormControl<ICauHinhThongTinDuongSu['trangThai']>;
};

export type CauHinhThongTinDuongSuFormGroup = FormGroup<CauHinhThongTinDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CauHinhThongTinDuongSuFormService {
  createCauHinhThongTinDuongSuFormGroup(
    cauHinhThongTinDuongSu: CauHinhThongTinDuongSuFormGroupInput = { idCauHinh: null },
  ): CauHinhThongTinDuongSuFormGroup {
    const cauHinhThongTinDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...cauHinhThongTinDuongSu,
    };
    return new FormGroup<CauHinhThongTinDuongSuFormGroupContent>({
      idCauHinh: new FormControl(
        { value: cauHinhThongTinDuongSuRawValue.idCauHinh, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      noiDung: new FormControl(cauHinhThongTinDuongSuRawValue.noiDung),
      javascript: new FormControl(cauHinhThongTinDuongSuRawValue.javascript),
      css: new FormControl(cauHinhThongTinDuongSuRawValue.css),
      idLoaiDs: new FormControl(cauHinhThongTinDuongSuRawValue.idLoaiDs),
      idDonVi: new FormControl(cauHinhThongTinDuongSuRawValue.idDonVi),
      trangThai: new FormControl(cauHinhThongTinDuongSuRawValue.trangThai, {
        validators: [Validators.min(0), Validators.max(1)],
      }),
    });
  }

  getCauHinhThongTinDuongSu(form: CauHinhThongTinDuongSuFormGroup): ICauHinhThongTinDuongSu | NewCauHinhThongTinDuongSu {
    return form.getRawValue() as ICauHinhThongTinDuongSu | NewCauHinhThongTinDuongSu;
  }

  resetForm(form: CauHinhThongTinDuongSuFormGroup, cauHinhThongTinDuongSu: CauHinhThongTinDuongSuFormGroupInput): void {
    const cauHinhThongTinDuongSuRawValue = { ...this.getFormDefaults(), ...cauHinhThongTinDuongSu };
    form.reset(
      {
        ...cauHinhThongTinDuongSuRawValue,
        idCauHinh: { value: cauHinhThongTinDuongSuRawValue.idCauHinh, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CauHinhThongTinDuongSuFormDefaults {
    return {
      idCauHinh: null,
    };
  }
}
