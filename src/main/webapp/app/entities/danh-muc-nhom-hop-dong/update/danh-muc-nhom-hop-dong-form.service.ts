import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhMucNhomHopDong, NewDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idNhom: unknown }> = Partial<Omit<T, 'idNhom'>> & { idNhom: T['idNhom'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucNhomHopDong for edit and NewDanhMucNhomHopDongFormGroupInput for create.
 */
type DanhMucNhomHopDongFormGroupInput = IDanhMucNhomHopDong | PartialWithRequiredKeyOf<NewDanhMucNhomHopDong>;

type DanhMucNhomHopDongFormDefaults = Pick<NewDanhMucNhomHopDong, 'idNhom'>;

type DanhMucNhomHopDongFormGroupContent = {
  idNhom: FormControl<IDanhMucNhomHopDong['idNhom'] | NewDanhMucNhomHopDong['idNhom']>;
  dienGiai: FormControl<IDanhMucNhomHopDong['dienGiai']>;
};

export type DanhMucNhomHopDongFormGroup = FormGroup<DanhMucNhomHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucNhomHopDongFormService {
  createDanhMucNhomHopDongFormGroup(danhMucNhomHopDong: DanhMucNhomHopDongFormGroupInput = { idNhom: null }): DanhMucNhomHopDongFormGroup {
    const danhMucNhomHopDongRawValue = {
      ...this.getFormDefaults(),
      ...danhMucNhomHopDong,
    };
    return new FormGroup<DanhMucNhomHopDongFormGroupContent>({
      idNhom: new FormControl(
        { value: danhMucNhomHopDongRawValue.idNhom, disabled: danhMucNhomHopDongRawValue.idNhom !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(danhMucNhomHopDongRawValue.dienGiai),
    });
  }

  getDanhMucNhomHopDong(form: DanhMucNhomHopDongFormGroup): IDanhMucNhomHopDong | NewDanhMucNhomHopDong {
    return form.getRawValue() as IDanhMucNhomHopDong | NewDanhMucNhomHopDong;
  }

  resetForm(form: DanhMucNhomHopDongFormGroup, danhMucNhomHopDong: DanhMucNhomHopDongFormGroupInput): void {
    const danhMucNhomHopDongRawValue = { ...this.getFormDefaults(), ...danhMucNhomHopDong };
    form.reset(
      {
        ...danhMucNhomHopDongRawValue,
        idNhom: { value: danhMucNhomHopDongRawValue.idNhom, disabled: danhMucNhomHopDongRawValue.idNhom !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucNhomHopDongFormDefaults {
    return {
      idNhom: null,
    };
  }
}
