import dayjs from 'dayjs/esm';
import { IDanhMucLoaiGiayToChungThuc } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/danh-muc-loai-giay-to-chung-thuc.model';

export interface IDanhSachChungThuc {
  idChungThuc: string;
  idDonVi?: number | null;
  nguoiChungThuc?: number | null;
  nguoiThaoTac?: number | null;
  ngayChungThuc?: dayjs.Dayjs | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  trangThai?: number | null;
  quyenSo?: number | null;
  srcChungThuc?: string | null;
  chuKyNgoaiTruSo?: number | null;
  ngayText?: string | null;
  strSearch?: string | null;
  soTienThu?: number | null;
  ldPheDuyet?: number | null;
  danhMucLoaiGiayToChungThuc?: Pick<IDanhMucLoaiGiayToChungThuc, 'idLoaiGiayTo'> | null;
}

export type NewDanhSachChungThuc = Omit<IDanhSachChungThuc, 'idChungThuc'> & { idChungThuc: null };
