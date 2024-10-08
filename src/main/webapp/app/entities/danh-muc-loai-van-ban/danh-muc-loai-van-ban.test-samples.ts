import { IDanhMucLoaiVanBan, NewDanhMucLoaiVanBan } from './danh-muc-loai-van-ban.model';

export const sampleWithRequiredData: IDanhMucLoaiVanBan = {
  idLoaiVb: '25c599e9-1bab-469d-91e4-ce95b227305f',
};

export const sampleWithPartialData: IDanhMucLoaiVanBan = {
  idLoaiVb: '9adc68f7-cb94-4a97-8533-dffad08fc00e',
};

export const sampleWithFullData: IDanhMucLoaiVanBan = {
  idLoaiVb: '35997d2d-bf85-4682-a944-d5176329ad8d',
  dienGiai: 'stark',
};

export const sampleWithNewData: NewDanhMucLoaiVanBan = {
  idLoaiVb: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
