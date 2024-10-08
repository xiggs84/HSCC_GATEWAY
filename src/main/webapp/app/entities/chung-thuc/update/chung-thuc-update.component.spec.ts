import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucLoaiGiayToChungThuc } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/danh-muc-loai-giay-to-chung-thuc.model';
import { DanhMucLoaiGiayToChungThucService } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/service/danh-muc-loai-giay-to-chung-thuc.service';
import { ChungThucService } from '../service/chung-thuc.service';
import { IChungThuc } from '../chung-thuc.model';
import { ChungThucFormService } from './chung-thuc-form.service';

import { ChungThucUpdateComponent } from './chung-thuc-update.component';

describe('ChungThuc Management Update Component', () => {
  let comp: ChungThucUpdateComponent;
  let fixture: ComponentFixture<ChungThucUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chungThucFormService: ChungThucFormService;
  let chungThucService: ChungThucService;
  let danhMucLoaiGiayToChungThucService: DanhMucLoaiGiayToChungThucService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChungThucUpdateComponent],
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
      .overrideTemplate(ChungThucUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChungThucUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chungThucFormService = TestBed.inject(ChungThucFormService);
    chungThucService = TestBed.inject(ChungThucService);
    danhMucLoaiGiayToChungThucService = TestBed.inject(DanhMucLoaiGiayToChungThucService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiGiayToChungThuc query and add missing value', () => {
      const chungThuc: IChungThuc = { idChungThuc: 'CBA' };
      const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = { idLoaiGiayTo: 'c4961851-1964-429c-978c-77c506439596' };
      chungThuc.danhMucLoaiGiayToChungThuc = danhMucLoaiGiayToChungThuc;

      const danhMucLoaiGiayToChungThucCollection: IDanhMucLoaiGiayToChungThuc[] = [
        { idLoaiGiayTo: '7b398342-04d9-4bf7-80e3-4bd90990deaa' },
      ];
      jest
        .spyOn(danhMucLoaiGiayToChungThucService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: danhMucLoaiGiayToChungThucCollection })));
      const additionalDanhMucLoaiGiayToChungThucs = [danhMucLoaiGiayToChungThuc];
      const expectedCollection: IDanhMucLoaiGiayToChungThuc[] = [
        ...additionalDanhMucLoaiGiayToChungThucs,
        ...danhMucLoaiGiayToChungThucCollection,
      ];
      jest
        .spyOn(danhMucLoaiGiayToChungThucService, 'addDanhMucLoaiGiayToChungThucToCollectionIfMissing')
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chungThuc });
      comp.ngOnInit();

      expect(danhMucLoaiGiayToChungThucService.query).toHaveBeenCalled();
      expect(danhMucLoaiGiayToChungThucService.addDanhMucLoaiGiayToChungThucToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiGiayToChungThucCollection,
        ...additionalDanhMucLoaiGiayToChungThucs.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiGiayToChungThucsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const chungThuc: IChungThuc = { idChungThuc: 'CBA' };
      const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = { idLoaiGiayTo: '98f8549c-869f-47b6-96c3-274120592ad7' };
      chungThuc.danhMucLoaiGiayToChungThuc = danhMucLoaiGiayToChungThuc;

      activatedRoute.data = of({ chungThuc });
      comp.ngOnInit();

      expect(comp.danhMucLoaiGiayToChungThucsSharedCollection).toContain(danhMucLoaiGiayToChungThuc);
      expect(comp.chungThuc).toEqual(chungThuc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChungThuc>>();
      const chungThuc = { idChungThuc: 'ABC' };
      jest.spyOn(chungThucFormService, 'getChungThuc').mockReturnValue(chungThuc);
      jest.spyOn(chungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chungThuc }));
      saveSubject.complete();

      // THEN
      expect(chungThucFormService.getChungThuc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(chungThucService.update).toHaveBeenCalledWith(expect.objectContaining(chungThuc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChungThuc>>();
      const chungThuc = { idChungThuc: 'ABC' };
      jest.spyOn(chungThucFormService, 'getChungThuc').mockReturnValue({ idChungThuc: null });
      jest.spyOn(chungThucService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chungThuc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chungThuc }));
      saveSubject.complete();

      // THEN
      expect(chungThucFormService.getChungThuc).toHaveBeenCalled();
      expect(chungThucService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChungThuc>>();
      const chungThuc = { idChungThuc: 'ABC' };
      jest.spyOn(chungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chungThucService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucLoaiGiayToChungThuc', () => {
      it('Should forward to danhMucLoaiGiayToChungThucService', () => {
        const entity = { idLoaiGiayTo: 'ABC' };
        const entity2 = { idLoaiGiayTo: 'CBA' };
        jest.spyOn(danhMucLoaiGiayToChungThucService, 'compareDanhMucLoaiGiayToChungThuc');
        comp.compareDanhMucLoaiGiayToChungThuc(entity, entity2);
        expect(danhMucLoaiGiayToChungThucService.compareDanhMucLoaiGiayToChungThuc).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
