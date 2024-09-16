import dayjs from 'dayjs/esm';

import { ITaiSanDuongSu, NewTaiSanDuongSu } from './tai-san-duong-su.model';

export const sampleWithRequiredData: ITaiSanDuongSu = {
  id: 27207,
};

export const sampleWithPartialData: ITaiSanDuongSu = {
  id: 7813,
  idDuongSu: 17432,
  trangThai: 30090,
  ngayThaoTac: dayjs('2024-08-19'),
  idHopDong: 11819,
};

export const sampleWithFullData: ITaiSanDuongSu = {
  id: 25080,
  idDuongSu: 8489,
  trangThai: 26273,
  ngayThaoTac: dayjs('2024-08-20'),
  idHopDong: 1340,
  idLoaiHopDong: 14986,
  idChungThuc: 25252,
};

export const sampleWithNewData: NewTaiSanDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
