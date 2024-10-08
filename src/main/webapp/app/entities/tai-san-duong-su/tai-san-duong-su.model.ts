import dayjs from 'dayjs/esm';
import { IDuongSu } from 'app/entities/duong-su/duong-su.model';
import { ITaiSan } from 'app/entities/tai-san/tai-san.model';

export interface ITaiSanDuongSu {
  id: number;
  idTaiSan?: number | null;
  trangThai?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  idHopDong?: number | null;
  idLoaiHopDong?: number | null;
  idChungThuc?: number | null;
  duongSu?: Pick<IDuongSu, 'idDuongSu'> | null;
  taiSan?: Pick<ITaiSan, 'idTaiSan'> | null;
}

export type NewTaiSanDuongSu = Omit<ITaiSanDuongSu, 'id'> & { id: null };
