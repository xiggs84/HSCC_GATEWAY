import dayjs from 'dayjs/esm';

export interface ITaiSanDuongSu {
  id: number;
  idDuongSu?: number | null;
  trangThai?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  idHopDong?: number | null;
  idLoaiHopDong?: number | null;
  idChungThuc?: number | null;
}

export type NewTaiSanDuongSu = Omit<ITaiSanDuongSu, 'id'> & { id: null };
