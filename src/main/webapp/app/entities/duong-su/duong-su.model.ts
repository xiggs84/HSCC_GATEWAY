import dayjs from 'dayjs/esm';
import { ILoaiDuongSu } from 'app/entities/loai-duong-su/loai-duong-su.model';
import { ILoaiGiayTo } from 'app/entities/loai-giay-to/loai-giay-to.model';

export interface IDuongSu {
  idDuongSu: number;
  tenDuongSu?: string | null;
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
  soGiayTo?: string | null;
  ghiChu?: string | null;
  idLoaiNganChan?: number | null;
  syncStatus?: number | null;
  loaiDuongSu?: Pick<ILoaiDuongSu, 'idLoaiDuongSu'> | null;
  loaiGiayTo?: Pick<ILoaiGiayTo, 'idLoaiGiayTo'> | null;
}

export type NewDuongSu = Omit<IDuongSu, 'idDuongSu'> & { idDuongSu: null };
