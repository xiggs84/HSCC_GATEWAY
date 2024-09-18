import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IQuanHeDuongSu, NewQuanHeDuongSu } from '../quan-he-duong-su.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idQuanHe: unknown }> = Partial<Omit<T, 'idQuanHe'>> & { idQuanHe: T['idQuanHe'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuanHeDuongSu for edit and NewQuanHeDuongSuFormGroupInput for create.
 */
type QuanHeDuongSuFormGroupInput = IQuanHeDuongSu | PartialWithRequiredKeyOf<NewQuanHeDuongSu>;

type QuanHeDuongSuFormDefaults = Pick<NewQuanHeDuongSu, 'idQuanHe'>;

type QuanHeDuongSuFormGroupContent = {
  idQuanHe: FormControl<IQuanHeDuongSu['idQuanHe'] | NewQuanHeDuongSu['idQuanHe']>;
  idDuongSuQh: FormControl<IQuanHeDuongSu['idDuongSuQh']>;
  thongTinQuanHe: FormControl<IQuanHeDuongSu['thongTinQuanHe']>;
  trangThai: FormControl<IQuanHeDuongSu['trangThai']>;
  duongSu: FormControl<IQuanHeDuongSu['duongSu']>;
};

export type QuanHeDuongSuFormGroup = FormGroup<QuanHeDuongSuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuanHeDuongSuFormService {
  createQuanHeDuongSuFormGroup(quanHeDuongSu: QuanHeDuongSuFormGroupInput = { idQuanHe: null }): QuanHeDuongSuFormGroup {
    const quanHeDuongSuRawValue = {
      ...this.getFormDefaults(),
      ...quanHeDuongSu,
    };
    return new FormGroup<QuanHeDuongSuFormGroupContent>({
      idQuanHe: new FormControl(
        { value: quanHeDuongSuRawValue.idQuanHe, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDuongSuQh: new FormControl(quanHeDuongSuRawValue.idDuongSuQh),
      thongTinQuanHe: new FormControl(quanHeDuongSuRawValue.thongTinQuanHe),
      trangThai: new FormControl(quanHeDuongSuRawValue.trangThai, {
        validators: [Validators.min(0), Validators.max(1)],
      }),
      duongSu: new FormControl(quanHeDuongSuRawValue.duongSu),
    });
  }

  getQuanHeDuongSu(form: QuanHeDuongSuFormGroup): IQuanHeDuongSu | NewQuanHeDuongSu {
    return form.getRawValue() as IQuanHeDuongSu | NewQuanHeDuongSu;
  }

  resetForm(form: QuanHeDuongSuFormGroup, quanHeDuongSu: QuanHeDuongSuFormGroupInput): void {
    const quanHeDuongSuRawValue = { ...this.getFormDefaults(), ...quanHeDuongSu };
    form.reset(
      {
        ...quanHeDuongSuRawValue,
        idQuanHe: { value: quanHeDuongSuRawValue.idQuanHe, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuanHeDuongSuFormDefaults {
    return {
      idQuanHe: null,
    };
  }
}
