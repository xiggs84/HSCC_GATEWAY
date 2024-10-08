import dayjs from 'dayjs/esm';
import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';

export interface IDanhSachHopDong {
  idHopDong: string;
  ngayLapHd?: dayjs.Dayjs | null;
  nguoiLapHd?: number | null;
  trangThai?: number | null;
  idDonVi?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  srcHopDong?: string | null;
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
  danhMucLoaiHopDong?: Pick<IDanhMucLoaiHopDong, 'idLoaiHd'> | null;
  soCongChung?: Pick<ISoCongChung, 'idSo'> | null;
}

export type NewDanhSachHopDong = Omit<IDanhSachHopDong, 'idHopDong'> & { idHopDong: null };
