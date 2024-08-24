import dayjs from 'dayjs/esm';

export interface IDanhSachChungThuc {
  id: number;
  idChungThuc?: number | null;
  idDonVi?: number | null;
  nguoiChungThuc?: number | null;
  nguoiThaoTac?: number | null;
  ngayChungThuc?: dayjs.Dayjs | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  trangThai?: number | null;
  idLoaiGiayTo?: number | null;
  quyenSo?: number | null;
  srcChungThuc?: string | null;
  chuKyNgoaiTruSo?: number | null;
  ngayText?: string | null;
  strSearch?: string | null;
  soTienThu?: number | null;
  ldPheDuyet?: number | null;
}

export type NewDanhSachChungThuc = Omit<IDanhSachChungThuc, 'id'> & { id: null };
