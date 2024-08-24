import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDmTaiSan, NewDmTaiSan } from '../dm-tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmTaiSan for edit and NewDmTaiSanFormGroupInput for create.
 */
type DmTaiSanFormGroupInput = IDmTaiSan | PartialWithRequiredKeyOf<NewDmTaiSan>;

type DmTaiSanFormDefaults = Pick<NewDmTaiSan, 'id'>;

type DmTaiSanFormGroupContent = {
  id: FormControl<IDmTaiSan['id'] | NewDmTaiSan['id']>;
  idTaiSan: FormControl<IDmTaiSan['idTaiSan']>;
  tenTaiSan: FormControl<IDmTaiSan['tenTaiSan']>;
  trangThai: FormControl<IDmTaiSan['trangThai']>;
  thongTinTs: FormControl<IDmTaiSan['thongTinTs']>;
  idLoaiTs: FormControl<IDmTaiSan['idLoaiTs']>;
  ghiChu: FormControl<IDmTaiSan['ghiChu']>;
  ngayThaoTac: FormControl<IDmTaiSan['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDmTaiSan['nguoiThaoTac']>;
  idDuongSu: FormControl<IDmTaiSan['idDuongSu']>;
  idTsGoc: FormControl<IDmTaiSan['idTsGoc']>;
  maTaiSan: FormControl<IDmTaiSan['maTaiSan']>;
  idTinhTrang: FormControl<IDmTaiSan['idTinhTrang']>;
  idLoaiNganChan: FormControl<IDmTaiSan['idLoaiNganChan']>;
  ngayBdNganChan: FormControl<IDmTaiSan['ngayBdNganChan']>;
  ngayKtNganChan: FormControl<IDmTaiSan['ngayKtNganChan']>;
  idMaster: FormControl<IDmTaiSan['idMaster']>;
  strSearch: FormControl<IDmTaiSan['strSearch']>;
  idDonVi: FormControl<IDmTaiSan['idDonVi']>;
  soHsCv: FormControl<IDmTaiSan['soHsCv']>;
  soCc: FormControl<IDmTaiSan['soCc']>;
  soVaoSo: FormControl<IDmTaiSan['soVaoSo']>;
  moTa: FormControl<IDmTaiSan['moTa']>;
  loaiNganChan: FormControl<IDmTaiSan['loaiNganChan']>;
};

export type DmTaiSanFormGroup = FormGroup<DmTaiSanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DmTaiSanFormService {
  createDmTaiSanFormGroup(dmTaiSan: DmTaiSanFormGroupInput = { id: null }): DmTaiSanFormGroup {
    const dmTaiSanRawValue = {
      ...this.getFormDefaults(),
      ...dmTaiSan,
    };
    return new FormGroup<DmTaiSanFormGroupContent>({
      id: new FormControl(
        { value: dmTaiSanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTaiSan: new FormControl(dmTaiSanRawValue.idTaiSan),
      tenTaiSan: new FormControl(dmTaiSanRawValue.tenTaiSan),
      trangThai: new FormControl(dmTaiSanRawValue.trangThai),
      thongTinTs: new FormControl(dmTaiSanRawValue.thongTinTs),
      idLoaiTs: new FormControl(dmTaiSanRawValue.idLoaiTs),
      ghiChu: new FormControl(dmTaiSanRawValue.ghiChu),
      ngayThaoTac: new FormControl(dmTaiSanRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(dmTaiSanRawValue.nguoiThaoTac),
      idDuongSu: new FormControl(dmTaiSanRawValue.idDuongSu),
      idTsGoc: new FormControl(dmTaiSanRawValue.idTsGoc),
      maTaiSan: new FormControl(dmTaiSanRawValue.maTaiSan),
      idTinhTrang: new FormControl(dmTaiSanRawValue.idTinhTrang),
      idLoaiNganChan: new FormControl(dmTaiSanRawValue.idLoaiNganChan),
      ngayBdNganChan: new FormControl(dmTaiSanRawValue.ngayBdNganChan),
      ngayKtNganChan: new FormControl(dmTaiSanRawValue.ngayKtNganChan),
      idMaster: new FormControl(dmTaiSanRawValue.idMaster),
      strSearch: new FormControl(dmTaiSanRawValue.strSearch),
      idDonVi: new FormControl(dmTaiSanRawValue.idDonVi),
      soHsCv: new FormControl(dmTaiSanRawValue.soHsCv),
      soCc: new FormControl(dmTaiSanRawValue.soCc),
      soVaoSo: new FormControl(dmTaiSanRawValue.soVaoSo),
      moTa: new FormControl(dmTaiSanRawValue.moTa),
      loaiNganChan: new FormControl(dmTaiSanRawValue.loaiNganChan),
    });
  }

  getDmTaiSan(form: DmTaiSanFormGroup): IDmTaiSan | NewDmTaiSan {
    return form.getRawValue() as IDmTaiSan | NewDmTaiSan;
  }

  resetForm(form: DmTaiSanFormGroup, dmTaiSan: DmTaiSanFormGroupInput): void {
    const dmTaiSanRawValue = { ...this.getFormDefaults(), ...dmTaiSan };
    form.reset(
      {
        ...dmTaiSanRawValue,
        id: { value: dmTaiSanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmTaiSanFormDefaults {
    return {
      id: null,
    };
  }
}
