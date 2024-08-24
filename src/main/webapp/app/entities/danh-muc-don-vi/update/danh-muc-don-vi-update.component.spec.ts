import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucDonViService } from '../service/danh-muc-don-vi.service';
import { IDanhMucDonVi } from '../danh-muc-don-vi.model';
import { DanhMucDonViFormService } from './danh-muc-don-vi-form.service';

import { DanhMucDonViUpdateComponent } from './danh-muc-don-vi-update.component';

describe('DanhMucDonVi Management Update Component', () => {
  let comp: DanhMucDonViUpdateComponent;
  let fixture: ComponentFixture<DanhMucDonViUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucDonViFormService: DanhMucDonViFormService;
  let danhMucDonViService: DanhMucDonViService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucDonViUpdateComponent],
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
      .overrideTemplate(DanhMucDonViUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucDonViUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucDonViFormService = TestBed.inject(DanhMucDonViFormService);
    danhMucDonViService = TestBed.inject(DanhMucDonViService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucDonVi: IDanhMucDonVi = { id: 456 };

      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      expect(comp.danhMucDonVi).toEqual(danhMucDonVi);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDonVi>>();
      const danhMucDonVi = { id: 123 };
      jest.spyOn(danhMucDonViFormService, 'getDanhMucDonVi').mockReturnValue(danhMucDonVi);
      jest.spyOn(danhMucDonViService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDonVi }));
      saveSubject.complete();

      // THEN
      expect(danhMucDonViFormService.getDanhMucDonVi).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucDonViService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucDonVi));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDonVi>>();
      const danhMucDonVi = { id: 123 };
      jest.spyOn(danhMucDonViFormService, 'getDanhMucDonVi').mockReturnValue({ id: null });
      jest.spyOn(danhMucDonViService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDonVi: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDonVi }));
      saveSubject.complete();

      // THEN
      expect(danhMucDonViFormService.getDanhMucDonVi).toHaveBeenCalled();
      expect(danhMucDonViService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDonVi>>();
      const danhMucDonVi = { id: 123 };
      jest.spyOn(danhMucDonViService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDonVi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucDonViService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
