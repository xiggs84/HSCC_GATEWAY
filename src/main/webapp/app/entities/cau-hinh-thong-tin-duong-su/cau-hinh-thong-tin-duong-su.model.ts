export interface ICauHinhThongTinDuongSu {
  idCauHinh: number;
  noiDung?: string | null;
  javascript?: string | null;
  css?: string | null;
  idLoaiDs?: number | null;
  idDonVi?: number | null;
  trangThai?: number | null;
}

export type NewCauHinhThongTinDuongSu = Omit<ICauHinhThongTinDuongSu, 'idCauHinh'> & { idCauHinh: null };
