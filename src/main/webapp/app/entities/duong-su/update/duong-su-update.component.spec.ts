import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { DuongSuService } from '../service/duong-su.service';
import { IDuongSu } from '../duong-su.model';
import { DuongSuFormService } from './duong-su-form.service';

import { DuongSuUpdateComponent } from './duong-su-update.component';

describe('DuongSu Management Update Component', () => {
  let comp: DuongSuUpdateComponent;
  let fixture: ComponentFixture<DuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let duongSuFormService: DuongSuFormService;
  let duongSuService: DuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DuongSuUpdateComponent],
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
      .overrideTemplate(DuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    duongSuFormService = TestBed.inject(DuongSuFormService);
    duongSuService = TestBed.inject(DuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const duongSu: IDuongSu = { idDuongSu: 456 };

      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      expect(comp.duongSu).toEqual(duongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSu>>();
      const duongSu = { idDuongSu: 123 };
      jest.spyOn(duongSuFormService, 'getDuongSu').mockReturnValue(duongSu);
      jest.spyOn(duongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSu }));
      saveSubject.complete();

      // THEN
      expect(duongSuFormService.getDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(duongSuService.update).toHaveBeenCalledWith(expect.objectContaining(duongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSu>>();
      const duongSu = { idDuongSu: 123 };
      jest.spyOn(duongSuFormService, 'getDuongSu').mockReturnValue({ idDuongSu: null });
      jest.spyOn(duongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: duongSu }));
      saveSubject.complete();

      // THEN
      expect(duongSuFormService.getDuongSu).toHaveBeenCalled();
      expect(duongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDuongSu>>();
      const duongSu = { idDuongSu: 123 };
      jest.spyOn(duongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ duongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(duongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
