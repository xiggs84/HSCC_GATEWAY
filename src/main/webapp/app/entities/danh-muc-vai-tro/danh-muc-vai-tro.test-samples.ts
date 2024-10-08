import { IDanhMucVaiTro, NewDanhMucVaiTro } from './danh-muc-vai-tro.model';

export const sampleWithRequiredData: IDanhMucVaiTro = {
  idVaiTro: '435d328a-6890-4b17-bddd-a452b5f3477b',
};

export const sampleWithPartialData: IDanhMucVaiTro = {
  idVaiTro: '0fe32cb4-aed1-46ca-bede-fa695a9ba6cb',
  dienGiai: 'although grouper imperfect',
};

export const sampleWithFullData: IDanhMucVaiTro = {
  idVaiTro: '544816f5-6809-423d-8f79-871b37eab7c6',
  dienGiai: 'clergyman',
  idLoaiVaiTro: 24751,
};

export const sampleWithNewData: NewDanhMucVaiTro = {
  idVaiTro: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
