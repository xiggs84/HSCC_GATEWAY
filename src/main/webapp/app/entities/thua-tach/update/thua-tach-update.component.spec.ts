import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { TaiSanService } from 'app/entities/tai-san/service/tai-san.service';
import { ThuaTachService } from '../service/thua-tach.service';
import { IThuaTach } from '../thua-tach.model';
import { ThuaTachFormService } from './thua-tach-form.service';

import { ThuaTachUpdateComponent } from './thua-tach-update.component';

describe('ThuaTach Management Update Component', () => {
  let comp: ThuaTachUpdateComponent;
  let fixture: ComponentFixture<ThuaTachUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thuaTachFormService: ThuaTachFormService;
  let thuaTachService: ThuaTachService;
  let taiSanService: TaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThuaTachUpdateComponent],
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
      .overrideTemplate(ThuaTachUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThuaTachUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thuaTachFormService = TestBed.inject(ThuaTachFormService);
    thuaTachService = TestBed.inject(ThuaTachService);
    taiSanService = TestBed.inject(TaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TaiSan query and add missing value', () => {
      const thuaTach: IThuaTach = { idThuaTach: 456 };
      const taiSan: ITaiSan = { idTaiSan: 20640 };
      thuaTach.taiSan = taiSan;

      const taiSanCollection: ITaiSan[] = [{ idTaiSan: 9984 }];
      jest.spyOn(taiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: taiSanCollection })));
      const additionalTaiSans = [taiSan];
      const expectedCollection: ITaiSan[] = [...additionalTaiSans, ...taiSanCollection];
      jest.spyOn(taiSanService, 'addTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thuaTach });
      comp.ngOnInit();

      expect(taiSanService.query).toHaveBeenCalled();
      expect(taiSanService.addTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        taiSanCollection,
        ...additionalTaiSans.map(expect.objectContaining),
      );
      expect(comp.taiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const thuaTach: IThuaTach = { idThuaTach: 456 };
      const taiSan: ITaiSan = { idTaiSan: 11442 };
      thuaTach.taiSan = taiSan;

      activatedRoute.data = of({ thuaTach });
      comp.ngOnInit();

      expect(comp.taiSansSharedCollection).toContain(taiSan);
      expect(comp.thuaTach).toEqual(thuaTach);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThuaTach>>();
      const thuaTach = { idThuaTach: 123 };
      jest.spyOn(thuaTachFormService, 'getThuaTach').mockReturnValue(thuaTach);
      jest.spyOn(thuaTachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thuaTach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thuaTach }));
      saveSubject.complete();

      // THEN
      expect(thuaTachFormService.getThuaTach).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(thuaTachService.update).toHaveBeenCalledWith(expect.objectContaining(thuaTach));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThuaTach>>();
      const thuaTach = { idThuaTach: 123 };
      jest.spyOn(thuaTachFormService, 'getThuaTach').mockReturnValue({ idThuaTach: null });
      jest.spyOn(thuaTachService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thuaTach: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thuaTach }));
      saveSubject.complete();

      // THEN
      expect(thuaTachFormService.getThuaTach).toHaveBeenCalled();
      expect(thuaTachService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThuaTach>>();
      const thuaTach = { idThuaTach: 123 };
      jest.spyOn(thuaTachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thuaTach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(thuaTachService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTaiSan', () => {
      it('Should forward to taiSanService', () => {
        const entity = { idTaiSan: 123 };
        const entity2 = { idTaiSan: 456 };
        jest.spyOn(taiSanService, 'compareTaiSan');
        comp.compareTaiSan(entity, entity2);
        expect(taiSanService.compareTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
