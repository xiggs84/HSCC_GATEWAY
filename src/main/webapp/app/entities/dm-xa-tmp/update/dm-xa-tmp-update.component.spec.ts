import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DmXaTmpService } from '../service/dm-xa-tmp.service';
import { IDmXaTmp } from '../dm-xa-tmp.model';
import { DmXaTmpFormService } from './dm-xa-tmp-form.service';

import { DmXaTmpUpdateComponent } from './dm-xa-tmp-update.component';

describe('DmXaTmp Management Update Component', () => {
  let comp: DmXaTmpUpdateComponent;
  let fixture: ComponentFixture<DmXaTmpUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmXaTmpFormService: DmXaTmpFormService;
  let dmXaTmpService: DmXaTmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmXaTmpUpdateComponent],
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
      .overrideTemplate(DmXaTmpUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmXaTmpUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmXaTmpFormService = TestBed.inject(DmXaTmpFormService);
    dmXaTmpService = TestBed.inject(DmXaTmpService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dmXaTmp: IDmXaTmp = { id: 456 };

      activatedRoute.data = of({ dmXaTmp });
      comp.ngOnInit();

      expect(comp.dmXaTmp).toEqual(dmXaTmp);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmXaTmp>>();
      const dmXaTmp = { id: 123 };
      jest.spyOn(dmXaTmpFormService, 'getDmXaTmp').mockReturnValue(dmXaTmp);
      jest.spyOn(dmXaTmpService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmXaTmp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmXaTmp }));
      saveSubject.complete();

      // THEN
      expect(dmXaTmpFormService.getDmXaTmp).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmXaTmpService.update).toHaveBeenCalledWith(expect.objectContaining(dmXaTmp));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmXaTmp>>();
      const dmXaTmp = { id: 123 };
      jest.spyOn(dmXaTmpFormService, 'getDmXaTmp').mockReturnValue({ id: null });
      jest.spyOn(dmXaTmpService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmXaTmp: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmXaTmp }));
      saveSubject.complete();

      // THEN
      expect(dmXaTmpFormService.getDmXaTmp).toHaveBeenCalled();
      expect(dmXaTmpService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmXaTmp>>();
      const dmXaTmp = { id: 123 };
      jest.spyOn(dmXaTmpService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmXaTmp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmXaTmpService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
