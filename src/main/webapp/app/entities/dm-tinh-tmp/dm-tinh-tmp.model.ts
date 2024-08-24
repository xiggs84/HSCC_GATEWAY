export interface IDmTinhTmp {
  id: number;
  maTinh?: number | null;
  tenTinh?: string | null;
}

export type NewDmTinhTmp = Omit<IDmTinhTmp, 'id'> & { id: null };
