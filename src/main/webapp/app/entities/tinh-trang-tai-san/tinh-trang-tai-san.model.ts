export interface ITinhTrangTaiSan {
  idTinhTrang: number;
  dienGiai?: string | null;
  trangThai?: number | null;
}

export type NewTinhTrangTaiSan = Omit<ITinhTrangTaiSan, 'idTinhTrang'> & { idTinhTrang: null };
