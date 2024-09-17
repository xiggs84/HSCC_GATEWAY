export interface IDanhMucHuyen {
  maHuyen: string;
  tenHuyen?: string | null;
  maTinh?: string | null;
}

export type NewDanhMucHuyen = Omit<IDanhMucHuyen, 'maHuyen'> & { maHuyen: null };
