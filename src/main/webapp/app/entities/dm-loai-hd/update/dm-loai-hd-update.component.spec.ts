import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDanhMucNhomHopDong } from 'app/entities/danh-muc-nhom-hop-dong/danh-muc-nhom-hop-dong.model';
import { DanhMucNhomHopDongService } from 'app/entities/danh-muc-nhom-hop-dong/service/danh-muc-nhom-hop-dong.service';
import { DmLoaiHdService } from '../service/dm-loai-hd.service';
import { IDmLoaiHd } from '../dm-loai-hd.model';
import { DmLoaiHdFormService } from './dm-loai-hd-form.service';

import { DmLoaiHdUpdateComponent } from './dm-loai-hd-update.component';

describe('DmLoaiHd Management Update Component', () => {
  let comp: DmLoaiHdUpdateComponent;
  let fixture: ComponentFixture<DmLoaiHdUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmLoaiHdFormService: DmLoaiHdFormService;
  let dmLoaiHdService: DmLoaiHdService;
  let danhMucNhomHopDongService: DanhMucNhomHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmLoaiHdUpdateComponent],
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
      .overrideTemplate(DmLoaiHdUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmLoaiHdUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmLoaiHdFormService = TestBed.inject(DmLoaiHdFormService);
    dmLoaiHdService = TestBed.inject(DmLoaiHdService);
    danhMucNhomHopDongService = TestBed.inject(DanhMucNhomHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucNhomHopDong query and add missing value', () => {
      const dmLoaiHd: IDmLoaiHd = { idLoaiHd: 'CBA' };
      const danhMucNhomHopDong: IDanhMucNhomHopDong = { idNhom: 'f3a01d78-ce08-4689-951b-d1793889759b' };
      dmLoaiHd.danhMucNhomHopDong = danhMucNhomHopDong;

      const danhMucNhomHopDongCollection: IDanhMucNhomHopDong[] = [{ idNhom: 'deeea1fe-021b-4425-b716-ba032ef8637e' }];
      jest.spyOn(danhMucNhomHopDongService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucNhomHopDongCollection })));
      const additionalDanhMucNhomHopDongs = [danhMucNhomHopDong];
      const expectedCollection: IDanhMucNhomHopDong[] = [...additionalDanhMucNhomHopDongs, ...danhMucNhomHopDongCollection];
      jest.spyOn(danhMucNhomHopDongService, 'addDanhMucNhomHopDongToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dmLoaiHd });
      comp.ngOnInit();

      expect(danhMucNhomHopDongService.query).toHaveBeenCalled();
      expect(danhMucNhomHopDongService.addDanhMucNhomHopDongToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucNhomHopDongCollection,
        ...additionalDanhMucNhomHopDongs.map(expect.objectContaining),
      );
      expect(comp.danhMucNhomHopDongsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dmLoaiHd: IDmLoaiHd = { idLoaiHd: 'CBA' };
      const danhMucNhomHopDong: IDanhMucNhomHopDong = { idNhom: 'd0bfc7c9-db51-4140-85db-2dc63d12fcfb' };
      dmLoaiHd.danhMucNhomHopDong = danhMucNhomHopDong;

      activatedRoute.data = of({ dmLoaiHd });
      comp.ngOnInit();

      expect(comp.danhMucNhomHopDongsSharedCollection).toContain(danhMucNhomHopDong);
      expect(comp.dmLoaiHd).toEqual(dmLoaiHd);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmLoaiHd>>();
      const dmLoaiHd = { idLoaiHd: 'ABC' };
      jest.spyOn(dmLoaiHdFormService, 'getDmLoaiHd').mockReturnValue(dmLoaiHd);
      jest.spyOn(dmLoaiHdService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmLoaiHd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmLoaiHd }));
      saveSubject.complete();

      // THEN
      expect(dmLoaiHdFormService.getDmLoaiHd).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmLoaiHdService.update).toHaveBeenCalledWith(expect.objectContaining(dmLoaiHd));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmLoaiHd>>();
      const dmLoaiHd = { idLoaiHd: 'ABC' };
      jest.spyOn(dmLoaiHdFormService, 'getDmLoaiHd').mockReturnValue({ idLoaiHd: null });
      jest.spyOn(dmLoaiHdService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmLoaiHd: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmLoaiHd }));
      saveSubject.complete();

      // THEN
      expect(dmLoaiHdFormService.getDmLoaiHd).toHaveBeenCalled();
      expect(dmLoaiHdService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmLoaiHd>>();
      const dmLoaiHd = { idLoaiHd: 'ABC' };
      jest.spyOn(dmLoaiHdService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmLoaiHd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmLoaiHdService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucNhomHopDong', () => {
      it('Should forward to danhMucNhomHopDongService', () => {
        const entity = { idNhom: 'ABC' };
        const entity2 = { idNhom: 'CBA' };
        jest.spyOn(danhMucNhomHopDongService, 'compareDanhMucNhomHopDong');
        comp.compareDanhMucNhomHopDong(entity, entity2);
        expect(danhMucNhomHopDongService.compareDanhMucNhomHopDong).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
