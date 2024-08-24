import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DuongSuTrungCmndBakService } from '../service/duong-su-trung-cmnd-bak.service';
import { IDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';
import { DuongSuTrungCmndBakFormService } from './duong-su-trung-cmnd-bak-form.service';

import { DuongSuTrungCmndBakUpdateComponent } from './duong-su-trung-cmnd-bak-update.component';

describe('DuongSuTrungCmndBak Management Update Component', () => {
  let comp: DuongSuTrungCmndBakUpdateComponent;
  let fixture: ComponentFixture<DuongSuTrungCmndBakUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let duongSuTrungCmndBakFormService: DuongSuTrungCmndBakFormService;
  let duongSuTrungCmndBakService: DuongSuTrungCmndBakService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DuongSuTrungCmndBakUpdateComponent],
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
      .overrideTemplate(DuongSuTrungCmndBakUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DuongSuTrungCmndBakUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    duongSuTrungCmndBakFormService = TestBed.inject(DuongSuTrungCmndBakFormService);
    duongSuTrungCmndBakService = TestBed.inject(DuongSuTrungCmndBakService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const duongSuTrungCmndBak: IDuongSuTrungCmndBak = { id: 456 };

      activatedRoute.data = of({ duongSuTrungCmndBak });
      comp.ngOnInit();

      expect(comp.duongSuTrungCmndBak).toEqual(duongSuTrungCmndBak);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSuTrungCmndBak>>();
      const duongSuTrungCmndBak = { id: 123 };
      jest.spyOn(duongSuTrungCmndBakFormService, 'getDuongSuTrungCmndBak').mockReturnValue(duongSuTrungCmndBak);
      jest.spyOn(duongSuTrungCmndBakService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSuTrungCmndBak });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSuTrungCmndBak }));
      saveSubject.complete();

      // THEN
      expect(duongSuTrungCmndBakFormService.getDuongSuTrungCmndBak).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(duongSuTrungCmndBakService.update).toHaveBeenCalledWith(expect.objectContaining(duongSuTrungCmndBak));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSuTrungCmndBak>>();
      const duongSuTrungCmndBak = { id: 123 };
      jest.spyOn(duongSuTrungCmndBakFormService, 'getDuongSuTrungCmndBak').mockReturnValue({ id: null });
      jest.spyOn(duongSuTrungCmndBakService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSuTrungCmndBak: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSuTrungCmndBak }));
      saveSubject.complete();

      // THEN
      expect(duongSuTrungCmndBakFormService.getDuongSuTrungCmndBak).toHaveBeenCalled();
      expect(duongSuTrungCmndBakService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSuTrungCmndBak>>();
      const duongSuTrungCmndBak = { id: 123 };
      jest.spyOn(duongSuTrungCmndBakService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSuTrungCmndBak });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(duongSuTrungCmndBakService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
