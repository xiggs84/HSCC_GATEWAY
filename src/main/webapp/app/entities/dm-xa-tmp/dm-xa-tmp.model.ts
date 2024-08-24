export interface IDmXaTmp {
  id: number;
  maXa?: number | null;
  tenXa?: string | null;
  maHuyen?: number | null;
}

export type NewDmXaTmp = Omit<IDmXaTmp, 'id'> & { id: null };
