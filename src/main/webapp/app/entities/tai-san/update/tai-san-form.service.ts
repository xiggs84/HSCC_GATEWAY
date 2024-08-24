import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaiSan, NewTaiSan } from '../tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaiSan for edit and NewTaiSanFormGroupInput for create.
 */
type TaiSanFormGroupInput = ITaiSan | PartialWithRequiredKeyOf<NewTaiSan>;

type TaiSanFormDefaults = Pick<NewTaiSan, 'id'>;

type TaiSanFormGroupContent = {
  id: FormControl<ITaiSan['id'] | NewTaiSan['id']>;
  idTaiSan: FormControl<ITaiSan['idTaiSan']>;
  tenTaiSan: FormControl<ITaiSan['tenTaiSan']>;
  trangThai: FormControl<ITaiSan['trangThai']>;
  thongTinTs: FormControl<ITaiSan['thongTinTs']>;
  idLoaiTs: FormControl<ITaiSan['idLoaiTs']>;
  ghiChu: FormControl<ITaiSan['ghiChu']>;
  ngayThaoTac: FormControl<ITaiSan['ngayThaoTac']>;
  nguoiThaoTac: FormControl<ITaiSan['nguoiThaoTac']>;
  idDuongSu: FormControl<ITaiSan['idDuongSu']>;
  idTsGoc: FormControl<ITaiSan['idTsGoc']>;
  maTaiSan: FormControl<ITaiSan['maTaiSan']>;
  idTinhTrang: FormControl<ITaiSan['idTinhTrang']>;
  idLoaiNganChan: FormControl<ITaiSan['idLoaiNganChan']>;
  ngayBdNganChan: FormControl<ITaiSan['ngayBdNganChan']>;
  ngayKtNganChan: FormControl<ITaiSan['ngayKtNganChan']>;
  idMaster: FormControl<ITaiSan['idMaster']>;
  strSearch: FormControl<ITaiSan['strSearch']>;
  idDonVi: FormControl<ITaiSan['idDonVi']>;
  soHsCv: FormControl<ITaiSan['soHsCv']>;
  soCc: FormControl<ITaiSan['soCc']>;
  soVaoSo: FormControl<ITaiSan['soVaoSo']>;
  moTa: FormControl<ITaiSan['moTa']>;
  loaiNganChan: FormControl<ITaiSan['loaiNganChan']>;
  syncStatus: FormControl<ITaiSan['syncStatus']>;
};

export type TaiSanFormGroup = FormGroup<TaiSanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaiSanFormService {
  createTaiSanFormGroup(taiSan: TaiSanFormGroupInput = { id: null }): TaiSanFormGroup {
    const taiSanRawValue = {
      ...this.getFormDefaults(),
      ...taiSan,
    };
    return new FormGroup<TaiSanFormGroupContent>({
      id: new FormControl(
        { value: taiSanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTaiSan: new FormControl(taiSanRawValue.idTaiSan),
      tenTaiSan: new FormControl(taiSanRawValue.tenTaiSan),
      trangThai: new FormControl(taiSanRawValue.trangThai),
      thongTinTs: new FormControl(taiSanRawValue.thongTinTs),
      idLoaiTs: new FormControl(taiSanRawValue.idLoaiTs),
      ghiChu: new FormControl(taiSanRawValue.ghiChu),
      ngayThaoTac: new FormControl(taiSanRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(taiSanRawValue.nguoiThaoTac),
      idDuongSu: new FormControl(taiSanRawValue.idDuongSu),
      idTsGoc: new FormControl(taiSanRawValue.idTsGoc),
      maTaiSan: new FormControl(taiSanRawValue.maTaiSan),
      idTinhTrang: new FormControl(taiSanRawValue.idTinhTrang),
      idLoaiNganChan: new FormControl(taiSanRawValue.idLoaiNganChan),
      ngayBdNganChan: new FormControl(taiSanRawValue.ngayBdNganChan),
      ngayKtNganChan: new FormControl(taiSanRawValue.ngayKtNganChan),
      idMaster: new FormControl(taiSanRawValue.idMaster),
      strSearch: new FormControl(taiSanRawValue.strSearch),
      idDonVi: new FormControl(taiSanRawValue.idDonVi),
      soHsCv: new FormControl(taiSanRawValue.soHsCv),
      soCc: new FormControl(taiSanRawValue.soCc),
      soVaoSo: new FormControl(taiSanRawValue.soVaoSo),
      moTa: new FormControl(taiSanRawValue.moTa),
      loaiNganChan: new FormControl(taiSanRawValue.loaiNganChan),
      syncStatus: new FormControl(taiSanRawValue.syncStatus),
    });
  }

  getTaiSan(form: TaiSanFormGroup): ITaiSan | NewTaiSan {
    return form.getRawValue() as ITaiSan | NewTaiSan;
  }

  resetForm(form: TaiSanFormGroup, taiSan: TaiSanFormGroupInput): void {
    const taiSanRawValue = { ...this.getFormDefaults(), ...taiSan };
    form.reset(
      {
        ...taiSanRawValue,
        id: { value: taiSanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaiSanFormDefaults {
    return {
      id: null,
    };
  }
}
