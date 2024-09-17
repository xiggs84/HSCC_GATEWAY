import { IDanhMucTinh, NewDanhMucTinh } from './danh-muc-tinh.model';

export const sampleWithRequiredData: IDanhMucTinh = {
  maTinh: 'c335f95e-f7af-4229-b2c7-854c7fb6917d',
};

export const sampleWithPartialData: IDanhMucTinh = {
  maTinh: 'bcf558ad-3269-43ef-807c-364621e8fcf4',
};

export const sampleWithFullData: IDanhMucTinh = {
  maTinh: '5d07294a-8ef1-484b-a442-738df77fe9ca',
  tenTinh: 'highway telnet',
};

export const sampleWithNewData: NewDanhMucTinh = {
  maTinh: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
