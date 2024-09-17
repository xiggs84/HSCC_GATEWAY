export interface IDanhMucXa {
  maXa: string;
  tenXa?: string | null;
  maHuyen?: string | null;
}

export type NewDanhMucXa = Omit<IDanhMucXa, 'maXa'> & { maXa: null };
