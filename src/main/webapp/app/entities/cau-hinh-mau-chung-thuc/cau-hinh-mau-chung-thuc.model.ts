import dayjs from 'dayjs/esm';

export interface ICauHinhMauChungThuc {
  id: number;
  idLoai?: string | null;
  dienGiai?: string | null;
  khungGia?: number | null;
  hasBenB?: number | null;
  hasTaiSan?: number | null;
  trangThai?: number | null;
  fileChungThuc?: string | null;
  srcChungThuc?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDonVi?: number | null;
  idLoaiSo?: number | null;
}

export type NewCauHinhMauChungThuc = Omit<ICauHinhMauChungThuc, 'id'> & { id: null };
