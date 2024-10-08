import dayjs from 'dayjs/esm';
import { IDanhMucLoaiGiayToChungThuc } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/danh-muc-loai-giay-to-chung-thuc.model';

export interface IChungThuc {
  idChungThuc: string;
  idDonVi?: number | null;
  nguoiYeuCau?: string | null;
  nguoiChungThuc?: number | null;
  nguoiThaoTac?: number | null;
  ngayChungThuc?: dayjs.Dayjs | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  soTienThu?: number | null;
  soBanSao?: number | null;
  vanBan?: string | null;
  trangThai?: number | null;
  quyenSo?: number | null;
  duongSu?: string | null;
  taiSan?: string | null;
  strSearch?: string | null;
  srcChungThuc?: string | null;
  thongTinChungThuc?: string | null;
  chuKyNgoaiTruSo?: number | null;
  idCtGoc?: number | null;
  ngayText?: string | null;
  chucDanhCanBo?: string | null;
  ldPheDuyet?: number | null;
  chucDanhLd?: string | null;
  danhMucLoaiGiayToChungThuc?: Pick<IDanhMucLoaiGiayToChungThuc, 'idLoaiGiayTo'> | null;
}

export type NewChungThuc = Omit<IChungThuc, 'idChungThuc'> & { idChungThuc: null };
