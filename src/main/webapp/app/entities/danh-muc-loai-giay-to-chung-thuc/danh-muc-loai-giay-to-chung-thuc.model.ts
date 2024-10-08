export interface IDanhMucLoaiGiayToChungThuc {
  idLoaiGiayTo: string;
  dienGiai?: string | null;
}

export type NewDanhMucLoaiGiayToChungThuc = Omit<IDanhMucLoaiGiayToChungThuc, 'idLoaiGiayTo'> & { idLoaiGiayTo: null };
