import { IQuanHeDuongSu, NewQuanHeDuongSu } from './quan-he-duong-su.model';

export const sampleWithRequiredData: IQuanHeDuongSu = {
  idQuanHe: 25416,
};

export const sampleWithPartialData: IQuanHeDuongSu = {
  idQuanHe: 23740,
  idDuongSuQh: 1012,
  trangThai: 1,
};

export const sampleWithFullData: IQuanHeDuongSu = {
  idQuanHe: 2712,
  idDuongSuQh: 24688,
  thongTinQuanHe: 'properly pish',
  trangThai: 1,
};

export const sampleWithNewData: NewQuanHeDuongSu = {
  idQuanHe: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
