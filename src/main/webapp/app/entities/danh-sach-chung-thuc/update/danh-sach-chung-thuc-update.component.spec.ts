import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucLoaiGiayToChungThuc } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/danh-muc-loai-giay-to-chung-thuc.model';
import { DanhMucLoaiGiayToChungThucService } from 'app/entities/danh-muc-loai-giay-to-chung-thuc/service/danh-muc-loai-giay-to-chung-thuc.service';
import { DanhSachChungThucService } from '../service/danh-sach-chung-thuc.service';
import { IDanhSachChungThuc } from '../danh-sach-chung-thuc.model';
import { DanhSachChungThucFormService } from './danh-sach-chung-thuc-form.service';

import { DanhSachChungThucUpdateComponent } from './danh-sach-chung-thuc-update.component';

describe('DanhSachChungThuc Management Update Component', () => {
  let comp: DanhSachChungThucUpdateComponent;
  let fixture: ComponentFixture<DanhSachChungThucUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhSachChungThucFormService: DanhSachChungThucFormService;
  let danhSachChungThucService: DanhSachChungThucService;
  let danhMucLoaiGiayToChungThucService: DanhMucLoaiGiayToChungThucService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhSachChungThucUpdateComponent],
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
      .overrideTemplate(DanhSachChungThucUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhSachChungThucUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhSachChungThucFormService = TestBed.inject(DanhSachChungThucFormService);
    danhSachChungThucService = TestBed.inject(DanhSachChungThucService);
    danhMucLoaiGiayToChungThucService = TestBed.inject(DanhMucLoaiGiayToChungThucService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiGiayToChungThuc query and add missing value', () => {
      const danhSachChungThuc: IDanhSachChungThuc = { idChungThuc: 'CBA' };
      const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = { idLoaiGiayTo: '6901c201-88bb-4636-9857-94b8ab62f66b' };
      danhSachChungThuc.danhMucLoaiGiayToChungThuc = danhMucLoaiGiayToChungThuc;

      const danhMucLoaiGiayToChungThucCollection: IDanhMucLoaiGiayToChungThuc[] = [
        { idLoaiGiayTo: 'ac59f913-79fa-4786-99e0-ac717708d948' },
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

      activatedRoute.data = of({ danhSachChungThuc });
      comp.ngOnInit();

      expect(danhMucLoaiGiayToChungThucService.query).toHaveBeenCalled();
      expect(danhMucLoaiGiayToChungThucService.addDanhMucLoaiGiayToChungThucToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiGiayToChungThucCollection,
        ...additionalDanhMucLoaiGiayToChungThucs.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiGiayToChungThucsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhSachChungThuc: IDanhSachChungThuc = { idChungThuc: 'CBA' };
      const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = { idLoaiGiayTo: '91c44d2a-ed3f-489d-bb92-c61d3e866d2d' };
      danhSachChungThuc.danhMucLoaiGiayToChungThuc = danhMucLoaiGiayToChungThuc;

      activatedRoute.data = of({ danhSachChungThuc });
      comp.ngOnInit();

      expect(comp.danhMucLoaiGiayToChungThucsSharedCollection).toContain(danhMucLoaiGiayToChungThuc);
      expect(comp.danhSachChungThuc).toEqual(danhSachChungThuc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachChungThuc>>();
      const danhSachChungThuc = { idChungThuc: 'ABC' };
      jest.spyOn(danhSachChungThucFormService, 'getDanhSachChungThuc').mockReturnValue(danhSachChungThuc);
      jest.spyOn(danhSachChungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachChungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachChungThuc }));
      saveSubject.complete();

      // THEN
      expect(danhSachChungThucFormService.getDanhSachChungThuc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhSachChungThucService.update).toHaveBeenCalledWith(expect.objectContaining(danhSachChungThuc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachChungThuc>>();
      const danhSachChungThuc = { idChungThuc: 'ABC' };
      jest.spyOn(danhSachChungThucFormService, 'getDanhSachChungThuc').mockReturnValue({ idChungThuc: null });
      jest.spyOn(danhSachChungThucService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachChungThuc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachChungThuc }));
      saveSubject.complete();

      // THEN
      expect(danhSachChungThucFormService.getDanhSachChungThuc).toHaveBeenCalled();
      expect(danhSachChungThucService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachChungThuc>>();
      const danhSachChungThuc = { idChungThuc: 'ABC' };
      jest.spyOn(danhSachChungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachChungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhSachChungThucService.update).toHaveBeenCalled();
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
