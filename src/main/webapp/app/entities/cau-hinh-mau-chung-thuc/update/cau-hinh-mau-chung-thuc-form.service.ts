import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICauHinhMauChungThuc, NewCauHinhMauChungThuc } from '../cau-hinh-mau-chung-thuc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICauHinhMauChungThuc for edit and NewCauHinhMauChungThucFormGroupInput for create.
 */
type CauHinhMauChungThucFormGroupInput = ICauHinhMauChungThuc | PartialWithRequiredKeyOf<NewCauHinhMauChungThuc>;

type CauHinhMauChungThucFormDefaults = Pick<NewCauHinhMauChungThuc, 'id'>;

type CauHinhMauChungThucFormGroupContent = {
  id: FormControl<ICauHinhMauChungThuc['id'] | NewCauHinhMauChungThuc['id']>;
  idLoai: FormControl<ICauHinhMauChungThuc['idLoai']>;
  dienGiai: FormControl<ICauHinhMauChungThuc['dienGiai']>;
  khungGia: FormControl<ICauHinhMauChungThuc['khungGia']>;
  hasBenB: FormControl<ICauHinhMauChungThuc['hasBenB']>;
  hasTaiSan: FormControl<ICauHinhMauChungThuc['hasTaiSan']>;
  trangThai: FormControl<ICauHinhMauChungThuc['trangThai']>;
  fileChungThuc: FormControl<ICauHinhMauChungThuc['fileChungThuc']>;
  srcChungThuc: FormControl<ICauHinhMauChungThuc['srcChungThuc']>;
  ngayThaoTac: FormControl<ICauHinhMauChungThuc['ngayThaoTac']>;
  nguoiThaoTac: FormControl<ICauHinhMauChungThuc['nguoiThaoTac']>;
  idDonVi: FormControl<ICauHinhMauChungThuc['idDonVi']>;
  idLoaiSo: FormControl<ICauHinhMauChungThuc['idLoaiSo']>;
};

export type CauHinhMauChungThucFormGroup = FormGroup<CauHinhMauChungThucFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CauHinhMauChungThucFormService {
  createCauHinhMauChungThucFormGroup(cauHinhMauChungThuc: CauHinhMauChungThucFormGroupInput = { id: null }): CauHinhMauChungThucFormGroup {
    const cauHinhMauChungThucRawValue = {
      ...this.getFormDefaults(),
      ...cauHinhMauChungThuc,
    };
    return new FormGroup<CauHinhMauChungThucFormGroupContent>({
      id: new FormControl(
        { value: cauHinhMauChungThucRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idLoai: new FormControl(cauHinhMauChungThucRawValue.idLoai),
      dienGiai: new FormControl(cauHinhMauChungThucRawValue.dienGiai),
      khungGia: new FormControl(cauHinhMauChungThucRawValue.khungGia),
      hasBenB: new FormControl(cauHinhMauChungThucRawValue.hasBenB),
      hasTaiSan: new FormControl(cauHinhMauChungThucRawValue.hasTaiSan),
      trangThai: new FormControl(cauHinhMauChungThucRawValue.trangThai),
      fileChungThuc: new FormControl(cauHinhMauChungThucRawValue.fileChungThuc),
      srcChungThuc: new FormControl(cauHinhMauChungThucRawValue.srcChungThuc),
      ngayThaoTac: new FormControl(cauHinhMauChungThucRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(cauHinhMauChungThucRawValue.nguoiThaoTac),
      idDonVi: new FormControl(cauHinhMauChungThucRawValue.idDonVi),
      idLoaiSo: new FormControl(cauHinhMauChungThucRawValue.idLoaiSo),
    });
  }

  getCauHinhMauChungThuc(form: CauHinhMauChungThucFormGroup): ICauHinhMauChungThuc | NewCauHinhMauChungThuc {
    return form.getRawValue() as ICauHinhMauChungThuc | NewCauHinhMauChungThuc;
  }

  resetForm(form: CauHinhMauChungThucFormGroup, cauHinhMauChungThuc: CauHinhMauChungThucFormGroupInput): void {
    const cauHinhMauChungThucRawValue = { ...this.getFormDefaults(), ...cauHinhMauChungThuc };
    form.reset(
      {
        ...cauHinhMauChungThucRawValue,
        id: { value: cauHinhMauChungThucRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CauHinhMauChungThucFormDefaults {
    return {
      id: null,
    };
  }
}
