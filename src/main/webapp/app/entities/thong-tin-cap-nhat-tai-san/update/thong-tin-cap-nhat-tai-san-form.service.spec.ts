import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../thong-tin-cap-nhat-tai-san.test-samples';

import { ThongTinCapNhatTaiSanFormService } from './thong-tin-cap-nhat-tai-san-form.service';

describe('ThongTinCapNhatTaiSan Form Service', () => {
  let service: ThongTinCapNhatTaiSanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongTinCapNhatTaiSanFormService);
  });

  describe('Service methods', () => {
    describe('createThongTinCapNhatTaiSanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createThongTinCapNhatTaiSanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idCapNhat: expect.any(Object),
            tenTaiSan: expect.any(Object),
            thongTinTaiSan: expect.any(Object),
            ngayCapNhat: expect.any(Object),
            taiSan: expect.any(Object),
            danhMucLoaiTaiSan: expect.any(Object),
          }),
        );
      });

      it('passing IThongTinCapNhatTaiSan should create a new form with FormGroup', () => {
        const formGroup = service.createThongTinCapNhatTaiSanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            idCapNhat: expect.any(Object),
            tenTaiSan: expect.any(Object),
            thongTinTaiSan: expect.any(Object),
            ngayCapNhat: expect.any(Object),
            taiSan: expect.any(Object),
            danhMucLoaiTaiSan: expect.any(Object),
          }),
        );
      });
    });

    describe('getThongTinCapNhatTaiSan', () => {
      it('should return NewThongTinCapNhatTaiSan for default ThongTinCapNhatTaiSan initial value', () => {
        const formGroup = service.createThongTinCapNhatTaiSanFormGroup(sampleWithNewData);

        const thongTinCapNhatTaiSan = service.getThongTinCapNhatTaiSan(formGroup) as any;

        expect(thongTinCapNhatTaiSan).toMatchObject(sampleWithNewData);
      });

      it('should return NewThongTinCapNhatTaiSan for empty ThongTinCapNhatTaiSan initial value', () => {
        const formGroup = service.createThongTinCapNhatTaiSanFormGroup();

        const thongTinCapNhatTaiSan = service.getThongTinCapNhatTaiSan(formGroup) as any;

        expect(thongTinCapNhatTaiSan).toMatchObject({});
      });

      it('should return IThongTinCapNhatTaiSan', () => {
        const formGroup = service.createThongTinCapNhatTaiSanFormGroup(sampleWithRequiredData);

        const thongTinCapNhatTaiSan = service.getThongTinCapNhatTaiSan(formGroup) as any;

        expect(thongTinCapNhatTaiSan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IThongTinCapNhatTaiSan should not enable idCapNhat FormControl', () => {
        const formGroup = service.createThongTinCapNhatTaiSanFormGroup();
        expect(formGroup.controls.idCapNhat.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.idCapNhat.disabled).toBe(true);
      });

      it('passing NewThongTinCapNhatTaiSan should disable idCapNhat FormControl', () => {
        const formGroup = service.createThongTinCapNhatTaiSanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.idCapNhat.disabled).toBe(true);

        service.resetForm(formGroup, { idCapNhat: null });

        expect(formGroup.controls.idCapNhat.disabled).toBe(true);
      });
    });
  });
});
