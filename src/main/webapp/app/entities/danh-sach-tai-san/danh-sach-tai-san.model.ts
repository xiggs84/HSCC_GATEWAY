import dayjs from 'dayjs/esm';
import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';

export interface IDanhSachTaiSan {
  id: number;
  tenTaiSan?: string | null;
  trangThai?: number | null;
  ghiChu?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDuongSu?: number | null;
  idTsGoc?: number | null;
  maTaiSan?: string | null;
  idLoaiNganChan?: number | null;
  ngayBdNganChan?: dayjs.Dayjs | null;
  ngayKtNganChan?: dayjs.Dayjs | null;
  idMaster?: number | null;
  strSearch?: string | null;
  idDonVi?: number | null;
  soHsCv?: number | null;
  soCc?: number | null;
  soVaoSo?: number | null;
  moTa?: string | null;
  loaiNganChan?: number | null;
  maXa?: string | null;
  danhMucLoaiTaiSan?: Pick<IDanhMucLoaiTaiSan, 'idLoaiTs'> | null;
}

export type NewDanhSachTaiSan = Omit<IDanhSachTaiSan, 'id'> & { id: null };
