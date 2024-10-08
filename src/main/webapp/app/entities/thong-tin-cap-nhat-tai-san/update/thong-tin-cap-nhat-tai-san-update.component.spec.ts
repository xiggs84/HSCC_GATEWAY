import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { TaiSanService } from 'app/entities/tai-san/service/tai-san.service';
import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from 'app/entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { IThongTinCapNhatTaiSan } from '../thong-tin-cap-nhat-tai-san.model';
import { ThongTinCapNhatTaiSanService } from '../service/thong-tin-cap-nhat-tai-san.service';
import { ThongTinCapNhatTaiSanFormService } from './thong-tin-cap-nhat-tai-san-form.service';

import { ThongTinCapNhatTaiSanUpdateComponent } from './thong-tin-cap-nhat-tai-san-update.component';

describe('ThongTinCapNhatTaiSan Management Update Component', () => {
  let comp: ThongTinCapNhatTaiSanUpdateComponent;
  let fixture: ComponentFixture<ThongTinCapNhatTaiSanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thongTinCapNhatTaiSanFormService: ThongTinCapNhatTaiSanFormService;
  let thongTinCapNhatTaiSanService: ThongTinCapNhatTaiSanService;
  let taiSanService: TaiSanService;
  let danhMucLoaiTaiSanService: DanhMucLoaiTaiSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThongTinCapNhatTaiSanUpdateComponent],
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
      .overrideTemplate(ThongTinCapNhatTaiSanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThongTinCapNhatTaiSanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thongTinCapNhatTaiSanFormService = TestBed.inject(ThongTinCapNhatTaiSanFormService);
    thongTinCapNhatTaiSanService = TestBed.inject(ThongTinCapNhatTaiSanService);
    taiSanService = TestBed.inject(TaiSanService);
    danhMucLoaiTaiSanService = TestBed.inject(DanhMucLoaiTaiSanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TaiSan query and add missing value', () => {
      const thongTinCapNhatTaiSan: IThongTinCapNhatTaiSan = { idCapNhat: 456 };
      const taiSan: ITaiSan = { idTaiSan: 10806 };
      thongTinCapNhatTaiSan.taiSan = taiSan;

      const taiSanCollection: ITaiSan[] = [{ idTaiSan: 27245 }];
      jest.spyOn(taiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: taiSanCollection })));
      const additionalTaiSans = [taiSan];
      const expectedCollection: ITaiSan[] = [...additionalTaiSans, ...taiSanCollection];
      jest.spyOn(taiSanService, 'addTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thongTinCapNhatTaiSan });
      comp.ngOnInit();

      expect(taiSanService.query).toHaveBeenCalled();
      expect(taiSanService.addTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        taiSanCollection,
        ...additionalTaiSans.map(expect.objectContaining),
      );
      expect(comp.taiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DanhMucLoaiTaiSan query and add missing value', () => {
      const thongTinCapNhatTaiSan: IThongTinCapNhatTaiSan = { idCapNhat: 456 };
      const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = { idLoaiTs: 22791 };
      thongTinCapNhatTaiSan.danhMucLoaiTaiSan = danhMucLoaiTaiSan;

      const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [{ idLoaiTs: 4627 }];
      jest.spyOn(danhMucLoaiTaiSanService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiTaiSanCollection })));
      const additionalDanhMucLoaiTaiSans = [danhMucLoaiTaiSan];
      const expectedCollection: IDanhMucLoaiTaiSan[] = [...additionalDanhMucLoaiTaiSans, ...danhMucLoaiTaiSanCollection];
      jest.spyOn(danhMucLoaiTaiSanService, 'addDanhMucLoaiTaiSanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thongTinCapNhatTaiSan });
      comp.ngOnInit();

      expect(danhMucLoaiTaiSanService.query).toHaveBeenCalled();
      expect(danhMucLoaiTaiSanService.addDanhMucLoaiTaiSanToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiTaiSanCollection,
        ...additionalDanhMucLoaiTaiSans.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiTaiSansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const thongTinCapNhatTaiSan: IThongTinCapNhatTaiSan = { idCapNhat: 456 };
      const taiSan: ITaiSan = { idTaiSan: 20588 };
      thongTinCapNhatTaiSan.taiSan = taiSan;
      const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = { idLoaiTs: 15236 };
      thongTinCapNhatTaiSan.danhMucLoaiTaiSan = danhMucLoaiTaiSan;

      activatedRoute.data = of({ thongTinCapNhatTaiSan });
      comp.ngOnInit();

      expect(comp.taiSansSharedCollection).toContain(taiSan);
      expect(comp.danhMucLoaiTaiSansSharedCollection).toContain(danhMucLoaiTaiSan);
      expect(comp.thongTinCapNhatTaiSan).toEqual(thongTinCapNhatTaiSan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThongTinCapNhatTaiSan>>();
      const thongTinCapNhatTaiSan = { idCapNhat: 123 };
      jest.spyOn(thongTinCapNhatTaiSanFormService, 'getThongTinCapNhatTaiSan').mockReturnValue(thongTinCapNhatTaiSan);
      jest.spyOn(thongTinCapNhatTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinCapNhatTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongTinCapNhatTaiSan }));
      saveSubject.complete();

      // THEN
      expect(thongTinCapNhatTaiSanFormService.getThongTinCapNhatTaiSan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(thongTinCapNhatTaiSanService.update).toHaveBeenCalledWith(expect.objectContaining(thongTinCapNhatTaiSan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThongTinCapNhatTaiSan>>();
      const thongTinCapNhatTaiSan = { idCapNhat: 123 };
      jest.spyOn(thongTinCapNhatTaiSanFormService, 'getThongTinCapNhatTaiSan').mockReturnValue({ idCapNhat: null });
      jest.spyOn(thongTinCapNhatTaiSanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinCapNhatTaiSan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongTinCapNhatTaiSan }));
      saveSubject.complete();

      // THEN
      expect(thongTinCapNhatTaiSanFormService.getThongTinCapNhatTaiSan).toHaveBeenCalled();
      expect(thongTinCapNhatTaiSanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThongTinCapNhatTaiSan>>();
      const thongTinCapNhatTaiSan = { idCapNhat: 123 };
      jest.spyOn(thongTinCapNhatTaiSanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinCapNhatTaiSan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(thongTinCapNhatTaiSanService.update).toHaveBeenCalled();
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

    describe('compareDanhMucLoaiTaiSan', () => {
      it('Should forward to danhMucLoaiTaiSanService', () => {
        const entity = { idLoaiTs: 123 };
        const entity2 = { idLoaiTs: 456 };
        jest.spyOn(danhMucLoaiTaiSanService, 'compareDanhMucLoaiTaiSan');
        comp.compareDanhMucLoaiTaiSan(entity, entity2);
        expect(danhMucLoaiTaiSanService.compareDanhMucLoaiTaiSan).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
