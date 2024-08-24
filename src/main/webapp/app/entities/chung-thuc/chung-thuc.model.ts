import dayjs from 'dayjs/esm';

export interface IChungThuc {
  id: number;
  idChungThuc?: number | null;
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
  idLoaiGiayTo?: number | null;
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
}

export type NewChungThuc = Omit<IChungThuc, 'id'> & { id: null };
