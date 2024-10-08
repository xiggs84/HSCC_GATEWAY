import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITaiSanDuongSu, NewTaiSanDuongSu } from '../tai-san-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaiSanDuongSu for edit and NewTaiSanDuongSuFormGroupInput for create.
 */
type TaiSanDuongSuFormGroupInput = ITaiSanDuongSu | PartialWithRequiredKeyOf<NewTaiSanDuongSu>;

type TaiSanDuongSuFormDefaults = Pick<NewTaiSanDuongSu, 'id'>;

type TaiSanDuongSuFormGroupContent = {
  id: FormControl<ITaiSanDuongSu['id'] | NewTaiSanDuongSu['id']>;
  idTaiSan: FormControl<ITaiSanDuongSu['idTaiSan']>;
  trangThai: FormControl<ITaiSanDuongSu['trangThai']>;
  ngayThaoTac: FormControl<ITaiSanDuongSu['ngayThaoTac']>;
  idHopDong: FormControl<ITaiSanDuongSu['idHopDong']>;
  idLoaiHopDong: FormControl<ITaiSanDuongSu['idLoaiHopDong']>;
  idChungThuc: FormControl<ITaiSanDuongSu['idChungThuc']>;
  duongSu: FormControl<ITaiSanDuongSu['duongSu']>;
  taiSan: FormControl<ITaiSanDuongSu['taiSan']>;
};

export type TaiSanDuongSuFormGroup = FormGroup<TaiSanDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaiSanDuongSuFormService {
  createTaiSanDuongSuFormGroup(taiSanDuongSu: TaiSanDuongSuFormGroupInput = { id: null }): TaiSanDuongSuFormGroup {
    const taiSanDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...taiSanDuongSu,
    };
    return new FormGroup<TaiSanDuongSuFormGroupContent>({
      id: new FormControl(
        { value: taiSanDuongSuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTaiSan: new FormControl(taiSanDuongSuRawValue.idTaiSan),
      trangThai: new FormControl(taiSanDuongSuRawValue.trangThai, {
        validators: [Validators.min(0), Validators.max(1)],
      }),
      ngayThaoTac: new FormControl(taiSanDuongSuRawValue.ngayThaoTac),
      idHopDong: new FormControl(taiSanDuongSuRawValue.idHopDong),
      idLoaiHopDong: new FormControl(taiSanDuongSuRawValue.idLoaiHopDong),
      idChungThuc: new FormControl(taiSanDuongSuRawValue.idChungThuc),
      duongSu: new FormControl(taiSanDuongSuRawValue.duongSu),
      taiSan: new FormControl(taiSanDuongSuRawValue.taiSan),
    });
  }

  getTaiSanDuongSu(form: TaiSanDuongSuFormGroup): ITaiSanDuongSu | NewTaiSanDuongSu {
    return form.getRawValue() as ITaiSanDuongSu | NewTaiSanDuongSu;
  }

  resetForm(form: TaiSanDuongSuFormGroup, taiSanDuongSu: TaiSanDuongSuFormGroupInput): void {
    const taiSanDuongSuRawValue = { ...this.getFormDefaults(), ...taiSanDuongSu };
    form.reset(
      {
        ...taiSanDuongSuRawValue,
        id: { value: taiSanDuongSuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaiSanDuongSuFormDefaults {
    return {
      id: null,
    };
  }
}
