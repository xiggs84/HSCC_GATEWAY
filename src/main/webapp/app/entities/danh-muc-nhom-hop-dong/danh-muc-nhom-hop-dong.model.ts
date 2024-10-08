export interface IDanhMucNhomHopDong {
  idNhom: string;
  dienGiai?: string | null;
}

export type NewDanhMucNhomHopDong = Omit<IDanhMucNhomHopDong, 'idNhom'> & { idNhom: null };
