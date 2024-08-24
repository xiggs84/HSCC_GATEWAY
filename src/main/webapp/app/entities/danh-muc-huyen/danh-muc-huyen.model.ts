export interface IDanhMucHuyen {
  id: number;
  maHuyen?: number | null;
  tenHuyen?: string | null;
  maTinh?: number | null;
  trangThai?: number | null;
}

export type NewDanhMucHuyen = Omit<IDanhMucHuyen, 'id'> & { id: null };
