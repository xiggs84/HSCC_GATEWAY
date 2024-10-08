import { IDanhMucLoaiSoCongChung, NewDanhMucLoaiSoCongChung } from './danh-muc-loai-so-cong-chung.model';

export const sampleWithRequiredData: IDanhMucLoaiSoCongChung = {
  idLoai: '85bd821b-0e4c-4755-a833-3c8274cbe9d2',
};

export const sampleWithPartialData: IDanhMucLoaiSoCongChung = {
  idLoai: '62532e19-6c78-47f2-9631-6cf7e2cf9418',
  tenLoai: 'aw quicker',
  trangThai: 4718,
};

export const sampleWithFullData: IDanhMucLoaiSoCongChung = {
  idLoai: 'd55694ea-8976-43bd-a10c-9ed3c1a0f759',
  tenLoai: 'frenetically pace before',
  trangThai: 11756,
};

export const sampleWithNewData: NewDanhMucLoaiSoCongChung = {
  idLoai: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
