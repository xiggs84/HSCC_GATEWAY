import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DmHuyenTmpService } from '../service/dm-huyen-tmp.service';
import { IDmHuyenTmp } from '../dm-huyen-tmp.model';
import { DmHuyenTmpFormService } from './dm-huyen-tmp-form.service';

import { DmHuyenTmpUpdateComponent } from './dm-huyen-tmp-update.component';

describe('DmHuyenTmp Management Update Component', () => {
  let comp: DmHuyenTmpUpdateComponent;
  let fixture: ComponentFixture<DmHuyenTmpUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmHuyenTmpFormService: DmHuyenTmpFormService;
  let dmHuyenTmpService: DmHuyenTmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmHuyenTmpUpdateComponent],
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
      .overrideTemplate(DmHuyenTmpUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmHuyenTmpUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmHuyenTmpFormService = TestBed.inject(DmHuyenTmpFormService);
    dmHuyenTmpService = TestBed.inject(DmHuyenTmpService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dmHuyenTmp: IDmHuyenTmp = { id: 456 };

      activatedRoute.data = of({ dmHuyenTmp });
      comp.ngOnInit();

      expect(comp.dmHuyenTmp).toEqual(dmHuyenTmp);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmHuyenTmp>>();
      const dmHuyenTmp = { id: 123 };
      jest.spyOn(dmHuyenTmpFormService, 'getDmHuyenTmp').mockReturnValue(dmHuyenTmp);
      jest.spyOn(dmHuyenTmpService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmHuyenTmp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmHuyenTmp }));
      saveSubject.complete();

      // THEN
      expect(dmHuyenTmpFormService.getDmHuyenTmp).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmHuyenTmpService.update).toHaveBeenCalledWith(expect.objectContaining(dmHuyenTmp));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmHuyenTmp>>();
      const dmHuyenTmp = { id: 123 };
      jest.spyOn(dmHuyenTmpFormService, 'getDmHuyenTmp').mockReturnValue({ id: null });
      jest.spyOn(dmHuyenTmpService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmHuyenTmp: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmHuyenTmp }));
      saveSubject.complete();

      // THEN
      expect(dmHuyenTmpFormService.getDmHuyenTmp).toHaveBeenCalled();
      expect(dmHuyenTmpService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmHuyenTmp>>();
      const dmHuyenTmp = { id: 123 };
      jest.spyOn(dmHuyenTmpService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmHuyenTmp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmHuyenTmpService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
