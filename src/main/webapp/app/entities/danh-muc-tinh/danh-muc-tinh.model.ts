export interface IDanhMucTinh {
  maTinh: string;
  tenTinh?: string | null;
}

export type NewDanhMucTinh = Omit<IDanhMucTinh, 'maTinh'> & { maTinh: null };
