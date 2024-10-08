import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDmLoaiHd, NewDmLoaiHd } from '../dm-loai-hd.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idLoaiHd: unknown }> = Partial<Omit<T, 'idLoaiHd'>> & { idLoaiHd: T['idLoaiHd'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmLoaiHd for edit and NewDmLoaiHdFormGroupInput for create.
 */
type DmLoaiHdFormGroupInput = IDmLoaiHd | PartialWithRequiredKeyOf<NewDmLoaiHd>;

type DmLoaiHdFormDefaults = Pick<NewDmLoaiHd, 'idLoaiHd'>;

type DmLoaiHdFormGroupContent = {
  idLoaiHd: FormControl<IDmLoaiHd['idLoaiHd'] | NewDmLoaiHd['idLoaiHd']>;
  dienGiai: FormControl<IDmLoaiHd['dienGiai']>;
  idVaiTro1: FormControl<IDmLoaiHd['idVaiTro1']>;
  idVaiTro2: FormControl<IDmLoaiHd['idVaiTro2']>;
  fileHopDong: FormControl<IDmLoaiHd['fileHopDong']>;
  srcHopDong: FormControl<IDmLoaiHd['srcHopDong']>;
  dieuKhoan: FormControl<IDmLoaiHd['dieuKhoan']>;
  idDonVi: FormControl<IDmLoaiHd['idDonVi']>;
  trangThai: FormControl<IDmLoaiHd['trangThai']>;
  ngayThaoTac: FormControl<IDmLoaiHd['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDmLoaiHd['nguoiThaoTac']>;
  srcLoiChung: FormControl<IDmLoaiHd['srcLoiChung']>;
  fileLoiChung: FormControl<IDmLoaiHd['fileLoiChung']>;
  chuyenTaiSan: FormControl<IDmLoaiHd['chuyenTaiSan']>;
  loaiSuaDoi: FormControl<IDmLoaiHd['loaiSuaDoi']>;
  loaiHuyBo: FormControl<IDmLoaiHd['loaiHuyBo']>;
  trangThaiDuyet: FormControl<IDmLoaiHd['trangThaiDuyet']>;
  idPhanLoaiHopDong: FormControl<IDmLoaiHd['idPhanLoaiHopDong']>;
  srcCv: FormControl<IDmLoaiHd['srcCv']>;
  srcTb: FormControl<IDmLoaiHd['srcTb']>;
  srcTtpc: FormControl<IDmLoaiHd['srcTtpc']>;
  dgTen: FormControl<IDmLoaiHd['dgTen']>;
  nhomTen: FormControl<IDmLoaiHd['nhomTen']>;
  idVaiTro3: FormControl<IDmLoaiHd['idVaiTro3']>;
  danhMucNhomHopDong: FormControl<IDmLoaiHd['danhMucNhomHopDong']>;
};

export type DmLoaiHdFormGroup = FormGroup<DmLoaiHdFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DmLoaiHdFormService {
  createDmLoaiHdFormGroup(dmLoaiHd: DmLoaiHdFormGroupInput = { idLoaiHd: null }): DmLoaiHdFormGroup {
    const dmLoaiHdRawValue = {
      ...this.getFormDefaults(),
      ...dmLoaiHd,
    };
    return new FormGroup<DmLoaiHdFormGroupContent>({
      idLoaiHd: new FormControl(
        { value: dmLoaiHdRawValue.idLoaiHd, disabled: dmLoaiHdRawValue.idLoaiHd !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(dmLoaiHdRawValue.dienGiai),
      idVaiTro1: new FormControl(dmLoaiHdRawValue.idVaiTro1),
      idVaiTro2: new FormControl(dmLoaiHdRawValue.idVaiTro2),
      fileHopDong: new FormControl(dmLoaiHdRawValue.fileHopDong),
      srcHopDong: new FormControl(dmLoaiHdRawValue.srcHopDong),
      dieuKhoan: new FormControl(dmLoaiHdRawValue.dieuKhoan),
      idDonVi: new FormControl(dmLoaiHdRawValue.idDonVi),
      trangThai: new FormControl(dmLoaiHdRawValue.trangThai),
      ngayThaoTac: new FormControl(dmLoaiHdRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(dmLoaiHdRawValue.nguoiThaoTac),
      srcLoiChung: new FormControl(dmLoaiHdRawValue.srcLoiChung),
      fileLoiChung: new FormControl(dmLoaiHdRawValue.fileLoiChung),
      chuyenTaiSan: new FormControl(dmLoaiHdRawValue.chuyenTaiSan),
      loaiSuaDoi: new FormControl(dmLoaiHdRawValue.loaiSuaDoi),
      loaiHuyBo: new FormControl(dmLoaiHdRawValue.loaiHuyBo),
      trangThaiDuyet: new FormControl(dmLoaiHdRawValue.trangThaiDuyet),
      idPhanLoaiHopDong: new FormControl(dmLoaiHdRawValue.idPhanLoaiHopDong),
      srcCv: new FormControl(dmLoaiHdRawValue.srcCv),
      srcTb: new FormControl(dmLoaiHdRawValue.srcTb),
      srcTtpc: new FormControl(dmLoaiHdRawValue.srcTtpc),
      dgTen: new FormControl(dmLoaiHdRawValue.dgTen),
      nhomTen: new FormControl(dmLoaiHdRawValue.nhomTen),
      idVaiTro3: new FormControl(dmLoaiHdRawValue.idVaiTro3),
      danhMucNhomHopDong: new FormControl(dmLoaiHdRawValue.danhMucNhomHopDong),
    });
  }

  getDmLoaiHd(form: DmLoaiHdFormGroup): IDmLoaiHd | NewDmLoaiHd {
    return form.getRawValue() as IDmLoaiHd | NewDmLoaiHd;
  }

  resetForm(form: DmLoaiHdFormGroup, dmLoaiHd: DmLoaiHdFormGroupInput): void {
    const dmLoaiHdRawValue = { ...this.getFormDefaults(), ...dmLoaiHd };
    form.reset(
      {
        ...dmLoaiHdRawValue,
        idLoaiHd: { value: dmLoaiHdRawValue.idLoaiHd, disabled: dmLoaiHdRawValue.idLoaiHd !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmLoaiHdFormDefaults {
    return {
      idLoaiHd: null,
    };
  }
}
