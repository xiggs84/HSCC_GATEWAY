import { IDanhMucLoaiDonVi, NewDanhMucLoaiDonVi } from './danh-muc-loai-don-vi.model';

export const sampleWithRequiredData: IDanhMucLoaiDonVi = {
  id: 31662,
};

export const sampleWithPartialData: IDanhMucLoaiDonVi = {
  id: 12012,
  dienGiai: 'enjoin industrialise',
};

export const sampleWithFullData: IDanhMucLoaiDonVi = {
  id: 4102,
  idLoaiDv: 20937,
  dienGiai: 'canst clonk angle',
};

export const sampleWithNewData: NewDanhMucLoaiDonVi = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
