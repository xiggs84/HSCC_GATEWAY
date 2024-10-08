import dayjs from 'dayjs/esm';
import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { ITinhTrangTaiSan } from 'app/entities/tinh-trang-tai-san/tinh-trang-tai-san.model';

export interface ITaiSanDgc {
  id: number;
  tenTaiSan?: string | null;
  trangThai?: number | null;
  thongTinTs?: string | null;
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
  taiSan?: Pick<ITaiSan, 'idTaiSan'> | null;
  danhMucLoaiTaiSan?: Pick<IDanhMucLoaiTaiSan, 'idLoaiTs'> | null;
  tinhTrangTaiSan?: Pick<ITinhTrangTaiSan, 'idTinhTrang'> | null;
}

export type NewTaiSanDgc = Omit<ITaiSanDgc, 'id'> & { id: null };
