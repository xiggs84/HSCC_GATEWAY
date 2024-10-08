import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDuongSu } from 'app/entities/duong-su/duong-su.model';
import { DuongSuService } from 'app/entities/duong-su/service/duong-su.service';
import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { TaiSanService } from 'app/entities/tai-san/service/tai-san.service';
import { ITaiSanDuongSu } from '../tai-san-duong-su.model';
import { TaiSanDuongSuService } from '../service/tai-san-duong-su.service';
import { TaiSanDuongSuFormService } from './tai-san-duong-su-form.service';

import { TaiSanDuongSuUpdateComponent } from './tai-san-duong-su-update.component';

describe('TaiSanDuongSu Management Update Component', () => {
  let comp: TaiSanDuongSuUpdateComponent;
  let fixture: ComponentFixture<TaiSanDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taiSanDuongSuFormService: TaiSanDuongSuFormService;
  let taiSanDuongSuService: TaiSanDuongSuService;
  let duongSuService: DuongSuService;
  let taiSanService: TaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaiSanDuongSuUpdateComponent],
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
      .overrideTemplate(TaiSanDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaiSanDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taiSanDuongSuFormService = TestBed.inject(TaiSanDuongSuFormService);
    taiSanDuongSuService = TestBed.inject(TaiSanDuongSuService);
    duongSuService = TestBed.inject(DuongSuService);
    taiSanService = TestBed.inject(TaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DuongSu query and add missing value', () => {
      const taiSanDuongSu: ITaiSanDuongSu = { id: 456 };
      const duongSu: IDuongSu = { idDuongSu: 25250 };
      taiSanDuongSu.duongSu = duongSu;

      const duongSuCollection: IDuongSu[] = [{ idDuongSu: 18600 }];
      jest.spyOn(duongSuService, 'query').mockReturnValue(of(new HttpResponse({ body: duongSuCollection })));
      const additionalDuongSus = [duongSu];
      const expectedCollection: IDuongSu[] = [...additionalDuongSus, ...duongSuCollection];
      jest.spyOn(duongSuService, 'addDuongSuToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSanDuongSu });
      comp.ngOnInit();

      expect(duongSuService.query).toHaveBeenCalled();
      expect(duongSuService.addDuongSuToCollectionIfMissing).toHaveBeenCalledWith(
        duongSuCollection,
        ...additionalDuongSus.map(expect.objectContaining),
      );
      expect(comp.duongSusSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TaiSan query and add missing value', () => {
      const taiSanDuongSu: ITaiSanDuongSu = { id: 456 };
      const taiSan: ITaiSan = { idTaiSan: 18123 };
      taiSanDuongSu.taiSan = taiSan;

      const taiSanCollection: ITaiSan[] = [{ idTaiSan: 23330 }];
      jest.spyOn(taiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: taiSanCollection })));
      const additionalTaiSans = [taiSan];
      const expectedCollection: ITaiSan[] = [...additionalTaiSans, ...taiSanCollection];
      jest.spyOn(taiSanService, 'addTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taiSanDuongSu });
      comp.ngOnInit();

      expect(taiSanService.query).toHaveBeenCalled();
      expect(taiSanService.addTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        taiSanCollection,
        ...additionalTaiSans.map(expect.objectContaining),
      );
      expect(comp.taiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const taiSanDuongSu: ITaiSanDuongSu = { id: 456 };
      const duongSu: IDuongSu = { idDuongSu: 216 };
      taiSanDuongSu.duongSu = duongSu;
      const taiSan: ITaiSan = { idTaiSan: 30005 };
      taiSanDuongSu.taiSan = taiSan;

      activatedRoute.data = of({ taiSanDuongSu });
      comp.ngOnInit();

      expect(comp.duongSusSharedCollection).toContain(duongSu);
      expect(comp.taiSansSharedCollection).toContain(taiSan);
      expect(comp.taiSanDuongSu).toEqual(taiSanDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDuongSu>>();
      const taiSanDuongSu = { id: 123 };
      jest.spyOn(taiSanDuongSuFormService, 'getTaiSanDuongSu').mockReturnValue(taiSanDuongSu);
      jest.spyOn(taiSanDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDuongSu }));
      saveSubject.complete();

      // THEN
      expect(taiSanDuongSuFormService.getTaiSanDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taiSanDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(taiSanDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDuongSu>>();
      const taiSanDuongSu = { id: 123 };
      jest.spyOn(taiSanDuongSuFormService, 'getTaiSanDuongSu').mockReturnValue({ id: null });
      jest.spyOn(taiSanDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taiSanDuongSu }));
      saveSubject.complete();

      // THEN
      expect(taiSanDuongSuFormService.getTaiSanDuongSu).toHaveBeenCalled();
      expect(taiSanDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaiSanDuongSu>>();
      const taiSanDuongSu = { id: 123 };
      jest.spyOn(taiSanDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taiSanDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taiSanDuongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDuongSu', () => {
      it('Should forward to duongSuService', () => {
        const entity = { idDuongSu: 123 };
        const entity2 = { idDuongSu: 456 };
        jest.spyOn(duongSuService, 'compareDuongSu');
        comp.compareDuongSu(entity, entity2);
        expect(duongSuService.compareDuongSu).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
