import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ILoaiHopDongCongChung, NewLoaiHopDongCongChung } from '../loai-hop-dong-cong-chung.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idLoaiHopDongCongChung: unknown }> = Partial<Omit<T, 'idLoaiHopDongCongChung'>> & {
  idLoaiHopDongCongChung: T['idLoaiHopDongCongChung'];
};

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoaiHopDongCongChung for edit and NewLoaiHopDongCongChungFormGroupInput for create.
 */
type LoaiHopDongCongChungFormGroupInput = ILoaiHopDongCongChung | PartialWithRequiredKeyOf<NewLoaiHopDongCongChung>;

type LoaiHopDongCongChungFormDefaults = Pick<NewLoaiHopDongCongChung, 'idLoaiHopDongCongChung'>;

type LoaiHopDongCongChungFormGroupContent = {
  idLoaiHopDongCongChung: FormControl<ILoaiHopDongCongChung['idLoaiHopDongCongChung'] | NewLoaiHopDongCongChung['idLoaiHopDongCongChung']>;
  dienGiai: FormControl<ILoaiHopDongCongChung['dienGiai']>;
  giaTri: FormControl<ILoaiHopDongCongChung['giaTri']>;
  trangThai: FormControl<ILoaiHopDongCongChung['trangThai']>;
};

export type LoaiHopDongCongChungFormGroup = FormGroup<LoaiHopDongCongChungFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoaiHopDongCongChungFormService {
  createLoaiHopDongCongChungFormGroup(
    loaiHopDongCongChung: LoaiHopDongCongChungFormGroupInput = { idLoaiHopDongCongChung: null },
  ): LoaiHopDongCongChungFormGroup {
    const loaiHopDongCongChungRawValue = {
      ...this.getFormDefaults(),
      ...loaiHopDongCongChung,
    };
    return new FormGroup<LoaiHopDongCongChungFormGroupContent>({
      idLoaiHopDongCongChung: new FormControl(
        {
          value: loaiHopDongCongChungRawValue.idLoaiHopDongCongChung,
          disabled: loaiHopDongCongChungRawValue.idLoaiHopDongCongChung !== null,
        },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(loaiHopDongCongChungRawValue.dienGiai),
      giaTri: new FormControl(loaiHopDongCongChungRawValue.giaTri),
      trangThai: new FormControl(loaiHopDongCongChungRawValue.trangThai),
    });
  }

  getLoaiHopDongCongChung(form: LoaiHopDongCongChungFormGroup): ILoaiHopDongCongChung | NewLoaiHopDongCongChung {
    return form.getRawValue() as ILoaiHopDongCongChung | NewLoaiHopDongCongChung;
  }

  resetForm(form: LoaiHopDongCongChungFormGroup, loaiHopDongCongChung: LoaiHopDongCongChungFormGroupInput): void {
    const loaiHopDongCongChungRawValue = { ...this.getFormDefaults(), ...loaiHopDongCongChung };
    form.reset(
      {
        ...loaiHopDongCongChungRawValue,
        idLoaiHopDongCongChung: {
          value: loaiHopDongCongChungRawValue.idLoaiHopDongCongChung,
          disabled: loaiHopDongCongChungRawValue.idLoaiHopDongCongChung !== null,
        },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LoaiHopDongCongChungFormDefaults {
    return {
      idLoaiHopDongCongChung: null,
    };
  }
}
