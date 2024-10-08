import dayjs from 'dayjs/esm';
import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';

export interface IThongTinChungHopDong {
  id: number;
  idHopDong?: string | null;
  ngayLapHd?: dayjs.Dayjs | null;
  nguoiLapHd?: number | null;
  thongTinVanBan?: string | null;
  trangThai?: number | null;
  dieuKhoanHd?: string | null;
  idDonVi?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idHdGoc?: number | null;
  maHopDong?: string | null;
  srcHopDong?: string | null;
  ngayHen?: dayjs.Dayjs | null;
  congChungVien?: number | null;
  ngayKyHd?: dayjs.Dayjs | null;
  nguoiRutTrich?: number | null;
  soTienRutTrich?: number | null;
  ngayRutTrich?: dayjs.Dayjs | null;
  hdThuCong?: number | null;
  trangThaiRutTrich?: number | null;
  chuKyNgoaiTruSo?: number | null;
  strSearch?: string | null;
  idMaster?: number | null;
  idHdSdHb?: number | null;
  srcDmMaster?: string | null;
  repRefUnique?: number | null;
  ngayText?: string | null;
  thongTinChung?: string | null;
  thongTinChungClob?: string | null;
  danhMucLoaiHopDong?: Pick<IDanhMucLoaiHopDong, 'idLoaiHd'> | null;
  soCongChung?: Pick<ISoCongChung, 'idSo'> | null;
}

export type NewThongTinChungHopDong = Omit<IThongTinChungHopDong, 'id'> & { id: null };
