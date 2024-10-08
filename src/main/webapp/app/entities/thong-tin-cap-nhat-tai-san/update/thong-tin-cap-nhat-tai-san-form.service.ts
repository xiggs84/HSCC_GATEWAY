import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IThongTinCapNhatTaiSan, NewThongTinCapNhatTaiSan } from '../thong-tin-cap-nhat-tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idCapNhat: unknown }> = Partial<Omit<T, 'idCapNhat'>> & { idCapNhat: T['idCapNhat'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IThongTinCapNhatTaiSan for edit and NewThongTinCapNhatTaiSanFormGroupInput for create.
 */
type ThongTinCapNhatTaiSanFormGroupInput = IThongTinCapNhatTaiSan | PartialWithRequiredKeyOf<NewThongTinCapNhatTaiSan>;

type ThongTinCapNhatTaiSanFormDefaults = Pick<NewThongTinCapNhatTaiSan, 'idCapNhat'>;

type ThongTinCapNhatTaiSanFormGroupContent = {
  idCapNhat: FormControl<IThongTinCapNhatTaiSan['idCapNhat'] | NewThongTinCapNhatTaiSan['idCapNhat']>;
  tenTaiSan: FormControl<IThongTinCapNhatTaiSan['tenTaiSan']>;
  thongTinTaiSan: FormControl<IThongTinCapNhatTaiSan['thongTinTaiSan']>;
  ngayCapNhat: FormControl<IThongTinCapNhatTaiSan['ngayCapNhat']>;
  taiSan: FormControl<IThongTinCapNhatTaiSan['taiSan']>;
  danhMucLoaiTaiSan: FormControl<IThongTinCapNhatTaiSan['danhMucLoaiTaiSan']>;
};

export type ThongTinCapNhatTaiSanFormGroup = FormGroup<ThongTinCapNhatTaiSanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ThongTinCapNhatTaiSanFormService {
  createThongTinCapNhatTaiSanFormGroup(
    thongTinCapNhatTaiSan: ThongTinCapNhatTaiSanFormGroupInput = { idCapNhat: null },
  ): ThongTinCapNhatTaiSanFormGroup {
    const thongTinCapNhatTaiSanRawValue = {
      ...this.getFormDefaults(),
      ...thongTinCapNhatTaiSan,
    };
    return new FormGroup<ThongTinCapNhatTaiSanFormGroupContent>({
      idCapNhat: new FormControl(
        { value: thongTinCapNhatTaiSanRawValue.idCapNhat, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenTaiSan: new FormControl(thongTinCapNhatTaiSanRawValue.tenTaiSan),
      thongTinTaiSan: new FormControl(thongTinCapNhatTaiSanRawValue.thongTinTaiSan),
      ngayCapNhat: new FormControl(thongTinCapNhatTaiSanRawValue.ngayCapNhat),
      taiSan: new FormControl(thongTinCapNhatTaiSanRawValue.taiSan),
      danhMucLoaiTaiSan: new FormControl(thongTinCapNhatTaiSanRawValue.danhMucLoaiTaiSan),
    });
  }

  getThongTinCapNhatTaiSan(form: ThongTinCapNhatTaiSanFormGroup): IThongTinCapNhatTaiSan | NewThongTinCapNhatTaiSan {
    return form.getRawValue() as IThongTinCapNhatTaiSan | NewThongTinCapNhatTaiSan;
  }

  resetForm(form: ThongTinCapNhatTaiSanFormGroup, thongTinCapNhatTaiSan: ThongTinCapNhatTaiSanFormGroupInput): void {
    const thongTinCapNhatTaiSanRawValue = { ...this.getFormDefaults(), ...thongTinCapNhatTaiSan };
    form.reset(
      {
        ...thongTinCapNhatTaiSanRawValue,
        idCapNhat: { value: thongTinCapNhatTaiSanRawValue.idCapNhat, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ThongTinCapNhatTaiSanFormDefaults {
    return {
      idCapNhat: null,
    };
  }
}
