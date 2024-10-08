import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from 'app/entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';
import { SoCongChungService } from 'app/entities/so-cong-chung/service/so-cong-chung.service';
import { IThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';
import { ThongTinChungHopDongService } from '../service/thong-tin-chung-hop-dong.service';
import { ThongTinChungHopDongFormService } from './thong-tin-chung-hop-dong-form.service';

import { ThongTinChungHopDongUpdateComponent } from './thong-tin-chung-hop-dong-update.component';

describe('ThongTinChungHopDong Management Update Component', () => {
  let comp: ThongTinChungHopDongUpdateComponent;
  let fixture: ComponentFixture<ThongTinChungHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thongTinChungHopDongFormService: ThongTinChungHopDongFormService;
  let thongTinChungHopDongService: ThongTinChungHopDongService;
  let danhMucLoaiHopDongService: DanhMucLoaiHopDongService;
  let soCongChungService: SoCongChungService;

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
    danhMucLoaiHopDongService = TestBed.inject(DanhMucLoaiHopDongService);
    soCongChungService = TestBed.inject(SoCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucLoaiHopDong query and add missing value', () => {
      const thongTinChungHopDong: IThongTinChungHopDong = { id: 456 };
      const danhMucLoaiHopDong: IDanhMucLoaiHopDong = { idLoaiHd: '2e902753-75bf-4550-b9f2-f98c0cc80f88' };
      thongTinChungHopDong.danhMucLoaiHopDong = danhMucLoaiHopDong;

      const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [{ idLoaiHd: '1c169a68-05b4-4d99-b29d-397366a66080' }];
      jest.spyOn(danhMucLoaiHopDongService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucLoaiHopDongCollection })));
      const additionalDanhMucLoaiHopDongs = [danhMucLoaiHopDong];
      const expectedCollection: IDanhMucLoaiHopDong[] = [...additionalDanhMucLoaiHopDongs, ...danhMucLoaiHopDongCollection];
      jest.spyOn(danhMucLoaiHopDongService, 'addDanhMucLoaiHopDongToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      expect(danhMucLoaiHopDongService.query).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.addDanhMucLoaiHopDongToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucLoaiHopDongCollection,
        ...additionalDanhMucLoaiHopDongs.map(expect.objectContaining),
      );
      expect(comp.danhMucLoaiHopDongsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SoCongChung query and add missing value', () => {
      const thongTinChungHopDong: IThongTinChungHopDong = { id: 456 };
      const soCongChung: ISoCongChung = { idSo: 'd118d8e9-6e9c-4ca0-9db3-2a6662de55ab' };
      thongTinChungHopDong.soCongChung = soCongChung;

      const soCongChungCollection: ISoCongChung[] = [{ idSo: 'b15dae05-54e4-4730-a129-2ef2e821348f' }];
      jest.spyOn(soCongChungService, 'query').mockReturnValue(of(new HttpResponse({ body: soCongChungCollection })));
      const additionalSoCongChungs = [soCongChung];
      const expectedCollection: ISoCongChung[] = [...additionalSoCongChungs, ...soCongChungCollection];
      jest.spyOn(soCongChungService, 'addSoCongChungToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      expect(soCongChungService.query).toHaveBeenCalled();
      expect(soCongChungService.addSoCongChungToCollectionIfMissing).toHaveBeenCalledWith(
        soCongChungCollection,
        ...additionalSoCongChungs.map(expect.objectContaining),
      );
      expect(comp.soCongChungsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const thongTinChungHopDong: IThongTinChungHopDong = { id: 456 };
      const danhMucLoaiHopDong: IDanhMucLoaiHopDong = { idLoaiHd: '8bb9b220-47d2-426e-bdee-41212c460bb1' };
      thongTinChungHopDong.danhMucLoaiHopDong = danhMucLoaiHopDong;
      const soCongChung: ISoCongChung = { idSo: '4e404bb0-f922-4c9b-9d94-ad5e97613b0f' };
      thongTinChungHopDong.soCongChung = soCongChung;

      activatedRoute.data = of({ thongTinChungHopDong });
      comp.ngOnInit();

      expect(comp.danhMucLoaiHopDongsSharedCollection).toContain(danhMucLoaiHopDong);
      expect(comp.soCongChungsSharedCollection).toContain(soCongChung);
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

  describe('Compare relationships', () => {
    describe('compareDanhMucLoaiHopDong', () => {
      it('Should forward to danhMucLoaiHopDongService', () => {
        const entity = { idLoaiHd: 'ABC' };
        const entity2 = { idLoaiHd: 'CBA' };
        jest.spyOn(danhMucLoaiHopDongService, 'compareDanhMucLoaiHopDong');
        comp.compareDanhMucLoaiHopDong(entity, entity2);
        expect(danhMucLoaiHopDongService.compareDanhMucLoaiHopDong).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSoCongChung', () => {
      it('Should forward to soCongChungService', () => {
        const entity = { idSo: 'ABC' };
        const entity2 = { idSo: 'CBA' };
        jest.spyOn(soCongChungService, 'compareSoCongChung');
        comp.compareSoCongChung(entity, entity2);
        expect(soCongChungService.compareSoCongChung).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
