import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { ITinhTrangTaiSan } from 'app/entities/tinh-trang-tai-san/tinh-trang-tai-san.model';
import { TinhTrangTaiSanService } from 'app/entities/tinh-trang-tai-san/service/tinh-trang-tai-san.service';
import { ITaiSan } from '../tai-san.model';
import { TaiSanService } from '../service/tai-san.service';
import { TaiSanFormService } from './tai-san-form.service';

import { TaiSanUpdateComponent } from './tai-san-update.component';

describe('TaiSan Management Update Component', () => {
  let comp: TaiSanUpdateComponent;
  let fixture: ComponentFixture<TaiSanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taiSanFormService: TaiSanFormService;
  let taiSanService: TaiSanService;
  let danhMucLoaiTaiSanService: DanhMucLoaiTaiSanService;
  let tinhTrangTaiSanService: TinhTrangTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanUpdateComponent],
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
      .overrideTemplate(TaiSanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaiSanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taiSanFormService = TestBed.inject(TaiSanFormService);
    taiSanService = TestBed.inject(TaiSanService);
    danhMucLoaiTaiSanService = TestBed.inject(DanhMucLoaiTaiSanService);
    tinhTrangTaiSanService = TestBed.inject(TinhTrangTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiTaiSan query and add missing value', () => {
      const taiSan: ITaiSan = { idTaiSan: 456 };
      const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = { idLoaiTs: 13875 };
      taiSan.danhMucLoaiTaiSan = danhMucLoaiTaiSan;

      const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [{ idLoaiTs: 25720 }];
      jest.spyOn(danhMucLoaiTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiTaiSanCollection })));
      const additionalDanhMucLoaiTaiSans = [danhMucLoaiTaiSan];
      const expectedCollection: IDanhMucLoaiTaiSan[] = [...additionalDanhMucLoaiTaiSans, ...danhMucLoaiTaiSanCollection];
      jest.spyOn(danhMucLoaiTaiSanService, 'addDanhMucLoaiTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      expect(danhMucLoaiTaiSanService.query).toHaveBeenCalled();
      expect(danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiTaiSanCollection,
        ...additionalDanhMucLoaiTaiSans.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TinhTrangTaiSan query and add missing value', () => {
      const taiSan: ITaiSan = { idTaiSan: 456 };
      const tinhTrangTaiSan: ITinhTrangTaiSan = { idTinhTrang: 19985 };
      taiSan.tinhTrangTaiSan = tinhTrangTaiSan;

      const tinhTrangTaiSanCollection: ITinhTrangTaiSan[] = [{ idTinhTrang: 12621 }];
      jest.spyOn(tinhTrangTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: tinhTrangTaiSanCollection })));
      const additionalTinhTrangTaiSans = [tinhTrangTaiSan];
      const expectedCollection: ITinhTrangTaiSan[] = [...additionalTinhTrangTaiSans, ...tinhTrangTaiSanCollection];
      jest.spyOn(tinhTrangTaiSanService, 'addTinhTrangTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      expect(tinhTrangTaiSanService.query).toHaveBeenCalled();
      expect(tinhTrangTaiSanService.addTinhTrangTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        tinhTrangTaiSanCollection,
        ...additionalTinhTrangTaiSans.map(expect.objectContaining),
      );
      expect(comp.tinhTrangTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const taiSan: ITaiSan = { idTaiSan: 456 };
      const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = { idLoaiTs: 16500 };
      taiSan.danhMucLoaiTaiSan = danhMucLoaiTaiSan;
      const tinhTrangTaiSan: ITinhTrangTaiSan = { idTinhTrang: 32191 };
      taiSan.tinhTrangTaiSan = tinhTrangTaiSan;

      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      expect(comp.danhMucLoaiTaiSansSharedCollection).toContain(danhMucLoaiTaiSan);
      expect(comp.tinhTrangTaiSansSharedCollection).toContain(tinhTrangTaiSan);
      expect(comp.taiSan).toEqual(taiSan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSan>>();
      const taiSan = { idTaiSan: 123 };
      jest.spyOn(taiSanFormService, 'getTaiSan').mockReturnValue(taiSan);
      jest.spyOn(taiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSan }));
      saveSubject.complete();

      // THEN
      expect(taiSanFormService.getTaiSan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taiSanService.update).toHaveBeenCalledWith(expect.objectContaining(taiSan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSan>>();
      const taiSan = { idTaiSan: 123 };
      jest.spyOn(taiSanFormService, 'getTaiSan').mockReturnValue({ idTaiSan: null });
      jest.spyOn(taiSanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSan }));
      saveSubject.complete();

      // THEN
      expect(taiSanFormService.getTaiSan).toHaveBeenCalled();
      expect(taiSanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSan>>();
      const taiSan = { idTaiSan: 123 };
      jest.spyOn(taiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taiSanService.update).toHaveBeenCalled();
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
