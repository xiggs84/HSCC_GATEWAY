jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ThongTinCapNhatTaiSanService } from '../service/thong-tin-cap-nhat-tai-san.service';

import { ThongTinCapNhatTaiSanDeleteDialogComponent } from './thong-tin-cap-nhat-tai-san-delete-dialog.component';

describe('ThongTinCapNhatTaiSan Management Delete Component', () => {
  let comp: ThongTinCapNhatTaiSanDeleteDialogComponent;
  let fixture: ComponentFixture<ThongTinCapNhatTaiSanDeleteDialogComponent>;
  let service: ThongTinCapNhatTaiSanService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThongTinCapNhatTaiSanDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(ThongTinCapNhatTaiSanDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ThongTinCapNhatTaiSanDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ThongTinCapNhatTaiSanService);
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
