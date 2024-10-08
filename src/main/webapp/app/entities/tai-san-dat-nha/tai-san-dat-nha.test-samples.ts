import dayjs from 'dayjs/esm';

import { ITaiSanDatNha, NewTaiSanDatNha } from './tai-san-dat-nha.model';

export const sampleWithRequiredData: ITaiSanDatNha = {
  id: 25592,
};

export const sampleWithPartialData: ITaiSanDatNha = {
  id: 31020,
  ghiChu: 'hmph',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 11133,
  idDuongSu: 10111,
  maTaiSan: 'extroverted',
  idLoaiNganChan: 25516,
  ngayBdNganChan: dayjs('2024-08-20'),
  ngayKtNganChan: dayjs('2024-08-20'),
  strSearch: 'though zowie',
  idDonVi: 4949,
  soCc: 30817,
  moTa: 'save among',
};

export const sampleWithFullData: ITaiSanDatNha = {
  id: 13448,
  tenTaiSan: 'until',
  trangThai: 30562,
  thongTinTs: 'including rapidly uh-huh',
  ghiChu: 'aw male volcano',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 4821,
  idDuongSu: 24544,
  idTsGoc: 31601,
  maTaiSan: 'even bid',
  idLoaiNganChan: 17082,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-19'),
  idMaster: 21157,
  strSearch: 'spattering um decimal',
  idDonVi: 24462,
  soHsCv: 22577,
  soCc: 2100,
  soVaoSo: 30080,
  moTa: 'consequently',
  loaiNganChan: 27672,
};

export const sampleWithNewData: NewTaiSanDatNha = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
