import { IDanhMucLoaiGiayToChungThuc, NewDanhMucLoaiGiayToChungThuc } from './danh-muc-loai-giay-to-chung-thuc.model';

export const sampleWithRequiredData: IDanhMucLoaiGiayToChungThuc = {
  idLoaiGiayTo: '002f89f8-7625-4011-81d3-d4199b7cfe9f',
};

export const sampleWithPartialData: IDanhMucLoaiGiayToChungThuc = {
  idLoaiGiayTo: '3f94f663-ec37-4385-8739-c0da18154807',
};

export const sampleWithFullData: IDanhMucLoaiGiayToChungThuc = {
  idLoaiGiayTo: '4f3d16f8-44f6-41b3-8793-7d637d23eba2',
  dienGiai: 'pro supposing',
};

export const sampleWithNewData: NewDanhMucLoaiGiayToChungThuc = {
  idLoaiGiayTo: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
