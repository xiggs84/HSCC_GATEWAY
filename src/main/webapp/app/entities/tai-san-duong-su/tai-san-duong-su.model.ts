import dayjs from 'dayjs/esm';
import { IDuongSu } from 'app/entities/duong-su/duong-su.model';

export interface ITaiSanDuongSu {
  id: number;
  idTaiSan?: number | null;
  trangThai?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  idHopDong?: number | null;
  idLoaiHopDong?: number | null;
  idChungThuc?: number | null;
  duongSu?: IDuongSu | null;
}

export type NewTaiSanDuongSu = Omit<ITaiSanDuongSu, 'id'> & { id: null };
