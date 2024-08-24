import dayjs from 'dayjs/esm';

export interface IDuongSu {
  id: number;
  idDuongSu?: number | null;
  tenDuongSu?: string | null;
  idLoaiDs?: number | null;
  diaChi?: string | null;
  trangThai?: number | null;
  thongTinDs?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDsGoc?: number | null;
  idTinhTrang?: number | null;
  idMaster?: string | null;
  idDonVi?: number | null;
  strSearch?: string | null;
  soGiayTo?: string | null;
  idLoaiNganChan?: number | null;
  syncStatus?: number | null;
}

export type NewDuongSu = Omit<IDuongSu, 'id'> & { id: null };
