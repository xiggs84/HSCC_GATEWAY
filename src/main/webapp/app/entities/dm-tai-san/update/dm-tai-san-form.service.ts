import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDmTaiSan, NewDmTaiSan } from '../dm-tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idTaiSan: unknown }> = Partial<Omit<T, 'idTaiSan'>> & { idTaiSan: T['idTaiSan'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmTaiSan for edit and NewDmTaiSanFormGroupInput for create.
 */
type DmTaiSanFormGroupInput = IDmTaiSan | PartialWithRequiredKeyOf<NewDmTaiSan>;

type DmTaiSanFormDefaults = Pick<NewDmTaiSan, 'idTaiSan'>;

type DmTaiSanFormGroupContent = {
  idTaiSan: FormControl<IDmTaiSan['idTaiSan'] | NewDmTaiSan['idTaiSan']>;
  tenTaiSan: FormControl<IDmTaiSan['tenTaiSan']>;
  trangThai: FormControl<IDmTaiSan['trangThai']>;
  thongTinTs: FormControl<IDmTaiSan['thongTinTs']>;
  ghiChu: FormControl<IDmTaiSan['ghiChu']>;
  ngayThaoTac: FormControl<IDmTaiSan['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDmTaiSan['nguoiThaoTac']>;
  idDuongSu: FormControl<IDmTaiSan['idDuongSu']>;
  idTsGoc: FormControl<IDmTaiSan['idTsGoc']>;
  maTaiSan: FormControl<IDmTaiSan['maTaiSan']>;
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
  createDmTaiSanFormGroup(dmTaiSan: DmTaiSanFormGroupInput = { idTaiSan: null }): DmTaiSanFormGroup {
    const dmTaiSanRawValue = {
      ...this.getFormDefaults(),
      ...dmTaiSan,
    };
    return new FormGroup<DmTaiSanFormGroupContent>({
      idTaiSan: new FormControl(
        { value: dmTaiSanRawValue.idTaiSan, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenTaiSan: new FormControl(dmTaiSanRawValue.tenTaiSan),
      trangThai: new FormControl(dmTaiSanRawValue.trangThai),
      thongTinTs: new FormControl(dmTaiSanRawValue.thongTinTs),
      ghiChu: new FormControl(dmTaiSanRawValue.ghiChu),
      ngayThaoTac: new FormControl(dmTaiSanRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(dmTaiSanRawValue.nguoiThaoTac),
      idDuongSu: new FormControl(dmTaiSanRawValue.idDuongSu),
      idTsGoc: new FormControl(dmTaiSanRawValue.idTsGoc),
      maTaiSan: new FormControl(dmTaiSanRawValue.maTaiSan),
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
        idTaiSan: { value: dmTaiSanRawValue.idTaiSan, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmTaiSanFormDefaults {
    return {
      idTaiSan: null,
    };
  }
}
