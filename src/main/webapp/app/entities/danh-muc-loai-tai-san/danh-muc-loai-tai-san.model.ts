export interface IDanhMucLoaiTaiSan {
  idLoaiTs: number;
  dienGiai?: string | null;
  trangThai?: number | null;
}

export type NewDanhMucLoaiTaiSan = Omit<IDanhMucLoaiTaiSan, 'idLoaiTs'> & { idLoaiTs: null };
