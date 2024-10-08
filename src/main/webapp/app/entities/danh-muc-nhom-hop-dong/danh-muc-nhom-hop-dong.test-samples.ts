import { IDanhMucNhomHopDong, NewDanhMucNhomHopDong } from './danh-muc-nhom-hop-dong.model';

export const sampleWithRequiredData: IDanhMucNhomHopDong = {
  idNhom: 'c50903ff-d01a-4167-8043-9b9057d7a2a0',
};

export const sampleWithPartialData: IDanhMucNhomHopDong = {
  idNhom: 'bb202af8-310b-4839-a8e6-a2cb5da52de8',
};

export const sampleWithFullData: IDanhMucNhomHopDong = {
  idNhom: '631809c4-545e-48ac-9d9e-b2e0f06c5064',
  dienGiai: 'that',
};

export const sampleWithNewData: NewDanhMucNhomHopDong = {
  idNhom: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
