import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { DanhMucHuyenService } from '../service/danh-muc-huyen.service';
import { IDanhMucHuyen } from '../danh-muc-huyen.model';
import { DanhMucHuyenFormService } from './danh-muc-huyen-form.service';

import { DanhMucHuyenUpdateComponent } from './danh-muc-huyen-update.component';

describe('DanhMucHuyen Management Update Component', () => {
  let comp: DanhMucHuyenUpdateComponent;
  let fixture: ComponentFixture<DanhMucHuyenUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucHuyenFormService: DanhMucHuyenFormService;
  let danhMucHuyenService: DanhMucHuyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucHuyenUpdateComponent],
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
      .overrideTemplate(DanhMucHuyenUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucHuyenUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucHuyenFormService = TestBed.inject(DanhMucHuyenFormService);
    danhMucHuyenService = TestBed.inject(DanhMucHuyenService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucHuyen: IDanhMucHuyen = { maHuyen: 'CBA' };

      activatedRoute.data = of({ danhMucHuyen });
      comp.ngOnInit();

      expect(comp.danhMucHuyen).toEqual(danhMucHuyen);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucHuyen>>();
      const danhMucHuyen = { maHuyen: 'ABC' };
      jest.spyOn(danhMucHuyenFormService, 'getDanhMucHuyen').mockReturnValue(danhMucHuyen);
      jest.spyOn(danhMucHuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucHuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucHuyen }));
      saveSubject.complete();

      // THEN
      expect(danhMucHuyenFormService.getDanhMucHuyen).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucHuyenService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucHuyen));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucHuyen>>();
      const danhMucHuyen = { maHuyen: 'ABC' };
      jest.spyOn(danhMucHuyenFormService, 'getDanhMucHuyen').mockReturnValue({ maHuyen: null });
      jest.spyOn(danhMucHuyenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucHuyen: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucHuyen }));
      saveSubject.complete();

      // THEN
      expect(danhMucHuyenFormService.getDanhMucHuyen).toHaveBeenCalled();
      expect(danhMucHuyenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucHuyen>>();
      const danhMucHuyen = { maHuyen: 'ABC' };
      jest.spyOn(danhMucHuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucHuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucHuyenService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
