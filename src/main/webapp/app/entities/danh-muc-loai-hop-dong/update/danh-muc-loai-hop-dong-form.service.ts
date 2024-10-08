import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDanhMucLoaiHopDong, NewDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { idLoaiHd: unknown }> = Partial<Omit<T, 'idLoaiHd'>> & { idLoaiHd: T['idLoaiHd'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucLoaiHopDong for edit and NewDanhMucLoaiHopDongFormGroupInput for create.
 */
type DanhMucLoaiHopDongFormGroupInput = IDanhMucLoaiHopDong | PartialWithRequiredKeyOf<NewDanhMucLoaiHopDong>;

type DanhMucLoaiHopDongFormDefaults = Pick<NewDanhMucLoaiHopDong, 'idLoaiHd'>;

type DanhMucLoaiHopDongFormGroupContent = {
  idLoaiHd: FormControl<IDanhMucLoaiHopDong['idLoaiHd'] | NewDanhMucLoaiHopDong['idLoaiHd']>;
  dienGiai: FormControl<IDanhMucLoaiHopDong['dienGiai']>;
  idVaiTro1: FormControl<IDanhMucLoaiHopDong['idVaiTro1']>;
  idVaiTro2: FormControl<IDanhMucLoaiHopDong['idVaiTro2']>;
  fileHopDong: FormControl<IDanhMucLoaiHopDong['fileHopDong']>;
  srcHopDong: FormControl<IDanhMucLoaiHopDong['srcHopDong']>;
  dieuKhoan: FormControl<IDanhMucLoaiHopDong['dieuKhoan']>;
  idDonVi: FormControl<IDanhMucLoaiHopDong['idDonVi']>;
  trangThai: FormControl<IDanhMucLoaiHopDong['trangThai']>;
  ngayThaoTac: FormControl<IDanhMucLoaiHopDong['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDanhMucLoaiHopDong['nguoiThaoTac']>;
  srcLoiChung: FormControl<IDanhMucLoaiHopDong['srcLoiChung']>;
  fileLoiChung: FormControl<IDanhMucLoaiHopDong['fileLoiChung']>;
  chuyenTaiSan: FormControl<IDanhMucLoaiHopDong['chuyenTaiSan']>;
  loaiSuaDoi: FormControl<IDanhMucLoaiHopDong['loaiSuaDoi']>;
  loaiHuyBo: FormControl<IDanhMucLoaiHopDong['loaiHuyBo']>;
  trangThaiDuyet: FormControl<IDanhMucLoaiHopDong['trangThaiDuyet']>;
  idPhanLoaiHopDong: FormControl<IDanhMucLoaiHopDong['idPhanLoaiHopDong']>;
  srcCv: FormControl<IDanhMucLoaiHopDong['srcCv']>;
  srcTb: FormControl<IDanhMucLoaiHopDong['srcTb']>;
  srcTtpc: FormControl<IDanhMucLoaiHopDong['srcTtpc']>;
  dgTen: FormControl<IDanhMucLoaiHopDong['dgTen']>;
  nhomTen: FormControl<IDanhMucLoaiHopDong['nhomTen']>;
  idVaiTro3: FormControl<IDanhMucLoaiHopDong['idVaiTro3']>;
  danhMucNhomHopDong: FormControl<IDanhMucLoaiHopDong['danhMucNhomHopDong']>;
};

export type DanhMucLoaiHopDongFormGroup = FormGroup<DanhMucLoaiHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucLoaiHopDongFormService {
  createDanhMucLoaiHopDongFormGroup(
    danhMucLoaiHopDong: DanhMucLoaiHopDongFormGroupInput = { idLoaiHd: null },
  ): DanhMucLoaiHopDongFormGroup {
    const danhMucLoaiHopDongRawValue = {
      ...this.getFormDefaults(),
      ...danhMucLoaiHopDong,
    };
    return new FormGroup<DanhMucLoaiHopDongFormGroupContent>({
      idLoaiHd: new FormControl(
        { value: danhMucLoaiHopDongRawValue.idLoaiHd, disabled: danhMucLoaiHopDongRawValue.idLoaiHd !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dienGiai: new FormControl(danhMucLoaiHopDongRawValue.dienGiai),
      idVaiTro1: new FormControl(danhMucLoaiHopDongRawValue.idVaiTro1),
      idVaiTro2: new FormControl(danhMucLoaiHopDongRawValue.idVaiTro2),
      fileHopDong: new FormControl(danhMucLoaiHopDongRawValue.fileHopDong),
      srcHopDong: new FormControl(danhMucLoaiHopDongRawValue.srcHopDong),
      dieuKhoan: new FormControl(danhMucLoaiHopDongRawValue.dieuKhoan),
      idDonVi: new FormControl(danhMucLoaiHopDongRawValue.idDonVi),
      trangThai: new FormControl(danhMucLoaiHopDongRawValue.trangThai),
      ngayThaoTac: new FormControl(danhMucLoaiHopDongRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(danhMucLoaiHopDongRawValue.nguoiThaoTac),
      srcLoiChung: new FormControl(danhMucLoaiHopDongRawValue.srcLoiChung),
      fileLoiChung: new FormControl(danhMucLoaiHopDongRawValue.fileLoiChung),
      chuyenTaiSan: new FormControl(danhMucLoaiHopDongRawValue.chuyenTaiSan),
      loaiSuaDoi: new FormControl(danhMucLoaiHopDongRawValue.loaiSuaDoi),
      loaiHuyBo: new FormControl(danhMucLoaiHopDongRawValue.loaiHuyBo),
      trangThaiDuyet: new FormControl(danhMucLoaiHopDongRawValue.trangThaiDuyet),
      idPhanLoaiHopDong: new FormControl(danhMucLoaiHopDongRawValue.idPhanLoaiHopDong),
      srcCv: new FormControl(danhMucLoaiHopDongRawValue.srcCv),
      srcTb: new FormControl(danhMucLoaiHopDongRawValue.srcTb),
      srcTtpc: new FormControl(danhMucLoaiHopDongRawValue.srcTtpc),
      dgTen: new FormControl(danhMucLoaiHopDongRawValue.dgTen),
      nhomTen: new FormControl(danhMucLoaiHopDongRawValue.nhomTen),
      idVaiTro3: new FormControl(danhMucLoaiHopDongRawValue.idVaiTro3),
      danhMucNhomHopDong: new FormControl(danhMucLoaiHopDongRawValue.danhMucNhomHopDong),
    });
  }

  getDanhMucLoaiHopDong(form: DanhMucLoaiHopDongFormGroup): IDanhMucLoaiHopDong | NewDanhMucLoaiHopDong {
    return form.getRawValue() as IDanhMucLoaiHopDong | NewDanhMucLoaiHopDong;
  }

  resetForm(form: DanhMucLoaiHopDongFormGroup, danhMucLoaiHopDong: DanhMucLoaiHopDongFormGroupInput): void {
    const danhMucLoaiHopDongRawValue = { ...this.getFormDefaults(), ...danhMucLoaiHopDong };
    form.reset(
      {
        ...danhMucLoaiHopDongRawValue,
        idLoaiHd: { value: danhMucLoaiHopDongRawValue.idLoaiHd, disabled: danhMucLoaiHopDongRawValue.idLoaiHd !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucLoaiHopDongFormDefaults {
    return {
      idLoaiHd: null,
    };
  }
}
