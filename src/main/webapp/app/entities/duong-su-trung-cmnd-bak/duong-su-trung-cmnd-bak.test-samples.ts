import dayjs from 'dayjs/esm';

import { IDuongSuTrungCmndBak, NewDuongSuTrungCmndBak } from './duong-su-trung-cmnd-bak.model';

export const sampleWithRequiredData: IDuongSuTrungCmndBak = {
  id: 2394,
};

export const sampleWithPartialData: IDuongSuTrungCmndBak = {
  id: 30933,
  tenDuongSu: 'because before',
  diaChi: 'as yuck',
  ngayThaoTac: dayjs('2024-08-19'),
  idMaster: 'quibble upsell high-rise',
  strSearch: 'peppery wildly',
};

export const sampleWithFullData: IDuongSuTrungCmndBak = {
  id: 359,
  tenDuongSu: 'oh ick',
  diaChi: 'ah',
  trangThai: 1,
  thongTinDs: 'unite',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 22281,
  idDsGoc: 21886,
  idMaster: 'bayonet whenever',
  idDonVi: 2482,
  strSearch: 'between befit sturdy',
  soGiayTo: 'prod thirsty',
};

export const sampleWithNewData: NewDuongSuTrungCmndBak = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
