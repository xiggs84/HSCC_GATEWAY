export interface IDanhMucLoaiSoCongChung {
  idLoai: string;
  tenLoai?: string | null;
  trangThai?: number | null;
}

export type NewDanhMucLoaiSoCongChung = Omit<IDanhMucLoaiSoCongChung, 'idLoai'> & { idLoai: null };
