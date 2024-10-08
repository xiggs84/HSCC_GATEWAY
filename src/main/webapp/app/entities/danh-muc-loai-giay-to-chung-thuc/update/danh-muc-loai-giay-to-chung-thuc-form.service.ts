import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhMucLoaiGiayToChungThuc, NewDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idLoaiGiayTo: unknown }> = Partial<Omit<T, 'idLoaiGiayTo'>> & { idLoaiGiayTo: T['idLoaiGiayTo'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiGiayToChungThuc for edit and NewDanhMucLoaiGiayToChungThucFormGroupInput for create.
 */
type DanhMucLoaiGiayToChungThucFormGroupInput = IDanhMucLoaiGiayToChungThuc | PartialWithRequiredKeyOf<NewDanhMucLoaiGiayToChungThuc>;

type DanhMucLoaiGiayToChungThucFormDefaults = Pick<NewDanhMucLoaiGiayToChungThuc, 'idLoaiGiayTo'>;

type DanhMucLoaiGiayToChungThucFormGroupContent = {
  idLoaiGiayTo: FormControl<IDanhMucLoaiGiayToChungThuc['idLoaiGiayTo'] | NewDanhMucLoaiGiayToChungThuc['idLoaiGiayTo']>;
  dienGiai: FormControl<IDanhMucLoaiGiayToChungThuc['dienGiai']>;
};

export type DanhMucLoaiGiayToChungThucFormGroup = FormGroup<DanhMucLoaiGiayToChungThucFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiGiayToChungThucFormService {
  createDanhMucLoaiGiayToChungThucFormGroup(
    danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucFormGroupInput = { idLoaiGiayTo: null },
  ): DanhMucLoaiGiayToChungThucFormGroup {
    const danhMucLoaiGiayToChungThucRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiGiayToChungThuc,
    };
    return new FormGroup<DanhMucLoaiGiayToChungThucFormGroupContent>({
      idLoaiGiayTo: new FormControl(
        { value: danhMucLoaiGiayToChungThucRawValue.idLoaiGiayTo, disabled: danhMucLoaiGiayToChungThucRawValue.idLoaiGiayTo !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(danhMucLoaiGiayToChungThucRawValue.dienGiai),
    });
  }

  getDanhMucLoaiGiayToChungThuc(form: DanhMucLoaiGiayToChungThucFormGroup): IDanhMucLoaiGiayToChungThuc | NewDanhMucLoaiGiayToChungThuc {
    return form.getRawValue() as IDanhMucLoaiGiayToChungThuc | NewDanhMucLoaiGiayToChungThuc;
  }

  resetForm(form: DanhMucLoaiGiayToChungThucFormGroup, danhMucLoaiGiayToChungThuc: DanhMucLoaiGiayToChungThucFormGroupInput): void {
    const danhMucLoaiGiayToChungThucRawValue = { ...this.getFormDefaults(), ...danhMucLoaiGiayToChungThuc };
    form.reset(
      {
        ...danhMucLoaiGiayToChungThucRawValue,
        idLoaiGiayTo: {
          value: danhMucLoaiGiayToChungThucRawValue.idLoaiGiayTo,
          disabled: danhMucLoaiGiayToChungThucRawValue.idLoaiGiayTo !== null,
        },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiGiayToChungThucFormDefaults {
    return {
      idLoaiGiayTo: null,
    };
  }
}
