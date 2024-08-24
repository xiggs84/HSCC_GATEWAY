import { IDanhMucLoaiGiayToChungThuc, NewDanhMucLoaiGiayToChungThuc } from './danh-muc-loai-giay-to-chung-thuc.model';

export const sampleWithRequiredData: IDanhMucLoaiGiayToChungThuc = {
  id: 27939,
};

export const sampleWithPartialData: IDanhMucLoaiGiayToChungThuc = {
  id: 1608,
  idLoaiGiayTo: 27877,
  dienGiai: 'amidst',
};

export const sampleWithFullData: IDanhMucLoaiGiayToChungThuc = {
  id: 2056,
  idLoaiGiayTo: 20742,
  dienGiai: 'given frozen',
};

export const sampleWithNewData: NewDanhMucLoaiGiayToChungThuc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
