import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { ITinhTrangTaiSan } from 'app/entities/tinh-trang-tai-san/tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from 'app/entities/tinh-trang-tai-san/service/tinh-trang-tai-san.service';
import { ITaiSanDatNha } from '../tai-san-dat-nha.model';
import { TaiSanDatNhaService } from '../service/tai-san-dat-nha.service';
import { TaiSanDatNhaFormService } from './tai-san-dat-nha-form.service';

import { TaiSanDatNhaUpdateComponent } from './tai-san-dat-nha-update.component';

describe('TaiSanDatNha Management Update Component', () => {
  let comp: TaiSanDatNhaUpdateComponent;
  let fixture: ComponentFixture<TaiSanDatNhaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taiSanDatNhaFormService: TaiSanDatNhaFormService;
  let taiSanDatNhaService: TaiSanDatNhaService;
  let danhMucLoaiTaiSanService: DanhMucLoaiTaiSanService;
  let tinhTrangTaiSanService: TinhTrangTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanDatNhaUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TaiSanDatNhaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaiSanDatNhaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taiSanDatNhaFormService = TestBed.inject(TaiSanDatNhaFormService);
    taiSanDatNhaService = TestBed.inject(TaiSanDatNhaService);
    danhMucLoaiTaiSanService = TestBed.inject(DanhMucLoaiTaiSanService);
    tinhTrangTaiSanService = TestBed.inject(TinhTrangTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiTaiSan query and add missing value', () => {
      const taiSanDatNha: ITaiSanDatNha = { id: 456 };
      const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = { idLoaiTs: 32645 };
      taiSanDatNha.danhMucLoaiTaiSan = danhMucLoaiTaiSan;

      const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [{ idLoaiTs: 18250 }];
      jest.spyOn(danhMucLoaiTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiTaiSanCollection })));
      const additionalDanhMucLoaiTaiSans = [danhMucLoaiTaiSan];
      const expectedCollection: IDanhMucLoaiTaiSan[] = [...additionalDanhMucLoaiTaiSans, ...danhMucLoaiTaiSanCollection];
      jest.spyOn(danhMucLoaiTaiSanService, 'addDanhMucLoaiTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSanDatNha });
      comp.ngOnInit();

      expect(danhMucLoaiTaiSanService.query).toHaveBeenCalled();
      expect(danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiTaiSanCollection,
        ...additionalDanhMucLoaiTaiSans.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TinhTrangTaiSan query and add missing value', () => {
      const taiSanDatNha: ITaiSanDatNha = { id: 456 };
      const tinhTrangTaiSan: ITinhTrangTaiSan = { idTinhTrang: 9223 };
      taiSanDatNha.tinhTrangTaiSan = tinhTrangTaiSan;

      const tinhTrangTaiSanCollection: ITinhTrangTaiSan[] = [{ idTinhTrang: 12308 }];
      jest.spyOn(tinhTrangTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: tinhTrangTaiSanCollection })));
      const additionalTinhTrangTaiSans = [tinhTrangTaiSan];
      const expectedCollection: ITinhTrangTaiSan[] = [...additionalTinhTrangTaiSans, ...tinhTrangTaiSanCollection];
      jest.spyOn(tinhTrangTaiSanService, 'addTinhTrangTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSanDatNha });
      comp.ngOnInit();

      expect(tinhTrangTaiSanService.query).toHaveBeenCalled();
      expect(tinhTrangTaiSanService.addTinhTrangTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        tinhTrangTaiSanCollection,
        ...additionalTinhTrangTaiSans.map(expect.objectContaining),
      );
      expect(comp.tinhTrangTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const taiSanDatNha: ITaiSanDatNha = { id: 456 };
      const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = { idLoaiTs: 26790 };
      taiSanDatNha.danhMucLoaiTaiSan = danhMucLoaiTaiSan;
      const tinhTrangTaiSan: ITinhTrangTaiSan = { idTinhTrang: 1942 };
      taiSanDatNha.tinhTrangTaiSan = tinhTrangTaiSan;

      activatedRoute.data = of({ taiSanDatNha });
      comp.ngOnInit();

      expect(comp.danhMucLoaiTaiSansSharedCollection).toContain(danhMucLoaiTaiSan);
      expect(comp.tinhTrangTaiSansSharedCollection).toContain(tinhTrangTaiSan);
      expect(comp.taiSanDatNha).toEqual(taiSanDatNha);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDatNha>>();
      const taiSanDatNha = { id: 123 };
      jest.spyOn(taiSanDatNhaFormService, 'getTaiSanDatNha').mockReturnValue(taiSanDatNha);
      jest.spyOn(taiSanDatNhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDatNha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDatNha }));
      saveSubject.complete();

      // THEN
      expect(taiSanDatNhaFormService.getTaiSanDatNha).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taiSanDatNhaService.update).toHaveBeenCalledWith(expect.objectContaining(taiSanDatNha));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDatNha>>();
      const taiSanDatNha = { id: 123 };
      jest.spyOn(taiSanDatNhaFormService, 'getTaiSanDatNha').mockReturnValue({ id: null });
      jest.spyOn(taiSanDatNhaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDatNha: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDatNha }));
      saveSubject.complete();

      // THEN
      expect(taiSanDatNhaFormService.getTaiSanDatNha).toHaveBeenCalled();
      expect(taiSanDatNhaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDatNha>>();
      const taiSanDatNha = { id: 123 };
      jest.spyOn(taiSanDatNhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDatNha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taiSanDatNhaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucLoaiTaiSan', () => {
      it('Should forward to danhMucLoaiTaiSanService', () => {
        const entity = { idLoaiTs: 123 };
        const entity2 = { idLoaiTs: 456 };
        jest.spyOn(danhMucLoaiTaiSanService, 'compareDanhMucLoaiTaiSan');
        comp.compareDanhMucLoaiTaiSan(entity, entity2);
        expect(danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTinhTrangTaiSan', () => {
      it('Should forward to tinhTrangTaiSanService', () => {
        const entity = { idTinhTrang: 123 };
        const entity2 = { idTinhTrang: 456 };
        jest.spyOn(tinhTrangTaiSanService, 'compareTinhTrangTaiSan');
        comp.compareTinhTrangTaiSan(entity, entity2);
        expect(tinhTrangTaiSanService.compareTinhTrangTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
