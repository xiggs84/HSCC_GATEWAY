import dayjs from 'dayjs/esm';
import { IDuongSu } from 'app/entities/duong-su/duong-su.model';

export interface IDuongSuTrungCmnd {
  id: number;
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
  idDuongSuMin?: number | null;
  idMasterMin?: number | null;
  idDuongSuMax?: number | null;
  idMasterMax?: number | null;
  duongSu?: Pick<IDuongSu, 'idDuongSu'> | null;
}

export type NewDuongSuTrungCmnd = Omit<IDuongSuTrungCmnd, 'id'> & { id: null };
