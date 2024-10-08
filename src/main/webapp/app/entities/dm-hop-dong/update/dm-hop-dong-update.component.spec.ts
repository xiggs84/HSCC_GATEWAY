import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { IDmHopDong } from '../dm-hop-dong.model';
import { DmHopDongService } from '../service/dm-hop-dong.service';
import { DmHopDongFormService } from './dm-hop-dong-form.service';

import { DmHopDongUpdateComponent } from './dm-hop-dong-update.component';

describe('DmHopDong Management Update Component', () => {
  let comp: DmHopDongUpdateComponent;
  let fixture: ComponentFixture<DmHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmHopDongFormService: DmHopDongFormService;
  let dmHopDongService: DmHopDongService;
  let danhMucLoaiHopDongService: DanhMucLoaiHopDongService;
  let soCongChungService: SoCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmHopDongUpdateComponent],
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
      .overrideTemplate(DmHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmHopDongFormService = TestBed.inject(DmHopDongFormService);
    dmHopDongService = TestBed.inject(DmHopDongService);
    danhMucLoaiHopDongService = TestBed.inject(DanhMucLoaiHopDongService);
    soCongChungService = TestBed.inject(SoCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiHopDong query and add missing value', () => {
      const dmHopDong: IDmHopDong = { idHopDong: 'CBA' };
      const danhMucLoaiHopDong: IDanhMucLoaiHopDong = { idLoaiHd: '16d9ecc8-53aa-4688-84c1-60fed78892f3' };
      dmHopDong.danhMucLoaiHopDong = danhMucLoaiHopDong;

      const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [{ idLoaiHd: 'a174e42b-78ca-4cbc-8cb0-7c00856dd629' }];
      jest.spyOn(danhMucLoaiHopDongService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiHopDongCollection })));
      const additionalDanhMucLoaiHopDongs = [danhMucLoaiHopDong];
      const expectedCollection: IDanhMucLoaiHopDong[] = [...additionalDanhMucLoaiHopDongs, ...danhMucLoaiHopDongCollection];
      jest.spyOn(danhMucLoaiHopDongService, 'addDanhMucLoaiHopDongToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dmHopDong });
      comp.ngOnInit();

      expect(danhMucLoaiHopDongService.query).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiHopDongCollection,
        ...additionalDanhMucLoaiHopDongs.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiHopDongsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SoCongChung query and add missing value', () => {
      const dmHopDong: IDmHopDong = { idHopDong: 'CBA' };
      const soCongChung: ISoCongChung = { idSo: 'e29d2c5a-0f6f-4c29-b0c8-a727857daaf5' };
      dmHopDong.soCongChung = soCongChung;

      const soCongChungCollection: ISoCongChung[] = [{ idSo: '05ecb89c-c4ac-46d5-8a3a-b1374b4a8c0a' }];
      jest.spyOn(soCongChungService, 'query').mockReturnValue(of(new HttpResponse({ body: soCongChungCollection })));
      const additionalSoCongChungs = [soCongChung];
      const expectedCollection: ISoCongChung[] = [...additionalSoCongChungs, ...soCongChungCollection];
      jest.spyOn(soCongChungService, 'addSoCongChungToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dmHopDong });
      comp.ngOnInit();

      expect(soCongChungService.query).toHaveBeenCalled();
      expect(soCongChungService.addSoCongChungToCollectionIfMissing).toHaveBeenCalledWith(
        soCongChungCollection,
        ...additionalSoCongChungs.map(expect.objectContaining),
      );
      expect(comp.soCongChungsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dmHopDong: IDmHopDong = { idHopDong: 'CBA' };
      const danhMucLoaiHopDong: IDanhMucLoaiHopDong = { idLoaiHd: '0012ccdd-064d-421d-a38c-1b9bbbe2c1ef' };
      dmHopDong.danhMucLoaiHopDong = danhMucLoaiHopDong;
      const soCongChung: ISoCongChung = { idSo: 'ba64a77f-8c75-4829-af58-3fd4fa711750' };
      dmHopDong.soCongChung = soCongChung;

      activatedRoute.data = of({ dmHopDong });
      comp.ngOnInit();

      expect(comp.danhMucLoaiHopDongsSharedCollection).toContain(danhMucLoaiHopDong);
      expect(comp.soCongChungsSharedCollection).toContain(soCongChung);
      expect(comp.dmHopDong).toEqual(dmHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmHopDong>>();
      const dmHopDong = { idHopDong: 'ABC' };
      jest.spyOn(dmHopDongFormService, 'getDmHopDong').mockReturnValue(dmHopDong);
      jest.spyOn(dmHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmHopDong }));
      saveSubject.complete();

      // THEN
      expect(dmHopDongFormService.getDmHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(dmHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmHopDong>>();
      const dmHopDong = { idHopDong: 'ABC' };
      jest.spyOn(dmHopDongFormService, 'getDmHopDong').mockReturnValue({ idHopDong: null });
      jest.spyOn(dmHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmHopDong }));
      saveSubject.complete();

      // THEN
      expect(dmHopDongFormService.getDmHopDong).toHaveBeenCalled();
      expect(dmHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmHopDong>>();
      const dmHopDong = { idHopDong: 'ABC' };
      jest.spyOn(dmHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmHopDongService.update).toHaveBeenCalled();
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
