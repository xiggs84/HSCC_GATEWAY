import dayjs from 'dayjs/esm';

import { ISoCongChungTemp, NewSoCongChungTemp } from './so-cong-chung-temp.model';

export const sampleWithRequiredData: ISoCongChungTemp = {
  id: 27216,
};

export const sampleWithPartialData: ISoCongChungTemp = {
  id: 6687,
  idHopDong: 22853,
  soCc: 'strictly ah',
};

export const sampleWithFullData: ISoCongChungTemp = {
  id: 4676,
  idHopDong: 28150,
  idMaster: 15141,
  soCc: 'indeed clavier vent',
  ngayThaoTac: dayjs('2024-08-20'),
};

export const sampleWithNewData: NewSoCongChungTemp = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
