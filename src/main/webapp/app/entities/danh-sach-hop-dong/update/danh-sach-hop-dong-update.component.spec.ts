import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { DanhSachHopDongService } from '../service/danh-sach-hop-dong.service';
import { DanhSachHopDongFormService } from './danh-sach-hop-dong-form.service';

import { DanhSachHopDongUpdateComponent } from './danh-sach-hop-dong-update.component';

describe('DanhSachHopDong Management Update Component', () => {
  let comp: DanhSachHopDongUpdateComponent;
  let fixture: ComponentFixture<DanhSachHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhSachHopDongFormService: DanhSachHopDongFormService;
  let danhSachHopDongService: DanhSachHopDongService;
  let danhMucLoaiHopDongService: DanhMucLoaiHopDongService;
  let soCongChungService: SoCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhSachHopDongUpdateComponent],
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
      .overrideTemplate(DanhSachHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhSachHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhSachHopDongFormService = TestBed.inject(DanhSachHopDongFormService);
    danhSachHopDongService = TestBed.inject(DanhSachHopDongService);
    danhMucLoaiHopDongService = TestBed.inject(DanhMucLoaiHopDongService);
    soCongChungService = TestBed.inject(SoCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiHopDong query and add missing value', () => {
      const danhSachHopDong: IDanhSachHopDong = { idHopDong: 'CBA' };
      const danhMucLoaiHopDong: IDanhMucLoaiHopDong = { idLoaiHd: '20e3eeb4-faa6-4211-9ffc-88441fdcaa29' };
      danhSachHopDong.danhMucLoaiHopDong = danhMucLoaiHopDong;

      const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [{ idLoaiHd: 'f8eacbcb-7d72-4999-af67-e8869d48ab5d' }];
      jest.spyOn(danhMucLoaiHopDongService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiHopDongCollection })));
      const additionalDanhMucLoaiHopDongs = [danhMucLoaiHopDong];
      const expectedCollection: IDanhMucLoaiHopDong[] = [...additionalDanhMucLoaiHopDongs, ...danhMucLoaiHopDongCollection];
      jest.spyOn(danhMucLoaiHopDongService, 'addDanhMucLoaiHopDongToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      expect(danhMucLoaiHopDongService.query).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiHopDongCollection,
        ...additionalDanhMucLoaiHopDongs.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiHopDongsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SoCongChung query and add missing value', () => {
      const danhSachHopDong: IDanhSachHopDong = { idHopDong: 'CBA' };
      const soCongChung: ISoCongChung = { idSo: 'cf6e536e-645e-4d18-9466-68a208fbc6e3' };
      danhSachHopDong.soCongChung = soCongChung;

      const soCongChungCollection: ISoCongChung[] = [{ idSo: 'f62013a5-4c53-4832-8d41-af7c1aa438e2' }];
      jest.spyOn(soCongChungService, 'query').mockReturnValue(of(new HttpResponse({ body: soCongChungCollection })));
      const additionalSoCongChungs = [soCongChung];
      const expectedCollection: ISoCongChung[] = [...additionalSoCongChungs, ...soCongChungCollection];
      jest.spyOn(soCongChungService, 'addSoCongChungToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      expect(soCongChungService.query).toHaveBeenCalled();
      expect(soCongChungService.addSoCongChungToCollectionIfMissing).toHaveBeenCalledWith(
        soCongChungCollection,
        ...additionalSoCongChungs.map(expect.objectContaining),
      );
      expect(comp.soCongChungsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhSachHopDong: IDanhSachHopDong = { idHopDong: 'CBA' };
      const danhMucLoaiHopDong: IDanhMucLoaiHopDong = { idLoaiHd: '1850471d-d6eb-4b40-b843-4bff81b91c0c' };
      danhSachHopDong.danhMucLoaiHopDong = danhMucLoaiHopDong;
      const soCongChung: ISoCongChung = { idSo: '77387b56-f035-44bc-8390-d7df8e0dcc28' };
      danhSachHopDong.soCongChung = soCongChung;

      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      expect(comp.danhMucLoaiHopDongsSharedCollection).toContain(danhMucLoaiHopDong);
      expect(comp.soCongChungsSharedCollection).toContain(soCongChung);
      expect(comp.danhSachHopDong).toEqual(danhSachHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachHopDong>>();
      const danhSachHopDong = { idHopDong: 'ABC' };
      jest.spyOn(danhSachHopDongFormService, 'getDanhSachHopDong').mockReturnValue(danhSachHopDong);
      jest.spyOn(danhSachHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhSachHopDongFormService.getDanhSachHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhSachHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(danhSachHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachHopDong>>();
      const danhSachHopDong = { idHopDong: 'ABC' };
      jest.spyOn(danhSachHopDongFormService, 'getDanhSachHopDong').mockReturnValue({ idHopDong: null });
      jest.spyOn(danhSachHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhSachHopDongFormService.getDanhSachHopDong).toHaveBeenCalled();
      expect(danhSachHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachHopDong>>();
      const danhSachHopDong = { idHopDong: 'ABC' };
      jest.spyOn(danhSachHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhSachHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucLoaiHopDong', () => {
      it('Should forward to danhMucLoaiHopDongService', () => {
        const entity = { idLoaiHd: 'ABC' };
        const entity2 = { idLoaiHd: 'CBA' };
        jest.spyOn(danhMucLoaiHopDongService, 'compareDanhMucLoaiHopDong');
        comp.compareDanhMucLoaiHopDong(entity, entity2);
        expect(danhMucLoaiHopDongService.compareDanhMucLoaiHopDong).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSoCongChung', () => {
      it('Should forward to soCongChungService', () => {
        const entity = { idSo: 'ABC' };
        const entity2 = { idSo: 'CBA' };
        jest.spyOn(soCongChungService, 'compareSoCongChung');
        comp.compareSoCongChung(entity, entity2);
        expect(soCongChungService.compareSoCongChung).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
