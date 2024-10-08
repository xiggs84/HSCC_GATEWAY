import dayjs from 'dayjs/esm';
import { IDuongSu } from 'app/entities/duong-su/duong-su.model';

export interface IDanhSachDuongSu {
  id: number;
  tenDuongSu?: string | null;
  diaChi?: string | null;
  trangThai?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDsGoc?: number | null;
  idMaster?: string | null;
  idDonVi?: number | null;
  strSearch?: string | null;
  soGiayTo?: string | null;
  idLoaiNganChan?: number | null;
  duongSu?: Pick<IDuongSu, 'idDuongSu'> | null;
}

export type NewDanhSachDuongSu = Omit<IDanhSachDuongSu, 'id'> & { id: null };
