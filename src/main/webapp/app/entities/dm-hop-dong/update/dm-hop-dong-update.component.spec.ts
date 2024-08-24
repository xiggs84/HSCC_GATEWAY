import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DmHopDongService } from '../service/dm-hop-dong.service';
import { IDmHopDong } from '../dm-hop-dong.model';
import { DmHopDongFormService } from './dm-hop-dong-form.service';

import { DmHopDongUpdateComponent } from './dm-hop-dong-update.component';

describe('DmHopDong Management Update Component', () => {
  let comp: DmHopDongUpdateComponent;
  let fixture: ComponentFixture<DmHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmHopDongFormService: DmHopDongFormService;
  let dmHopDongService: DmHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmHopDongUpdateComponent],
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
      .overrideTemplate(DmHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmHopDongFormService = TestBed.inject(DmHopDongFormService);
    dmHopDongService = TestBed.inject(DmHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dmHopDong: IDmHopDong = { id: 456 };

      activatedRoute.data = of({ dmHopDong });
      comp.ngOnInit();

      expect(comp.dmHopDong).toEqual(dmHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmHopDong>>();
      const dmHopDong = { id: 123 };
      jest.spyOn(dmHopDongFormService, 'getDmHopDong').mockReturnValue(dmHopDong);
      jest.spyOn(dmHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmHopDong }));
      saveSubject.complete();

      // THEN
      expect(dmHopDongFormService.getDmHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(dmHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmHopDong>>();
      const dmHopDong = { id: 123 };
      jest.spyOn(dmHopDongFormService, 'getDmHopDong').mockReturnValue({ id: null });
      jest.spyOn(dmHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmHopDong }));
      saveSubject.complete();

      // THEN
      expect(dmHopDongFormService.getDmHopDong).toHaveBeenCalled();
      expect(dmHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmHopDong>>();
      const dmHopDong = { id: 123 };
      jest.spyOn(dmHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
