export interface IThuaTach {
  idThuaTach: number;
  thongTinThuaTach?: string | null;
  trangThai?: number | null;
}

export type NewThuaTach = Omit<IThuaTach, 'idThuaTach'> & { idThuaTach: null };
