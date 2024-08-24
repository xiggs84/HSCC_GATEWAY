import dayjs from 'dayjs/esm';

import { IDuongSuTrungCmndBak, NewDuongSuTrungCmndBak } from './duong-su-trung-cmnd-bak.model';

export const sampleWithRequiredData: IDuongSuTrungCmndBak = {
  id: 13736,
};

export const sampleWithPartialData: IDuongSuTrungCmndBak = {
  id: 18462,
  idLoaiDs: 8571,
  diaChi: 'quiche distend',
  thongTinDs: 'after proposition',
  ngayThaoTac: dayjs('2024-08-19'),
  idDonVi: 7865,
  soGiayTo: 'hmph scholarly',
};

export const sampleWithFullData: IDuongSuTrungCmndBak = {
  id: 26329,
  idDuongSu: 29404,
  tenDuongSu: 'virtual',
  idLoaiDs: 16887,
  diaChi: 'whoever boastfully',
  trangThai: 4729,
  thongTinDs: 'carport stepdaughter',
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 26514,
  idDsGoc: 28725,
  idTinhTrang: 12474,
  idMaster: 'regularly',
  idDonVi: 23554,
  strSearch: 'above extraneous',
  soGiayTo: 'regarding imaginary',
};

export const sampleWithNewData: NewDuongSuTrungCmndBak = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
