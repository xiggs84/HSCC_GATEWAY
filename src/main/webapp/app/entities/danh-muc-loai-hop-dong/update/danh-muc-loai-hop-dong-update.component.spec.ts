import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucNhomHopDong } from 'app/entities/danh-muc-nhom-hop-dong/danh-muc-nhom-hop-dong.model';
import { DanhMucNhomHopDongService } from 'app/entities/danh-muc-nhom-hop-dong/service/danh-muc-nhom-hop-dong.service';
import { DanhMucLoaiHopDongService } from '../service/danh-muc-loai-hop-dong.service';
import { IDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongFormService } from './danh-muc-loai-hop-dong-form.service';

import { DanhMucLoaiHopDongUpdateComponent } from './danh-muc-loai-hop-dong-update.component';

describe('DanhMucLoaiHopDong Management Update Component', () => {
  let comp: DanhMucLoaiHopDongUpdateComponent;
  let fixture: ComponentFixture<DanhMucLoaiHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucLoaiHopDongFormService: DanhMucLoaiHopDongFormService;
  let danhMucLoaiHopDongService: DanhMucLoaiHopDongService;
  let danhMucNhomHopDongService: DanhMucNhomHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiHopDongUpdateComponent],
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
      .overrideTemplate(DanhMucLoaiHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucLoaiHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucLoaiHopDongFormService = TestBed.inject(DanhMucLoaiHopDongFormService);
    danhMucLoaiHopDongService = TestBed.inject(DanhMucLoaiHopDongService);
    danhMucNhomHopDongService = TestBed.inject(DanhMucNhomHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucNhomHopDong query and add missing value', () => {
      const danhMucLoaiHopDong: IDanhMucLoaiHopDong = { idLoaiHd: 'CBA' };
      const danhMucNhomHopDong: IDanhMucNhomHopDong = { idNhom: '78ffe23b-4112-47a4-a13f-aabba7b418fd' };
      danhMucLoaiHopDong.danhMucNhomHopDong = danhMucNhomHopDong;

      const danhMucNhomHopDongCollection: IDanhMucNhomHopDong[] = [{ idNhom: '0817a344-57a9-42ea-97ab-c5185b72e1ef' }];
      jest.spyOn(danhMucNhomHopDongService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucNhomHopDongCollection })));
      const additionalDanhMucNhomHopDongs = [danhMucNhomHopDong];
      const expectedCollection: IDanhMucNhomHopDong[] = [...additionalDanhMucNhomHopDongs, ...danhMucNhomHopDongCollection];
      jest.spyOn(danhMucNhomHopDongService, 'addDanhMucNhomHopDongToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucLoaiHopDong });
      comp.ngOnInit();

      expect(danhMucNhomHopDongService.query).toHaveBeenCalled();
      expect(danhMucNhomHopDongService.addDanhMucNhomHopDongToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucNhomHopDongCollection,
        ...additionalDanhMucNhomHopDongs.map(expect.objectContaining),
      );
      expect(comp.danhMucNhomHopDongsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhMucLoaiHopDong: IDanhMucLoaiHopDong = { idLoaiHd: 'CBA' };
      const danhMucNhomHopDong: IDanhMucNhomHopDong = { idNhom: '9628c29a-4574-47d5-be6e-71c33c92df96' };
      danhMucLoaiHopDong.danhMucNhomHopDong = danhMucNhomHopDong;

      activatedRoute.data = of({ danhMucLoaiHopDong });
      comp.ngOnInit();

      expect(comp.danhMucNhomHopDongsSharedCollection).toContain(danhMucNhomHopDong);
      expect(comp.danhMucLoaiHopDong).toEqual(danhMucLoaiHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiHopDong>>();
      const danhMucLoaiHopDong = { idLoaiHd: 'ABC' };
      jest.spyOn(danhMucLoaiHopDongFormService, 'getDanhMucLoaiHopDong').mockReturnValue(danhMucLoaiHopDong);
      jest.spyOn(danhMucLoaiHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiHopDongFormService.getDanhMucLoaiHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucLoaiHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiHopDong>>();
      const danhMucLoaiHopDong = { idLoaiHd: 'ABC' };
      jest.spyOn(danhMucLoaiHopDongFormService, 'getDanhMucLoaiHopDong').mockReturnValue({ idLoaiHd: null });
      jest.spyOn(danhMucLoaiHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiHopDongFormService.getDanhMucLoaiHopDong).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiHopDong>>();
      const danhMucLoaiHopDong = { idLoaiHd: 'ABC' };
      jest.spyOn(danhMucLoaiHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucLoaiHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucNhomHopDong', () => {
      it('Should forward to danhMucNhomHopDongService', () => {
        const entity = { idNhom: 'ABC' };
        const entity2 = { idNhom: 'CBA' };
        jest.spyOn(danhMucNhomHopDongService, 'compareDanhMucNhomHopDong');
        comp.compareDanhMucNhomHopDong(entity, entity2);
        expect(danhMucNhomHopDongService.compareDanhMucNhomHopDong).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
