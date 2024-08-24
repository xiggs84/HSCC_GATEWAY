import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ThongTinChungHopDongService } from '../service/thong-tin-chung-hop-dong.service';
import { IThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';
import { ThongTinChungHopDongFormService } from './thong-tin-chung-hop-dong-form.service';

import { ThongTinChungHopDongUpdateComponent } from './thong-tin-chung-hop-dong-update.component';

describe('ThongTinChungHopDong Management Update Component', () => {
  let comp: ThongTinChungHopDongUpdateComponent;
  let fixture: ComponentFixture<ThongTinChungHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thongTinChungHopDongFormService: ThongTinChungHopDongFormService;
  let thongTinChungHopDongService: ThongTinChungHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThongTinChungHopDongUpdateComponent],
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
      .overrideTemplate(ThongTinChungHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThongTinChungHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thongTinChungHopDongFormService = TestBed.inject(ThongTinChungHopDongFormService);
    thongTinChungHopDongService = TestBed.inject(ThongTinChungHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const thongTinChungHopDong: IThongTinChungHopDong = { id: 456 };

      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      expect(comp.thongTinChungHopDong).toEqual(thongTinChungHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThongTinChungHopDong>>();
      const thongTinChungHopDong = { id: 123 };
      jest.spyOn(thongTinChungHopDongFormService, 'getThongTinChungHopDong').mockReturnValue(thongTinChungHopDong);
      jest.spyOn(thongTinChungHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongTinChungHopDong }));
      saveSubject.complete();

      // THEN
      expect(thongTinChungHopDongFormService.getThongTinChungHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(thongTinChungHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(thongTinChungHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThongTinChungHopDong>>();
      const thongTinChungHopDong = { id: 123 };
      jest.spyOn(thongTinChungHopDongFormService, 'getThongTinChungHopDong').mockReturnValue({ id: null });
      jest.spyOn(thongTinChungHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinChungHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongTinChungHopDong }));
      saveSubject.complete();

      // THEN
      expect(thongTinChungHopDongFormService.getThongTinChungHopDong).toHaveBeenCalled();
      expect(thongTinChungHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThongTinChungHopDong>>();
      const thongTinChungHopDong = { id: 123 };
      jest.spyOn(thongTinChungHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(thongTinChungHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
