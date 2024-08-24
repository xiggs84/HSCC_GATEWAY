import dayjs from 'dayjs/esm';

import { ISoCongChungTemp, NewSoCongChungTemp } from './so-cong-chung-temp.model';

export const sampleWithRequiredData: ISoCongChungTemp = {
  id: 575,
};

export const sampleWithPartialData: ISoCongChungTemp = {
  id: 23541,
  idHopDong: 7105,
  soCc: 'drat',
  ngayThaoTac: dayjs('2024-08-19'),
};

export const sampleWithFullData: ISoCongChungTemp = {
  id: 26999,
  idHopDong: 29888,
  idMaster: 3273,
  soCc: 'up poison across',
  ngayThaoTac: dayjs('2024-08-20'),
};

export const sampleWithNewData: NewSoCongChungTemp = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
