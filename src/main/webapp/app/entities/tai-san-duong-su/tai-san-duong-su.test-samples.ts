import dayjs from 'dayjs/esm';

import { ITaiSanDuongSu, NewTaiSanDuongSu } from './tai-san-duong-su.model';

export const sampleWithRequiredData: ITaiSanDuongSu = {
  id: 32307,
};

export const sampleWithPartialData: ITaiSanDuongSu = {
  id: 27085,
  idLoaiHopDong: 6948,
  idChungThuc: 29615,
};

export const sampleWithFullData: ITaiSanDuongSu = {
  id: 12493,
  idTaiSan: 18781,
  trangThai: 1,
  ngayThaoTac: dayjs('2024-08-19'),
  idHopDong: 4562,
  idLoaiHopDong: 9966,
  idChungThuc: 9759,
};

export const sampleWithNewData: NewTaiSanDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
