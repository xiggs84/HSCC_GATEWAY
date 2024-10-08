import dayjs from 'dayjs/esm';
import { IDuongSu } from 'app/entities/duong-su/duong-su.model';

export interface IDuongSuTrungCmndBak {
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
  duongSu?: Pick<IDuongSu, 'idDuongSu'> | null;
}

export type NewDuongSuTrungCmndBak = Omit<IDuongSuTrungCmndBak, 'id'> & { id: null };
