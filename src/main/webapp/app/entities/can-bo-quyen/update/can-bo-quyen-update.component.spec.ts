import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CanBoQuyenService } from '../service/can-bo-quyen.service';
import { ICanBoQuyen } from '../can-bo-quyen.model';
import { CanBoQuyenFormService } from './can-bo-quyen-form.service';

import { CanBoQuyenUpdateComponent } from './can-bo-quyen-update.component';

describe('CanBoQuyen Management Update Component', () => {
  let comp: CanBoQuyenUpdateComponent;
  let fixture: ComponentFixture<CanBoQuyenUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let canBoQuyenFormService: CanBoQuyenFormService;
  let canBoQuyenService: CanBoQuyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CanBoQuyenUpdateComponent],
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
      .overrideTemplate(CanBoQuyenUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CanBoQuyenUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    canBoQuyenFormService = TestBed.inject(CanBoQuyenFormService);
    canBoQuyenService = TestBed.inject(CanBoQuyenService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const canBoQuyen: ICanBoQuyen = { id: 456 };

      activatedRoute.data = of({ canBoQuyen });
      comp.ngOnInit();

      expect(comp.canBoQuyen).toEqual(canBoQuyen);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICanBoQuyen>>();
      const canBoQuyen = { id: 123 };
      jest.spyOn(canBoQuyenFormService, 'getCanBoQuyen').mockReturnValue(canBoQuyen);
      jest.spyOn(canBoQuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ canBoQuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: canBoQuyen }));
      saveSubject.complete();

      // THEN
      expect(canBoQuyenFormService.getCanBoQuyen).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(canBoQuyenService.update).toHaveBeenCalledWith(expect.objectContaining(canBoQuyen));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICanBoQuyen>>();
      const canBoQuyen = { id: 123 };
      jest.spyOn(canBoQuyenFormService, 'getCanBoQuyen').mockReturnValue({ id: null });
      jest.spyOn(canBoQuyenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ canBoQuyen: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: canBoQuyen }));
      saveSubject.complete();

      // THEN
      expect(canBoQuyenFormService.getCanBoQuyen).toHaveBeenCalled();
      expect(canBoQuyenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICanBoQuyen>>();
      const canBoQuyen = { id: 123 };
      jest.spyOn(canBoQuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ canBoQuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(canBoQuyenService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
