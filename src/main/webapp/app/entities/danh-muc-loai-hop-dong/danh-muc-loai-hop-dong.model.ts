import dayjs from 'dayjs/esm';
import { IDanhMucNhomHopDong } from 'app/entities/danh-muc-nhom-hop-dong/danh-muc-nhom-hop-dong.model';

export interface IDanhMucLoaiHopDong {
  idLoaiHd: string;
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
  fileLoiChung?: string | null;
  chuyenTaiSan?: number | null;
  loaiSuaDoi?: number | null;
  loaiHuyBo?: number | null;
  trangThaiDuyet?: number | null;
  idPhanLoaiHopDong?: number | null;
  srcCv?: string | null;
  srcTb?: string | null;
  srcTtpc?: string | null;
  dgTen?: string | null;
  nhomTen?: number | null;
  idVaiTro3?: number | null;
  danhMucNhomHopDong?: Pick<IDanhMucNhomHopDong, 'idNhom'> | null;
}

export type NewDanhMucLoaiHopDong = Omit<IDanhMucLoaiHopDong, 'idLoaiHd'> & { idLoaiHd: null };
