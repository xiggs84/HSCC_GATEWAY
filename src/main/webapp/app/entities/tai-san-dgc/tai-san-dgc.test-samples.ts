import dayjs from 'dayjs/esm';

import { ITaiSanDgc, NewTaiSanDgc } from './tai-san-dgc.model';

export const sampleWithRequiredData: ITaiSanDgc = {
  id: 20256,
};

export const sampleWithPartialData: ITaiSanDgc = {
  id: 29312,
  trangThai: 31797,
  thongTinTs: 'finally near',
  ghiChu: 'perfectly throughout distorted',
  nguoiThaoTac: 5860,
  idDuongSu: 28015,
  idTsGoc: 25983,
  idLoaiNganChan: 26927,
  ngayBdNganChan: dayjs('2024-08-19'),
  idMaster: 16501,
  strSearch: 'vivaciously where enliven',
  idDonVi: 30798,
  moTa: 'secondary beside meh',
};

export const sampleWithFullData: ITaiSanDgc = {
  id: 11741,
  tenTaiSan: 'inspire gratefully well',
  trangThai: 30676,
  thongTinTs: 'windy inborn elude',
  ghiChu: 'evergreen gratefully geez',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 18758,
  idDuongSu: 21049,
  idTsGoc: 18621,
  maTaiSan: 'via',
  idLoaiNganChan: 13702,
  ngayBdNganChan: dayjs('2024-08-20'),
  ngayKtNganChan: dayjs('2024-08-19'),
  idMaster: 20562,
  strSearch: 'zowie seldom fooey',
  idDonVi: 15230,
  soHsCv: 826,
  soCc: 10268,
  soVaoSo: 27324,
  moTa: 'band',
};

export const sampleWithNewData: NewTaiSanDgc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
