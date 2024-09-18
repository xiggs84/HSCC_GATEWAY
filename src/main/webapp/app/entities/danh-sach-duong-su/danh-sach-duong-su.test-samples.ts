import dayjs from 'dayjs/esm';

import { IDanhSachDuongSu, NewDanhSachDuongSu } from './danh-sach-duong-su.model';

export const sampleWithRequiredData: IDanhSachDuongSu = {
  id: 23191,
};

export const sampleWithPartialData: IDanhSachDuongSu = {
  id: 25578,
  tenDuongSu: 'pace',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 12548,
  idDonVi: 22882,
  soGiayTo: 'where',
  idLoaiNganChan: 25704,
};

export const sampleWithFullData: IDanhSachDuongSu = {
  id: 19190,
  tenDuongSu: 'stupendous privacy sleepy',
  diaChi: 'homeschool',
  trangThai: 0,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 16155,
  idDsGoc: 26527,
  idMaster: 'off ack',
  idDonVi: 19014,
  strSearch: 'although pish',
  soGiayTo: 'around jodhpurs around',
  idLoaiNganChan: 28456,
};

export const sampleWithNewData: NewDanhSachDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
