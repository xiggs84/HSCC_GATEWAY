import dayjs from 'dayjs/esm';

import { ITaiSan, NewTaiSan } from './tai-san.model';

export const sampleWithRequiredData: ITaiSan = {
  id: 1280,
};

export const sampleWithPartialData: ITaiSan = {
  id: 2763,
  idTaiSan: 6933,
  thongTinTs: 'charter',
  ghiChu: 'clank tone',
  maTaiSan: 'upstage gah',
  idLoaiNganChan: 19656,
  strSearch: 'rock deceivingly',
  soHsCv: 12822,
  soCc: 3532,
  syncStatus: 4760,
};

export const sampleWithFullData: ITaiSan = {
  id: 767,
  idTaiSan: 30761,
  tenTaiSan: 'underneath',
  trangThai: 31123,
  thongTinTs: 'where for incidentally',
  idLoaiTs: 30144,
  ghiChu: 'masculine mammoth',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 22185,
  idDuongSu: 19360,
  idTsGoc: 16583,
  maTaiSan: 'yet',
  idTinhTrang: 27732,
  idLoaiNganChan: 11649,
  ngayBdNganChan: dayjs('2024-08-20'),
  ngayKtNganChan: dayjs('2024-08-19'),
  idMaster: 14515,
  strSearch: 'discourse elaborate',
  idDonVi: 20968,
  soHsCv: 18627,
  soCc: 20372,
  soVaoSo: 21403,
  moTa: 'ha glittering',
  loaiNganChan: 4590,
  syncStatus: 31242,
};

export const sampleWithNewData: NewTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
