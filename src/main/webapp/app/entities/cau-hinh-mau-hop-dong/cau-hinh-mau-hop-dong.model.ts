import dayjs from 'dayjs/esm';

export interface ICauHinhMauHopDong {
  id: number;
  idLoaiHd?: string | null;
  dienGiai?: string | null;
  idVaiTro1?: number | null;
  idVaiTro2?: number | null;
  fileHopDong?: string | null;
  srcHopDong?: string | null;
  dieuKhoan?: string | null;
  idDonVi?: number | null;
  trangThai?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  srcLoiChung?: string | null;
  idNhom?: number | null;
  fileLoiChung?: string | null;
  chuyenTaiSan?: number | null;
  loaiSuaDoi?: number | null;
  loaiHuyBo?: number | null;
  trangThaiDuyet?: number | null;
  idPhanLoaiHopDong?: number | null;
  srcCv?: string | null;
  srcTb?: string | null;
  srcTtpc?: string | null;
  idVaiTro3?: number | null;
}

export type NewCauHinhMauHopDong = Omit<ICauHinhMauHopDong, 'id'> & { id: null };
