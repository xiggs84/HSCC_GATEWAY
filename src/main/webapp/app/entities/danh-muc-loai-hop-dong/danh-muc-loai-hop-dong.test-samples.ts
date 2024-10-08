import dayjs from 'dayjs/esm';

import { IDanhMucLoaiHopDong, NewDanhMucLoaiHopDong } from './danh-muc-loai-hop-dong.model';

export const sampleWithRequiredData: IDanhMucLoaiHopDong = {
  idLoaiHd: '6b6bf927-4614-43ca-b20f-367f3c824233',
};

export const sampleWithPartialData: IDanhMucLoaiHopDong = {
  idLoaiHd: 'd36dfe08-8973-43ed-85e1-9b914fe51753',
  fileHopDong: 'loaf',
  srcHopDong: 'concerning',
  ngayThaoTac: dayjs('2024-08-20'),
  fileLoiChung: 'above',
  loaiSuaDoi: 25201,
  trangThaiDuyet: 3555,
  idPhanLoaiHopDong: 23523,
  srcCv: 'vigilant aha',
  srcTb: 'yet',
  dgTen: 'yahoo',
};

export const sampleWithFullData: IDanhMucLoaiHopDong = {
  idLoaiHd: '8accd371-1a7a-47e5-a309-1e4570542ff2',
  dienGiai: 'clot anenst',
  idVaiTro1: 27148,
  idVaiTro2: 22043,
  fileHopDong: 'surcharge but immerse',
  srcHopDong: 'furthermore muscle unto',
  dieuKhoan: 'best',
  idDonVi: 20837,
  trangThai: 8942,
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 31077,
  srcLoiChung: 'without safely',
  fileLoiChung: 'resale spiffy lure',
  chuyenTaiSan: 31424,
  loaiSuaDoi: 6768,
  loaiHuyBo: 22642,
  trangThaiDuyet: 22363,
  idPhanLoaiHopDong: 13533,
  srcCv: 'chirp',
  srcTb: 'chlorinate ugh',
  srcTtpc: 'well-informed by',
  dgTen: 'huzzah quicker work',
  nhomTen: 6508,
  idVaiTro3: 19757,
};

export const sampleWithNewData: NewDanhMucLoaiHopDong = {
  idLoaiHd: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
