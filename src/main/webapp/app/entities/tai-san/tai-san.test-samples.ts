import dayjs from 'dayjs/esm';

import { ITaiSan, NewTaiSan } from './tai-san.model';

export const sampleWithRequiredData: ITaiSan = {
  idTaiSan: 21538,
};

export const sampleWithPartialData: ITaiSan = {
  idTaiSan: 14657,
  tenTaiSan: 'regularly pish forenenst',
  trangThai: 11800,
  thongTinTs: 'when',
  idDuongSu: 5898,
  idTsGoc: 16639,
  maTaiSan: 'hoodwink statistics',
  ngayBdNganChan: dayjs('2024-08-19'),
  idMaster: 27825,
  strSearch: 'sympathetically briskly ugh',
  soHsCv: 21651,
  moTa: 'oh by',
  syncStatus: 32348,
};

export const sampleWithFullData: ITaiSan = {
  idTaiSan: 27338,
  tenTaiSan: 'anti grammar and',
  trangThai: 27139,
  thongTinTs: 'dimly',
  ghiChu: 'weigh sideline',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 3864,
  idDuongSu: 28595,
  idTsGoc: 5834,
  maTaiSan: 'boo besides',
  idLoaiNganChan: 27538,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-20'),
  idMaster: 5133,
  strSearch: 'finished hand-holding daintily',
  idDonVi: 6059,
  soHsCv: 8039,
  soCc: 2276,
  soVaoSo: 15527,
  moTa: 'grounded ugh jot',
  loaiNganChan: 11042,
  syncStatus: 14726,
};

export const sampleWithNewData: NewTaiSan = {
  idTaiSan: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
