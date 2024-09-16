import dayjs from 'dayjs/esm';

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
}

export type NewTaiSanDgc = Omit<ITaiSanDgc, 'id'> & { id: null };
