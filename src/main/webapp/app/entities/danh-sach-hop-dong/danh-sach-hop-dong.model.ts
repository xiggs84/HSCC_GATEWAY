import dayjs from 'dayjs/esm';

export interface IDanhSachHopDong {
  id: number;
  idHopDong?: number | null;
  ngayLapHd?: dayjs.Dayjs | null;
  nguoiLapHd?: number | null;
  trangThai?: number | null;
  idLoaiHd?: number | null;
  idDonVi?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  srcHopDong?: string | null;
  idSoCongChung?: number | null;
  soCongChung?: string | null;
  congChungVien?: number | null;
  soTienRutTrich?: number | null;
  hdThuCong?: number | null;
  trangThaiRutTrich?: number | null;
  chuKyNgoaiTruSo?: number | null;
  strSearch?: string | null;
  ngayText?: string | null;
  ngayRutTrichText?: string | null;
  ngayThaoTacRutTrich?: dayjs.Dayjs | null;
  thuLaoCongChung?: number | null;
  quyenLaiSt?: string | null;
  soLaiSt?: string | null;
  quyenLaiTl?: string | null;
  soLaiTl?: string | null;
  srcKySoPdf?: string | null;
  srcKySoPdfSigned?: string | null;
}

export type NewDanhSachHopDong = Omit<IDanhSachHopDong, 'id'> & { id: null };
