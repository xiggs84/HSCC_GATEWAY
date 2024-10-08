export interface ILoaiHopDongCongChung {
  idLoaiHopDongCongChung: string;
  dienGiai?: string | null;
  giaTri?: number | null;
  trangThai?: number | null;
}

export type NewLoaiHopDongCongChung = Omit<ILoaiHopDongCongChung, 'idLoaiHopDongCongChung'> & { idLoaiHopDongCongChung: null };
