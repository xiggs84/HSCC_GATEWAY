jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DanhMucVaiTroService } from '../service/danh-muc-vai-tro.service';

import { DanhMucVaiTroDeleteDialogComponent } from './danh-muc-vai-tro-delete-dialog.component';

describe('DanhMucVaiTro Management Delete Component', () => {
  let comp: DanhMucVaiTroDeleteDialogComponent;
  let fixture: ComponentFixture<DanhMucVaiTroDeleteDialogComponent>;
  let service: DanhMucVaiTroService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucVaiTroDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DanhMucVaiTroDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DanhMucVaiTroDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DanhMucVaiTroService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
