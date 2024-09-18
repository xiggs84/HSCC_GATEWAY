import { IDuongSu } from 'app/entities/duong-su/duong-su.model';

export interface IQuanHeDuongSu {
  idQuanHe: number;
  idDuongSuQh?: number | null;
  thongTinQuanHe?: string | null;
  trangThai?: number | null;
  duongSu?: IDuongSu | null;
}

export type NewQuanHeDuongSu = Omit<IQuanHeDuongSu, 'idQuanHe'> & { idQuanHe: null };
