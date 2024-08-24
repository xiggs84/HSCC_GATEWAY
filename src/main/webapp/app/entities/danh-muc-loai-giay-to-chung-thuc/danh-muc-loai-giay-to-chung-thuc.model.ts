export interface IDanhMucLoaiGiayToChungThuc {
  id: number;
  idLoaiGiayTo?: number | null;
  dienGiai?: string | null;
}

export type NewDanhMucLoaiGiayToChungThuc = Omit<IDanhMucLoaiGiayToChungThuc, 'id'> & { id: null };
