import dayjs from 'dayjs/esm';

import { ICauHinhMauHopDong, NewCauHinhMauHopDong } from './cau-hinh-mau-hop-dong.model';

export const sampleWithRequiredData: ICauHinhMauHopDong = {
  id: 11659,
};

export const sampleWithPartialData: ICauHinhMauHopDong = {
  id: 26609,
  idLoaiHd: 'grubby ultimately gall-bladder',
  idVaiTro1: 15181,
  idVaiTro2: 12135,
  trangThai: 6875,
  ngayThaoTac: dayjs('2024-08-19'),
  srcLoiChung: 'enrich supposing',
  idNhom: 30967,
  chuyenTaiSan: 21977,
  loaiSuaDoi: 14044,
  loaiHuyBo: 4536,
  idPhanLoaiHopDong: 10776,
};

export const sampleWithFullData: ICauHinhMauHopDong = {
  id: 3715,
  idLoaiHd: 'empowerment cockpit alongside',
  dienGiai: 'alongside',
  idVaiTro1: 24612,
  idVaiTro2: 16352,
  fileHopDong: 'shoreline',
  srcHopDong: 'filthy gesticulate fulminate',
  dieuKhoan: 'crossly quadruple radiator',
  idDonVi: 6415,
  trangThai: 15791,
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 24504,
  srcLoiChung: 'if brain fairly',
  idNhom: 18111,
  fileLoiChung: 'boo',
  chuyenTaiSan: 19877,
  loaiSuaDoi: 9545,
  loaiHuyBo: 32438,
  trangThaiDuyet: 13817,
  idPhanLoaiHopDong: 717,
  srcCv: 'although stallion',
  srcTb: 'fondly generally',
  srcTtpc: 'ew',
  idVaiTro3: 16371,
};

export const sampleWithNewData: NewCauHinhMauHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
