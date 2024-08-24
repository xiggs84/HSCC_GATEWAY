import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhSachHopDongService } from '../service/danh-sach-hop-dong.service';
import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { DanhSachHopDongFormService } from './danh-sach-hop-dong-form.service';

import { DanhSachHopDongUpdateComponent } from './danh-sach-hop-dong-update.component';

describe('DanhSachHopDong Management Update Component', () => {
  let comp: DanhSachHopDongUpdateComponent;
  let fixture: ComponentFixture<DanhSachHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhSachHopDongFormService: DanhSachHopDongFormService;
  let danhSachHopDongService: DanhSachHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhSachHopDongUpdateComponent],
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
      .overrideTemplate(DanhSachHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhSachHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhSachHopDongFormService = TestBed.inject(DanhSachHopDongFormService);
    danhSachHopDongService = TestBed.inject(DanhSachHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhSachHopDong: IDanhSachHopDong = { id: 456 };

      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      expect(comp.danhSachHopDong).toEqual(danhSachHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachHopDong>>();
      const danhSachHopDong = { id: 123 };
      jest.spyOn(danhSachHopDongFormService, 'getDanhSachHopDong').mockReturnValue(danhSachHopDong);
      jest.spyOn(danhSachHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhSachHopDongFormService.getDanhSachHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhSachHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(danhSachHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachHopDong>>();
      const danhSachHopDong = { id: 123 };
      jest.spyOn(danhSachHopDongFormService, 'getDanhSachHopDong').mockReturnValue({ id: null });
      jest.spyOn(danhSachHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhSachHopDongFormService.getDanhSachHopDong).toHaveBeenCalled();
      expect(danhSachHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachHopDong>>();
      const danhSachHopDong = { id: 123 };
      jest.spyOn(danhSachHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhSachHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
