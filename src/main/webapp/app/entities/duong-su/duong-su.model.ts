import dayjs from 'dayjs/esm';
import { LoaiDuongSu } from 'app/entities/enumerations/loai-duong-su.model';
import { LoaiGiayTo } from 'app/entities/enumerations/loai-giay-to.model';

export interface IDuongSu {
  idDuongSu: number;
  tenDuongSu?: string | null;
  loaiDuongSu?: keyof typeof LoaiDuongSu | null;
  diaChi?: string | null;
  soDienThoai?: string | null;
  email?: string | null;
  fax?: string | null;
  website?: string | null;
  trangThai?: number | null;
  thongTinDs?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDsGoc?: number | null;
  idMaster?: string | null;
  idDonVi?: number | null;
  strSearch?: string | null;
  loaiGiayTo?: keyof typeof LoaiGiayTo | null;
  soGiayTo?: string | null;
  ghiChu?: string | null;
  idLoaiNganChan?: number | null;
  syncStatus?: number | null;
}

export type NewDuongSu = Omit<IDuongSu, 'idDuongSu'> & { idDuongSu: null };
