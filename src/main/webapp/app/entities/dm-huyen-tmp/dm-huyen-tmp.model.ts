export interface IDmHuyenTmp {
  id: number;
  maHuyen?: number | null;
  tenHuyen?: string | null;
  maTinh?: number | null;
}

export type NewDmHuyenTmp = Omit<IDmHuyenTmp, 'id'> & { id: null };
