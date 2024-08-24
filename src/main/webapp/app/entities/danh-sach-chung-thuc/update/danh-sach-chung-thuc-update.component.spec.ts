import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

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

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhSachChungThuc: IDanhSachChungThuc = { id: 456 };

      activatedRoute.data = of({ danhSachChungThuc });
      comp.ngOnInit();

      expect(comp.danhSachChungThuc).toEqual(danhSachChungThuc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachChungThuc>>();
      const danhSachChungThuc = { id: 123 };
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
      const danhSachChungThuc = { id: 123 };
      jest.spyOn(danhSachChungThucFormService, 'getDanhSachChungThuc').mockReturnValue({ id: null });
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
      const danhSachChungThuc = { id: 123 };
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
});
