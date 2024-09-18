import dayjs from 'dayjs/esm';

export interface IDmDuongSu {
  idDuongSu: number;
  tenDuongSu?: string | null;
  diaChi?: string | null;
  trangThai?: number | null;
  thongTinDs?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDsGoc?: number | null;
  idMaster?: string | null;
  idDonVi?: number | null;
  strSearch?: string | null;
  soGiayTo?: string | null;
  idLoaiNganChan?: number | null;
}

export type NewDmDuongSu = Omit<IDmDuongSu, 'idDuongSu'> & { idDuongSu: null };
