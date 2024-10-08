import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { DanhMucLoaiGiayToChungThucService } from '../service/danh-muc-loai-giay-to-chung-thuc.service';
import { IDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';
import { DanhMucLoaiGiayToChungThucFormService } from './danh-muc-loai-giay-to-chung-thuc-form.service';

import { DanhMucLoaiGiayToChungThucUpdateComponent } from './danh-muc-loai-giay-to-chung-thuc-update.component';

describe('DanhMucLoaiGiayToChungThuc Management Update Component', () => {
  let comp: DanhMucLoaiGiayToChungThucUpdateComponent;
  let fixture: ComponentFixture<DanhMucLoaiGiayToChungThucUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucLoaiGiayToChungThucFormService: DanhMucLoaiGiayToChungThucFormService;
  let danhMucLoaiGiayToChungThucService: DanhMucLoaiGiayToChungThucService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiGiayToChungThucUpdateComponent],
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
      .overrideTemplate(DanhMucLoaiGiayToChungThucUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucLoaiGiayToChungThucUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucLoaiGiayToChungThucFormService = TestBed.inject(DanhMucLoaiGiayToChungThucFormService);
    danhMucLoaiGiayToChungThucService = TestBed.inject(DanhMucLoaiGiayToChungThucService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucLoaiGiayToChungThuc: IDanhMucLoaiGiayToChungThuc = { idLoaiGiayTo: 'CBA' };

      activatedRoute.data = of({ danhMucLoaiGiayToChungThuc });
      comp.ngOnInit();

      expect(comp.danhMucLoaiGiayToChungThuc).toEqual(danhMucLoaiGiayToChungThuc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiGiayToChungThuc>>();
      const danhMucLoaiGiayToChungThuc = { idLoaiGiayTo: 'ABC' };
      jest.spyOn(danhMucLoaiGiayToChungThucFormService, 'getDanhMucLoaiGiayToChungThuc').mockReturnValue(danhMucLoaiGiayToChungThuc);
      jest.spyOn(danhMucLoaiGiayToChungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiGiayToChungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiGiayToChungThuc }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiGiayToChungThucFormService.getDanhMucLoaiGiayToChungThuc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucLoaiGiayToChungThucService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucLoaiGiayToChungThuc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiGiayToChungThuc>>();
      const danhMucLoaiGiayToChungThuc = { idLoaiGiayTo: 'ABC' };
      jest.spyOn(danhMucLoaiGiayToChungThucFormService, 'getDanhMucLoaiGiayToChungThuc').mockReturnValue({ idLoaiGiayTo: null });
      jest.spyOn(danhMucLoaiGiayToChungThucService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiGiayToChungThuc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiGiayToChungThuc }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiGiayToChungThucFormService.getDanhMucLoaiGiayToChungThuc).toHaveBeenCalled();
      expect(danhMucLoaiGiayToChungThucService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiGiayToChungThuc>>();
      const danhMucLoaiGiayToChungThuc = { idLoaiGiayTo: 'ABC' };
      jest.spyOn(danhMucLoaiGiayToChungThucService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiGiayToChungThuc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucLoaiGiayToChungThucService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
