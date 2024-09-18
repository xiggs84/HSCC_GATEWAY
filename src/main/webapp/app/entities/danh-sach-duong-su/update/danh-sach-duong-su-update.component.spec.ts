import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDuongSu } from 'app/entities/duong-su/duong-su.model';
import { DuongSuService } from 'app/entities/duong-su/service/duong-su.service';
import { DanhSachDuongSuService } from '../service/danh-sach-duong-su.service';
import { IDanhSachDuongSu } from '../danh-sach-duong-su.model';
import { DanhSachDuongSuFormService } from './danh-sach-duong-su-form.service';

import { DanhSachDuongSuUpdateComponent } from './danh-sach-duong-su-update.component';

describe('DanhSachDuongSu Management Update Component', () => {
  let comp: DanhSachDuongSuUpdateComponent;
  let fixture: ComponentFixture<DanhSachDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhSachDuongSuFormService: DanhSachDuongSuFormService;
  let danhSachDuongSuService: DanhSachDuongSuService;
  let duongSuService: DuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhSachDuongSuUpdateComponent],
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
      .overrideTemplate(DanhSachDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhSachDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhSachDuongSuFormService = TestBed.inject(DanhSachDuongSuFormService);
    danhSachDuongSuService = TestBed.inject(DanhSachDuongSuService);
    duongSuService = TestBed.inject(DuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DuongSu query and add missing value', () => {
      const danhSachDuongSu: IDanhSachDuongSu = { id: 456 };
      const duongSu: IDuongSu = { idDuongSu: 16676 };
      danhSachDuongSu.duongSu = duongSu;

      const duongSuCollection: IDuongSu[] = [{ idDuongSu: 5385 }];
      jest.spyOn(duongSuService, 'query').mockReturnValue(of(new HttpResponse({ body: duongSuCollection })));
      const additionalDuongSus = [duongSu];
      const expectedCollection: IDuongSu[] = [...additionalDuongSus, ...duongSuCollection];
      jest.spyOn(duongSuService, 'addDuongSuToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhSachDuongSu });
      comp.ngOnInit();

      expect(duongSuService.query).toHaveBeenCalled();
      expect(duongSuService.addDuongSuToCollectionIfMissing).toHaveBeenCalledWith(
        duongSuCollection,
        ...additionalDuongSus.map(expect.objectContaining),
      );
      expect(comp.duongSusSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhSachDuongSu: IDanhSachDuongSu = { id: 456 };
      const duongSu: IDuongSu = { idDuongSu: 110 };
      danhSachDuongSu.duongSu = duongSu;

      activatedRoute.data = of({ danhSachDuongSu });
      comp.ngOnInit();

      expect(comp.duongSusSharedCollection).toContain(duongSu);
      expect(comp.danhSachDuongSu).toEqual(danhSachDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachDuongSu>>();
      const danhSachDuongSu = { id: 123 };
      jest.spyOn(danhSachDuongSuFormService, 'getDanhSachDuongSu').mockReturnValue(danhSachDuongSu);
      jest.spyOn(danhSachDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachDuongSu }));
      saveSubject.complete();

      // THEN
      expect(danhSachDuongSuFormService.getDanhSachDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhSachDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(danhSachDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachDuongSu>>();
      const danhSachDuongSu = { id: 123 };
      jest.spyOn(danhSachDuongSuFormService, 'getDanhSachDuongSu').mockReturnValue({ id: null });
      jest.spyOn(danhSachDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhSachDuongSu }));
      saveSubject.complete();

      // THEN
      expect(danhSachDuongSuFormService.getDanhSachDuongSu).toHaveBeenCalled();
      expect(danhSachDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhSachDuongSu>>();
      const danhSachDuongSu = { id: 123 };
      jest.spyOn(danhSachDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhSachDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhSachDuongSuService.update).toHaveBeenCalled();
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
  });
});
