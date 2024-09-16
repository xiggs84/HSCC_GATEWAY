import dayjs from 'dayjs/esm';

import { ITaiSanDatNha, NewTaiSanDatNha } from './tai-san-dat-nha.model';

export const sampleWithRequiredData: ITaiSanDatNha = {
  id: 19278,
};

export const sampleWithPartialData: ITaiSanDatNha = {
  id: 30086,
  tenTaiSan: 'spoon under',
  trangThai: 20053,
  thongTinTs: 'arrive while',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 13114,
  idTsGoc: 30643,
  idDonVi: 10917,
  soHsCv: 16653,
  soCc: 27075,
  loaiNganChan: 2685,
};

export const sampleWithFullData: ITaiSanDatNha = {
  id: 31833,
  tenTaiSan: 'uh-huh',
  trangThai: 3031,
  thongTinTs: 'ugh perp yesterday',
  ghiChu: 'whoever',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 2126,
  idDuongSu: 1052,
  idTsGoc: 24480,
  maTaiSan: 'left botch',
  idLoaiNganChan: 16221,
  ngayBdNganChan: dayjs('2024-08-19'),
  ngayKtNganChan: dayjs('2024-08-19'),
  idMaster: 15937,
  strSearch: 'shred miniature anxiously',
  idDonVi: 27826,
  soHsCv: 7512,
  soCc: 31653,
  soVaoSo: 12732,
  moTa: 'er ricochet consequently',
  loaiNganChan: 28324,
};

export const sampleWithNewData: NewTaiSanDatNha = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
