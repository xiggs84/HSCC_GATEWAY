import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DmTinhTmpService } from '../service/dm-tinh-tmp.service';
import { IDmTinhTmp } from '../dm-tinh-tmp.model';
import { DmTinhTmpFormService } from './dm-tinh-tmp-form.service';

import { DmTinhTmpUpdateComponent } from './dm-tinh-tmp-update.component';

describe('DmTinhTmp Management Update Component', () => {
  let comp: DmTinhTmpUpdateComponent;
  let fixture: ComponentFixture<DmTinhTmpUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmTinhTmpFormService: DmTinhTmpFormService;
  let dmTinhTmpService: DmTinhTmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmTinhTmpUpdateComponent],
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
      .overrideTemplate(DmTinhTmpUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmTinhTmpUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmTinhTmpFormService = TestBed.inject(DmTinhTmpFormService);
    dmTinhTmpService = TestBed.inject(DmTinhTmpService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dmTinhTmp: IDmTinhTmp = { id: 456 };

      activatedRoute.data = of({ dmTinhTmp });
      comp.ngOnInit();

      expect(comp.dmTinhTmp).toEqual(dmTinhTmp);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmTinhTmp>>();
      const dmTinhTmp = { id: 123 };
      jest.spyOn(dmTinhTmpFormService, 'getDmTinhTmp').mockReturnValue(dmTinhTmp);
      jest.spyOn(dmTinhTmpService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmTinhTmp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmTinhTmp }));
      saveSubject.complete();

      // THEN
      expect(dmTinhTmpFormService.getDmTinhTmp).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmTinhTmpService.update).toHaveBeenCalledWith(expect.objectContaining(dmTinhTmp));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmTinhTmp>>();
      const dmTinhTmp = { id: 123 };
      jest.spyOn(dmTinhTmpFormService, 'getDmTinhTmp').mockReturnValue({ id: null });
      jest.spyOn(dmTinhTmpService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmTinhTmp: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmTinhTmp }));
      saveSubject.complete();

      // THEN
      expect(dmTinhTmpFormService.getDmTinhTmp).toHaveBeenCalled();
      expect(dmTinhTmpService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmTinhTmp>>();
      const dmTinhTmp = { id: 123 };
      jest.spyOn(dmTinhTmpService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmTinhTmp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmTinhTmpService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
