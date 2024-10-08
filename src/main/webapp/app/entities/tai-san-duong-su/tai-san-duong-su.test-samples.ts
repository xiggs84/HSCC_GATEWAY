import dayjs from 'dayjs/esm';

import { ITaiSanDuongSu, NewTaiSanDuongSu } from './tai-san-duong-su.model';

export const sampleWithRequiredData: ITaiSanDuongSu = {
  id: 105,
};

export const sampleWithPartialData: ITaiSanDuongSu = {
  id: 30183,
  idTaiSan: 32242,
  ngayThaoTac: dayjs('2024-08-20'),
};

export const sampleWithFullData: ITaiSanDuongSu = {
  id: 523,
  idTaiSan: 5972,
  trangThai: 0,
  ngayThaoTac: dayjs('2024-08-19'),
  idHopDong: 11846,
  idLoaiHopDong: 15053,
  idChungThuc: 26770,
};

export const sampleWithNewData: NewTaiSanDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
