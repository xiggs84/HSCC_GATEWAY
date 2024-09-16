import dayjs from 'dayjs/esm';

import { ITaiSanDgc, NewTaiSanDgc } from './tai-san-dgc.model';

export const sampleWithRequiredData: ITaiSanDgc = {
  id: 13172,
};

export const sampleWithPartialData: ITaiSanDgc = {
  id: 9340,
  tenTaiSan: 'advance blah',
  trangThai: 15094,
  ghiChu: 'derive more hostel',
  nguoiThaoTac: 5479,
  idLoaiNganChan: 22809,
  ngayKtNganChan: dayjs('2024-08-19'),
  strSearch: 'tenderise midst',
  idDonVi: 16120,
  soHsCv: 17671,
  soCc: 18785,
  soVaoSo: 2685,
};

export const sampleWithFullData: ITaiSanDgc = {
  id: 15326,
  tenTaiSan: 'fiesta polite frantically',
  trangThai: 26509,
  thongTinTs: 'nor mmm',
  ghiChu: 'drat oxygen',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 6651,
  idDuongSu: 22461,
  idTsGoc: 18685,
  maTaiSan: 'whether aw cautiously',
  idLoaiNganChan: 25607,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-19'),
  idMaster: 20968,
  strSearch: 'drat',
  idDonVi: 5018,
  soHsCv: 24956,
  soCc: 6301,
  soVaoSo: 164,
  moTa: 'toward till',
};

export const sampleWithNewData: NewTaiSanDgc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
