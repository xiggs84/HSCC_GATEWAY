export interface IDanhMucXa {
  id: number;
  maXa?: number | null;
  tenXa?: string | null;
  maHuyen?: number | null;
  trangThai?: number | null;
}

export type NewDanhMucXa = Omit<IDanhMucXa, 'id'> & { id: null };
