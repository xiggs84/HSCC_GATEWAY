import dayjs from 'dayjs/esm';

import { ITaiSanDuongSu, NewTaiSanDuongSu } from './tai-san-duong-su.model';

export const sampleWithRequiredData: ITaiSanDuongSu = {
  id: 21319,
};

export const sampleWithPartialData: ITaiSanDuongSu = {
  id: 31305,
  idDuongSu: 27041,
  trangThai: 17129,
  ngayThaoTac: dayjs('2024-08-19'),
  idHopDong: 5112,
  idChungThuc: 9465,
};

export const sampleWithFullData: ITaiSanDuongSu = {
  id: 3492,
  idTaiSan: 13770,
  idDuongSu: 11990,
  trangThai: 29056,
  ngayThaoTac: dayjs('2024-08-19'),
  idHopDong: 11715,
  idLoaiHopDong: 25916,
  idChungThuc: 17328,
};

export const sampleWithNewData: NewTaiSanDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
